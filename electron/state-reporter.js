import {Comms} from './comms'
import {topics} from '../common/topics'

const startReportingCpuState = (frequency) => {
// Comms.
}

const startReportingMemoryState = (frequency) => {

}

const reporter = {
    startReportingCpuState: startReportingCpuState,
    startReportingMemoryState: startReportingMemoryState
}

export {startReportingCpuState, startReportingMemoryState}

export default reporter