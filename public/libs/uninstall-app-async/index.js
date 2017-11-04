const { app } = require('electron');
const { fork } = require('child_process');
const path = require('path');

const getAllAppPath = require('../get-all-app-path');

const uninstallAppAsync = (appId, appName) =>
  new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'script.js').replace('app.asar', 'app.asar.unpacked');

    const child = fork(scriptPath, [
      '--allAppPath',
      getAllAppPath(),
      '--appId',
      appId,
      '--appName',
      appName,
      '--desktopPath',
      app.getPath('desktop'),
      '--homePath',
      app.getPath('home'),
    ], {
      env: {
        ELECTRON_RUN_AS_NODE: 'true',
        ELECTRON_NO_ASAR: 'true',
      },
    });

    child.on('message', (message) => {
      reject(new Error(message));
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error('Forked script error'));
    });
  });

module.exports = uninstallAppAsync;
