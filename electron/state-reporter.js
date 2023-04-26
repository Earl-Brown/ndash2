const cpuInfoDefaults = {
	cores: [],
	temp: 100,
	minTemp: 135,
	maxTemp: 180
}

const { minTemp, maxTemp } = cpuInfoDefaults
const tempRange = maxTemp - minTemp

var cpuStateReporter = undefined,
	memoryStateReporter = undefined

const startReportingCpuState = (window, secondsBetweenUpdates) => {
	const delay = secondsBetweenUpdates * 1000
	console.log(`Starting CPU reporting; every ${delay} miliseconds (frequency = '${secondsBetweenUpdates}')`)

	cpuStateReporter = setInterval(() => {
		const cores = Array(16)
			.fill(0)
			.map(() => {
				const core = {
					percent: Math.random() * 99 + 1
				}
				return core
			})
		const temp = ((Math.random() * 100) % tempRange) + cpuInfoDefaults.minTemp
		const state = { cores: cores, temp: Math.trunc(temp) }

		console.log(`reporting CPU state`, state, new Date().getSeconds())
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