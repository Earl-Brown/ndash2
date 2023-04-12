import { useInterval } from "react-use"

const ipcRenderer = window.require("electron")


const cpuInfoDefaults = {
	cores: [],
	temp: 100,
	minTemp: 135,
	maxTemp: 180
}

const { minTemp, maxTemp } = cpuInfoDefaults
const tempRange = maxTemp - minTemp

const useCpuActivity = (callback, refreshRate = 1000) => {
	useInterval(() => {
		const cores = Array(16)
			.fill(0)
			.map(() => {
				const core = {
					percent: Math.random() * 99 + 1
				}
				return core
			})
		const temp = ((Math.random() * 100) % tempRange) + cpuInfoDefaults.minTemp
		callback({ cores: cores, temp: Math.trunc(temp) })
	}, refreshRate)
}

const useMemory = (callback, refreshRate = 1000) => {
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
	}, refreshRate)
}

const obj = {
	useCpuActivity: useCpuActivity,
	useMemory: useMemory
}

export { useCpuActivity, cpuInfoDefaults, useMemory }
export default obj
