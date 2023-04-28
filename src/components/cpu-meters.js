import PercentMeter from "./percent-meter"
import { useCpuActivity, cpuInfoDefaults } from "../services/hardwareservice"
import { VerticalMeter } from "./vertical-meter"

const percentageToHsl = (percentage, hue0, hue1) => {
	var hue = percentage * (hue1 - hue0) + hue0
	return `hsl(${hue}, 100%, 40%)`
}

const nineFifths = 9/5

const { minTemp, maxTemp } = cpuInfoDefaults,
	tempRange = maxTemp - minTemp

const CpuMeterCollection = ({ secondsBetweenUpdates, style = {} }) => {
	const { loadInfo, temp } = useCpuActivity(secondsBetweenUpdates),
    {average: averageLoad, cores} = loadInfo,
    farenheit = (temp * nineFifths) + 32

  console.log(`temp`, farenheit)

	const tempBase = maxTemp - farenheit,
		tempPercent = tempBase / tempRange,
		color = percentageToHsl(tempPercent, 113, 0)

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
				percent={averageLoad}
        title={`${farenheit} (${temp}c)`}
			/>

			<div style={{ ...style }}>
				{(cores ?? []).map((core, idx) => (
					<PercentMeter
						key={idx}
						percent={core.load}
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
