'use strict';

const fs      = require('fs');
const path    = require('path');
const http    = require('http');

const template = require('./template');

const serverOptions = {
    hostname: '127.0.0.1',
    port: 1337,
};

// load the list of apps
const appDir = path.resolve(__dirname, '..', 'apps');

// Run
loadAppInfo(appDir)
    .then(appInfo => startServer({ appInfo }, serverOptions))
    .then(() => console.log('server started'));


// Functions
function loadAppInfo(dir) {
    return new Promise((resolve, reject) => {
        const appList = fs.readdir(dir, (err, result) => {
            if (err) {
                reject(err);
            }

            // loop over app directories, and try to load each one
            let appInfo = result
                .reduce((memo, subdir) => {
                    try {
                        memo[subdir] = require(path.join(dir, subdir));
                    } catch (e) {
                        console.log(`! error loading ${subdir}`);
                    }

                    return memo;
                }, {});
                // require(subdir));

            resolve(appInfo);
        });
    });
}

function startServer(deps, opts) {
    let appInfo = deps.appInfo;

    http.createServer((req, res) => {

        // strip leading '/'
        let appName = req.url.substr(1);

        if (!appName) {
            // root ('')
            res.writeHead(200, { 'Content-Type': 'text/html' });
            // generate home template
            res.end([].concat.apply([], [
                '<h1>Available Apps</h1>',
                '<ul>',
                Object.keys(appInfo)
                    .map(name => `<li><a href="${ name }">${name}</a></li>`),
                ],
                '</ul>').join(''));
        } else if (appInfo[appName]) {
            // if there is a matching app, render it out
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(template(Object.assign({
                appName,
            }, appInfo[appName])));
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('No app found with that name');
        }
    }).listen(opts.port, opts.hostname, () => {
        console.log(`Server running at http://${opts.hostname}:${opts.port}/`);
    });
}

