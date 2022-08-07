import React, { useEffect } from "react";
import { mapObj } from "../index";

const DrawTool = ({ geomType, image, setCancelBox }) => {
  const handleClick = () => {
    setCancelBox("block");
    mapObj.drawGeometry(geomType);
  };

  useEffect(() => {
    mapObj.drawGeometry(geomType);

    return () => {
      mapObj.cancelInteraction(geomType);
    };
  }, [geomType]);

  return (
    <div>
      <img onClick={handleClick} className="draw-tool" src={image} alt="" />
    </div>
  );
};

export default DrawTool;
