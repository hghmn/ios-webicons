'use strict';

const fs      = require('fs');

module.exports = {
    // readdir: readdirPromise,
    readdir: promisify(fs.readdir).bind(fs),
    readFile: readFilePromise,
    stat: statPromise,
    mkdir: mkdirPromise,
    writeFile: writeFilePromise,
};


// wrap node style callback functions in a promise
function promisify(fn) {
    return function(/* args */) {
        let args = [].slice.call(arguments);

        return new Promise((resolve, reject) => {
            const callback = (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            };

            args.push(callback);
            fn.apply(this, args);
        });
    }
}

// Definitions
// ==================================================
function readFilePromise(path, options) {
    options = options || 'utf8';
    return new Promise((resolve, reject) => {
        fs.readFile(path, options, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

function statPromise(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

function mkdirPromise(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

function readdirPromise(directory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
};

function writeFilePromise(filename, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
}
