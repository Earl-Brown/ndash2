const {Comms: comms} = window

// const monitorCpuState = (callback) => comms.on(topics.cpuState, callback)

// const monitorMemoryState = (callback) => comms.on(topics.memoryState, callback)

const Comms = {
    ...comms,
    // monitorCpuState: monitorCpuState, 
    // monitorMemoryState: monitorMemoryState
}

export default Comms
// export {monitorCpuState, monitorMemoryState}
