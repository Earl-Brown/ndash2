import PercentMeter from "./percent-meter"
import { useState } from "react"
import { useCpuActivity, cpuInfoDefaults } from "../services/hardwareservice"
import { VerticalMeter } from "./vertical-meter"

const percentageToHsl = (percentage, hue0, hue1) => {
	var hue = percentage * (hue1 - hue0) + hue0
	return `hsl(${hue}, 100%, 40%)`
}

const { minTemp, maxTemp } = cpuInfoDefaults,
	tempRange = maxTemp - minTemp

const CpuMeterCollection = ({ secondsBetweenUpdates, style = {} }) => {
	const { cores, temp } = useCpuActivity(secondsBetweenUpdates)
	console.log("cpumetercollection starting up", new Date().getSeconds())

	const tempBase = maxTemp - temp,
		percent = tempBase / tempRange,
		color = percentageToHsl(percent, 113, 0)

	return (
		<div style={{ position: "relative", height: "auto", width: "100%" }}>
			<VerticalMeter
				style={{
					backgroundColor: "#cceecc",
					width: "10px",
					position: "absolute",
					top: "0px",
					bottom: "0px",
					right: "0px"
				}}
				color={color}
				percent={80}
			/>

			<div style={{ ...style }}>
				{(cores ?? []).map((core, idx) => (
					<PercentMeter
						key={idx}
						percent={core.percent}
						fillColor="#00C800"
						meterStyle={{ borderRight: `4px solid ${color}` }}
					/>
				))}
			</div>
		</div>
	)
}

export default CpuMeterCollection
export { CpuMeterCollection }
