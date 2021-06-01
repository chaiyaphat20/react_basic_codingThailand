import { useState } from "react";
function UseHover() {
  const [hover, setHover] = useState(false);
  const mouseOver = (e) => {
    setHover(e ===1 ? true : false);
  };
  const mouseOut = () => {
    setHover(false);
  };

  const attrs = {
    mouseOut,
    mouseOver
  }

  return [ hover, attrs ];
}

export default UseHover;
