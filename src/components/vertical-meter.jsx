import { Children } from "react"
import "../styles.css"

const VerticalMeter = ({ percent, color, className, children, title = "" }) => {
	const content = Children.count(children) > 0 ? <>{children}</> : <>&nbsp;</>

	return (

		<div title={title} className={className} >
			<div
				style={{
					backgroundColor: color,
					position: "absolute",
					bottom: "0",
					left: "15%",
					right: "15%",
					top: `calc(100% - ${percent}%)`
				}}
			>
				{content}
			</div>
		</div>
	)
}

export default VerticalMeter
export { VerticalMeter }
