import { useState } from "react"
import { useMemory } from "../services/ui-memory-service"
import Meter from "./meter"

const MemoryBar = ({ refreshRate = 1, style = {} }) => {
	const {used, total} = useMemory(refreshRate)
  const abbreviatedTotal = Math.round(total / (1024 * 1024 * 1024))

  console.log("memory reported", "used", used, "total", total)
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
			<span style={{ fontSize: "0.75em" }}>of {abbreviatedTotal}GB</span>
		</div>
	)
}

export default MemoryBar
export { MemoryBar }
