import { useState, useEffect } from "react"
import { useInterval } from "react-use"

const cpuInfoDefaults = {
	cores: [],
	temp: 100,
	minTemp: 135,
	maxTemp: 180
}

const { minTemp, maxTemp } = cpuInfoDefaults
const tempRange = maxTemp - minTemp
const {CPU} = window.server

const stopReporting = CPU.stopReporting

const startReporting = (callback, frequency = 2) => {
		CPU.startReporting(frequency, (evt,payload) => {
			console.log("CPU report", new Date().getSeconds(), payload)
			callback(payload)
		})
		return stopReporting;
}

const getSnapshot = () => ({cores: [], temp: 0})

const useCpuActivity = (secondsBetweenUpdates = 1) => {
  const [cpuInfo, updateCpuInfo] = useState({cores: [], temp: 0})

  useEffect(() => {
    return startReporting(updateCpuInfo, secondsBetweenUpdates);
  });

  return cpuInfo;
}

const useMemory = (callback, secondsBetweenUpdates = 1000) => {
	useInterval(() => {
		const total = 64,
			used = Math.random() * total,
			available = total - used,
			memory = {
				total: total,
				available: available,
				used: used
			}

		callback(memory)
	}, secondsBetweenUpdates)
}

const obj = {
	useCpuActivity: useCpuActivity,
	useMemory: useMemory
}

export { useCpuActivity, cpuInfoDefaults, useMemory }
export default obj
