import React, { useContext } from "react";
import { MapContext } from "../components/MapComponent";
import { GEOMETRY_TYPE } from "../Constants";

const DrawTool = ({ geomType, image, setCancelBox }) => {
  const map = useContext(MapContext);

  const handleClick = () => {
    // Don't hardcode types
    // compare like this geomType === GEOMETRY_TYPE.LINESTRING
    if (geomType === 1) {
      map.drawGeometry(geomType);
      setCancelBox({ box1: "block", box2: "none", box3: "none" });
    } else if (geomType === 2) {
      map.drawGeometry(geomType);
      setCancelBox({ box1: "none", box2: "block", box3: "none" });
    } else {
      map.drawGeometry(geomType);
      setCancelBox({ box1: "none", box2: "none", box3: "block" });
    }
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
