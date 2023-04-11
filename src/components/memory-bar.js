import { useState } from "react"
import { useMemory } from "../services/hardwareservice"
import Meter from "./meter"

const MemoryBar = ({ refreshRate = 1000, style = {} }) => {
	const [{ used = 0, total = 0 }, updateRAM] = useState({})
	useMemory(updateRAM, refreshRate)

	const percentUsed = (used / total) * 100

	return (
		<div style={{ ...style, fontSize: "1em" }}>
			<span style={{ fontSize: "0.75em", fontWeight: "bold" }}>RAM</span>
			<Meter
				style={{
					width: "34%",
					display: "inline-flex",
					margin: "0 0.3em",
				}}
				percent={percentUsed}
				color="lightgreen">
				<div
					style={{
						fontSize: "70%",
						fontWeight: "bold",
						top: "-1px",
						backgroundColor: "transparent",
						position: "relative",
					}}>
					{percentUsed.toFixed()}%
				</div>
			</Meter>
			<span style={{ fontSize: "0.75em" }}>of {total}GB</span>
		</div>
	)
}

export default MemoryBar
export { MemoryBar }
