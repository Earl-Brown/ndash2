// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const  electron = require("electron");
const {contextBridge: {exposeInMainWorld}, ipcRenderer } = electron

const server = {
  startReportingCPU: (callback, frequencyInSeconds) => {
    ipcRenderer.on("cpu-report", callback)
    ipcRenderer.send("startReportingCPU", {frequencyInSeconds: frequencyInSeconds})
  },
  startReportingMemory: (callback, frequencyInSeconds) => {
    ipcRenderer.on("memory-report", callback)
    ipcRenderer.send("startReportingMemory", {frequencyInSeconds: frequencyInSeconds})
  },
}

// As an example, here we use the exposeInMainWorld API to expose the browsers 
// and node versions to the main window. 
// They'll be accessible at "window.versions".
process.once('loaded', () => {
  exposeInMainWorld("server", server)
});

// // All of the Node.js APIs are available in the preload process.
// // It has the same sandbox as a Chrome extension.
// const { contextBridge, ipcRenderer, ipcMain } = require("electron");

// // As an example, here we use the exposeInMainWorld API to expose the browsers
// // and node versions to the main window.
// // They'll be accessible at "window.versions".
// process.once("loaded", () => {
//   contextBridge.exposeInMainWorld("versions", process.versions);
//   contextBridge.exposeInMainWorld("Comms", {
//     ipcRenderer, 
//     ipcMain, 
//     on: ipcRenderer.on, 
//     send: ipcRenderer.send, 
//     sendAsync: ipcRenderer.sendAsync
//   });
// });