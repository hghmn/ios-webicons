'use strict';

const path    = require('path');
const fs      = require('./fs'); // bring in promise-wrapped filesystem

const indexTemplate = require('./templates/index');
const appTemplate = require('./templates/app');
// load the apps
const rootDir = path.resolve(__dirname, '..');
const appDir = path.resolve(__dirname, '..', 'apps');
const dest = path.resolve(__dirname, '..', 'dist');

let templateGlobals = {
    scripts: [],
};

// Run
fs.stat(dest)
    .then(stats => {
        if (stats.isDirectory()) {
            return Promise.resolve();
        } else {
            return fs.mkdir(dest);
        }
    })
    // load default items
    .then(() => loadTemplateGlobals({
        scripts: path.resolve(__dirname, 'js'),
        styles: path.resolve(__dirname, 'css'),
    }))
    .then(globals => {
        templateGlobals = globals;
    })
    .then(() => fs.readdir(appDir))
    .then(appFolders =>
        appFolders
            .reduce((memo, folderName) => {
                try {
                    memo[folderName] = require(path.join(appDir, folderName));
                    memo[folderName]._app = folderName;
                } catch (e) {
                    console.log(`! error loading ${ folderName }`);
                }

                return memo;
            }, {}))
    .then(apps => {
        var keys = Object.keys(apps);
        const filenames = keys.map(key => key.replace(/\.\w+$/, '') + '.html');

        // render apps into templates
        var promises = filenames.map((filename, ix) => {
            let props = extendTemplateProps(apps[keys[ix]], templateGlobals);
            return fs.writeFile(path.join(dest, filename), appTemplate(props));
        });

        // map templates to promises
        return Promise.all(promises)
            .then(resolved => resolved.map((app, ix) => filenames[ix]));
    })
    .then(renderedApps => {
        let props = extendTemplateProps({
            title: 'index',
            description: 'App List',
            apps: renderedApps,
            baseDir: 'dist',
        }, templateGlobals);

        fs.writeFile(path.join(rootDir, 'index.html'), indexTemplate(props));

        return renderedApps;
    })
    .then(result => console.log('finished', result))
    .catch(err => console.error(err));



//
function loadTemplateGlobals(pathHash) {
    var keys = Object.keys(pathHash);

    const promises = keys.map(key => {
        let keyPath = pathHash[key];
        return fs.readdir(keyPath)
            .then(filenames =>
                Promise.all(filenames.map(filename =>
                    fs.readFile(path.join(keyPath, filename)))));
    });

    return Promise.all(promises)
        .then(hashFiles => hashFiles.reduce((memo, files, ix) => {
            memo[keys[ix]] = files;
            return memo;
        }, {}));
}

function extendTemplateProps(/* target, ...extras */) {
    let args = [].slice.call(arguments);

    let target = args.shift();

    args.forEach(obj => {
        Object.keys(obj).forEach(key => {
            let value = obj[key];

            if (typeof value === 'object') {
                // try to extend the value
                if (value.length) {
                    // add to the array, and filter out undefined
                    target[key] = [].concat.call([], target[key], value)
                        .filter(i => i);
                } else {
                    target[key] = Object.assign(target[key], value);
                }
            } else {
                // just overwrite it
                target[key] = value;
            }
        });
    });

    return target;
}
