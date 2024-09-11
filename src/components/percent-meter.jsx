import Meter from "./meter";

const PercentMeter = ({
  percent,
  fillColor,
  textStyle = {},
  meterStyle = {}
}) => {
  const value = Math.trunc(percent);

  const textWidth = "3em";

  return (
    <>
      <div className="percent-meter" style={{ display: "block" }}>
        <div style={{ ...textStyle, width: { textWidth }, display: "inline" }}>
          {value}%{" "}
        </div>
        <Meter
          style={{
            ...meterStyle,
            float: "right",
            width: `calc(100% - ${textWidth})`
          }}
          percent={percent}
          color={fillColor}
        />
      </div>
    </>
  );
};

export default PercentMeter;
export { PercentMeter };
