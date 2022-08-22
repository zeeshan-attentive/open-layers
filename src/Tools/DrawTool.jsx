import React, { useContext } from "react";
import { MapContext, ToolContext } from "../components/MapComponent";

const DrawTool = ({ geomType, image }) => {
  const map = useContext(MapContext);
  const tools = useContext(ToolContext);

  const handleClick = () => {
    tools.openDrawTool(geomType);
  };

  return (
    <div className="draw-tool-container">
      <img onClick={handleClick} className="draw-tool" src={image} alt="" />
      <div
        className={`cancel-box ${
          tools.activeTool === geomType ? "active" : ""
        }`}
      >
        <span onClick={tools.closeTool} className="cancel-box-div left">
          Cancel
        </span>
        <span
          onClick={() => map.editFeatures(geomType)}
          className="cancel-box-div right"
        >
          Edit
        </span>
      </div>
    </div>
  );
};

export default DrawTool;
