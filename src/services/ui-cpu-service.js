import { useState, useEffect } from "react"

const cpuInfoDefaults = {
	cores: [],
	temp: 100,
	minTemp: 135,
	maxTemp: 180
}

const {CPU} = window.server

const stopReportingCpu = CPU.stopReporting

const startReportingCpu = (callback, frequency = 0.75) => {
		CPU.startReporting(frequency, (evt,payload) => {
			console.log("CPU report", new Date().getSeconds(), payload)
			callback(payload)
		})
		return stopReportingCpu;
}

const useCpuActivity = (secondsBetweenUpdates = 1) => {
  const [cpuInfo, updateCpuInfo] = useState({loadInfo: {average: 0, cores: []}, temp: 0})

  useEffect(() => {
    return startReportingCpu(updateCpuInfo, secondsBetweenUpdates);
  }, []);

  return cpuInfo;
}


const obj = {
	useCpuActivity: useCpuActivity,
}

export { useCpuActivity, cpuInfoDefaults}
export default obj
