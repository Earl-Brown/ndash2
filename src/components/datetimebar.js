import { useState } from "react"
import { useInterval } from "react-use"
import * as Sugar from "sugar"

const {
	Date: { create: Now },
} = Sugar

const DateTimeBar = ({
	barStyle = {},
	dateStyle = {},
	timeStyle = {},
	dateFormat = "{Dow} {Mon} {d}, {yyyy}",
	timeFormat = "{h}:{mm} {TT}",
	refreshRate = 1000,
}) => {
	const [_now, setTime] = useState(Now())

	useInterval(() => setTime(Now()), refreshRate)

	const now = new Sugar.Date(_now)

	const formattedDate = now.format(dateFormat).raw
	const formattedTime = now.format(timeFormat).raw
	console.log("formatted:", formattedDate)

	return (
		<div style={{ display: "block", ...barStyle }}>
			<div style={{ ...dateStyle }}>{formattedDate}</div>
			<div style={{ ...timeStyle }}>{formattedTime}</div>
		</div>
	)
}

export default DateTimeBar
export { DateTimeBar }
