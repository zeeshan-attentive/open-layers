import React from "react";
import { mapObj } from "..";

const DrawTool = ({ geomType }) => {
  const handleClick = () => {};

  return (
    <div>
      <img
        onClick={handleClick}
        className="draw-tool"
        src="https://cdn-icons-png.flaticon.com/512/876/876225.png"
        alt=""
      />
    </div>
  );
};

export default DrawTool;
