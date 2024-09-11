import { Children } from "react";
import "../styles.css";

const Meter = ({ percent, color, style = {}, children }) => {
  const content = Children.count(children) > 0 ? <>{children}</> : <>&nbsp;</>;

  return (
    <div
      className="meter-box"
      style={{
        ...style
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          backgroundColor: color,
          height: "0.75em"
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default Meter;
export { Meter };
