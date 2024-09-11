var electron = electron || {};
electron.require = electron.require || window.require;
electron.exports = electron.exports || window.exports;
electron.module = electron.module || window.module;

delete window.require;
delete window.exports;
delete window.module;

var comms = electron.require("electron").ipcRenderer;

// TODO: add a "settings" object with "get" and "save"