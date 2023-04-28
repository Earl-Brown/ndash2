import si from "systeminformation"

const cpuInfoDefaults = {
	cores: [],
	temp: 100,
	minTemp: 135,
	maxTemp: 180
}

var cpuStateReporter = undefined,
	memoryStateReporter = undefined

const startReportingCpuState = (window, secondsBetweenUpdates) => {
	const delay = secondsBetweenUpdates * 1000
	console.log(`Starting CPU reporting; every ${delay} miliseconds (frequency = '${secondsBetweenUpdates}')`)

	cpuStateReporter = setInterval(async () => {
    const [load, temp] = await Promise.all([si.currentLoad(), si.cpuTemperature()])

    const cpus = load.cpus,
      totalLoad = cpus.reduce((sum, cpu) => sum + cpu.load, 0),
      avgLoad = totalLoad / cpus.length

		const state = { loadInfo: {average: avgLoad, cores: cpus}, cores: cpus, temp: Math.trunc(temp.main) }

    console.log(`Reporting cpu state`, temp.main, temp)
		window.webContents.send("cpu-report", state)
	}, delay)
}

const stopReportingCPUState = () => {
	if (!cpuStateReporter) return
	clearInterval(cpuStateReporter)
	cpuStateReporter = undefined
}

const startReportingMemoryState = (window, secondsBetweenUpdates) => {

}

const stopReportingMemoryState = () => {
	if (!memoryStateReporter) return
	clearInterval(memoryStateReporter)
	cpuStateReporter = undefined
}

const reporter = {
	startReportingCpuState: startReportingCpuState,
	stopReportingCPUState: stopReportingCPUState,
	startReportingMemoryState: startReportingMemoryState,
	stopReportingMemoryState: stopReportingMemoryState
}

export { startReportingCpuState, stopReportingCPUState, startReportingMemoryState, stopReportingMemoryState }

export default reporter