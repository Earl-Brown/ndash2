// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const  electron = require("electron");
const {contextBridge: {exposeInMainWorld}, ipcRenderer } = electron


const server = {
  CPU: {
    startReporting: (secondsBetweenUpdates, callback) => {
      ipcRenderer.on("cpu-report", callback)
      ipcRenderer.send("startReportingCPU", {secondsBetweenUpdates: secondsBetweenUpdates})
    },
    stopReporting: () => ipcRenderer.send("stopReportingCPU"),
  },
  Memory: {
    startReporting: (secondsBetweenUpdates, callback) => {
      ipcRenderer.on("memory-report", callback)
      ipcRenderer.send("startReportingMemory", {secondsBetweenUpdates: secondsBetweenUpdates})
    },
    stopReporting: () => {
      ipcRenderer.send("stopReportingMemory")
    }
  },
}

process.once('loaded', () => {
  exposeInMainWorld("server", server)
});
