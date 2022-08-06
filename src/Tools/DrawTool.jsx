import React, { useContext } from "react";
import { MapContext } from "../components/MapComponent";

const DrawTool = ({ geomType, image, setCancelBox }) => {
  const map = useContext(MapContext);

  const handleClick = () => {
    map.drawGeometry(geomType);
  };

  return (
    <div onClick={handleClick}>
      <img
        className="draw-tool"
        src={image}
        alt=""
        style={{ width: "20px", height: "20px" }}
      />
    </div>
  );
};

export default DrawTool;
