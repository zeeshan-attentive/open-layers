import React from "react";
// import { mapObj } from "../index";

const DrawTool = ({ geomType, image, setCancelBox }) => {
  const handleClick = () => {
    setCancelBox("block");
    // mapObj.drawGeometry("LineString");
  };

  return (
    <div>
      <img onClick={handleClick} className="draw-tool" src={image} alt="" />
    </div>
  );
};

export default DrawTool;
