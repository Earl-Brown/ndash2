import { startReportingCpuState, startReportingMemoryState } from "./state-reporter"
import {appConfiguration} from '../package.json'

const {cpuReportingFrequency, memoryReportingFrequency} = appConfiguration

console.log("appConfiguration", appConfiguration)

const initializeServices = () => {
    startReportingCpuState(cpuReportingFrequency)
    startReportingMemoryState(memoryReportingFrequency)
}

export {initializeServices}
export default initializeServices