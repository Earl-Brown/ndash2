import { startReportingCpuState, stopReportingCPUState, startReportingMemoryState, stopReportingMemoryState } from "./state-reporter"
import { appConfiguration } from '../package.json'
import { ipcMain } from "electron"

console.log("appConfiguration", appConfiguration)

const initializeServices = (window) => {
  console.log("in initializeservices")

  ipcMain.on(
    "startReportingCPU",
    (evt, { secondsBetweenUpdates }) => {
      startReportingCpuState(window, secondsBetweenUpdates)
    }
  )

  ipcMain.on(
    "stopReportingCPU",
    (evt) => {
      stopReportingCPUState(window)
    }
  )

  ipcMain.on(
    "startReportingMemory",
    (evt, { secondsBetweenUpdates }) => {
      startReportingMemoryState(window, secondsBetweenUpdates)
    }
  )

  ipcMain.on(
    "stopReportingMemory",
    (evt) => {
      stopReportingMemoryState(window)
    }
  )

}

export { initializeServices }
export default initializeServices