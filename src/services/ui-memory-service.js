import { useState, useEffect } from "react"

const {Memory} = window.server

const stopReportingMemory = Memory.stopReporting

const startReportingMemory = (callback, frequency = 1) => {
  Memory.startReporting(frequency, (evt, payload) => {
    console.log("memory reported", new Date().getSeconds(), payload)
    callback(payload)
  })
  return stopReportingMemory
}

const useMemory = (secondsBetweenUpdates = 1000) => {
  const [memory, setMemory] = useState(0)
  useEffect(() => {
    const updateMemory = (memory) => {
      console.log("updating memory", memory)
      setMemory(memory)
    }
    return startReportingMemory(updateMemory, secondsBetweenUpdates);
  }, []);

  return memory;
}

const obj = {
	useMemory: useMemory
}

export { useMemory }
export default obj
