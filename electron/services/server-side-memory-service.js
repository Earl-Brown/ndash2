import si from "systeminformation"

var memoryStateReporter = undefined

const startReportingMemoryState = (window, secondsBetweenUpdates) => {
  const delay = secondsBetweenUpdates * 1000
  console.log(`Starting Memory reporting; every ${delay} miliseconds (frequency = '${secondsBetweenUpdates}')`)

  memoryStateReporter = setInterval(async () => {
    const memory = await si.mem()
    console.log(`Reporting memory state`, memory)
    window.webContents.send("memory-report", memory)
  }, delay)
}

const stopReportingMemoryState = () => {
	if (!memoryStateReporter) return
	clearInterval(memoryStateReporter)
	memoryStateReporter = undefined
}

const reporter = {
	startReportingMemoryState: startReportingMemoryState,
	stopReportingMemoryState: stopReportingMemoryState
}

export {startReportingMemoryState, stopReportingMemoryState }

export default reporter