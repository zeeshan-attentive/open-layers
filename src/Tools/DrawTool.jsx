import React, { useContext } from "react";
import { MapContext } from "../components/MapComponent";

const DrawTool = ({
  geomType,
  image,
  setCancelBox,
  setPopupFlag,
  popupFlag,
}) => {
  const map = useContext(MapContext);

  const handleClick = () => {
    if (!popupFlag) {
      setPopupFlag(true);
      map.drawGeometry(geomType);
      setCancelBox("block");
    }
  };

  return (
    <div onClick={handleClick}>
      <img
        className="draw-tool"
        src={image}
        alt=""
        style={{ width: "15px", height: "15px" }}
      />
    </div>
  );
};

export default DrawTool;
