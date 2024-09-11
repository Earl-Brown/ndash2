import CpuMeterCollection from "./components/cpu-meters"
import MemoryBar from "./components/memory-bar"
import DateTimeBar from "./components/datetimebar"

import "./styles.css"

export default function App() {
	return (
		<div style={{ width: "125px" }}>
			<DateTimeBar
				className="datetimebar"
				refreshRate={500}
			></DateTimeBar>
			<CpuMeterCollection
				className="cpu-meter-collection"
				style={{ width: "90%", textAlign: "center" }}
				secondsBetweenUpdates={0.75}
			/>
			<MemoryBar
				className="memory-bar"
				refreshRate={1}
			/>
		</div>
	)
}
