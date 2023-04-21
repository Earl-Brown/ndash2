import CpuMeterCollection from "./components/cpu-meters"
import MemoryBar from "./components/memory-bar"
import DateTimeBar from "./components/datetimebar"
import Comms from './services/comms-service'

import "./styles.css"

export default function App() {
	return (
		<div style={{ width: "125px" }}>
			<DateTimeBar
				refreshRate={500}
				barStyle={{
					width: "100%",
					borderBottom: "1px solid #dddddd",
					margin: "0 0 6px 0"
				}}
				dateStyle={{
					display: "inline-block",
					fontWeight: "bold",
					fontSize: "0.75em",
					width: "50%"
				}}
				timeStyle={{
					display: "inline-block",
					fontWeight: "bold",
					fontSize: "0.75em",
					width: "50%",
					textAlign: "right",
					verticalAlign: "top"
				}}
			></DateTimeBar>
			<CpuMeterCollection
				style={{ width: "90%", textAlign: "center" }}
				refreshRate={2000}
			/>
			<MemoryBar
				style={{
					borderTop: "2px solid silver",
					margin: "0.2em 0",
					padding: "0.1em 0"
				}}
				refreshRate={2000}
			/>
		</div>
	)
}
