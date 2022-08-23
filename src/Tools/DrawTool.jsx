import React, { useContext, useState } from "react";
import { MapContext, ToolContext } from "../components/MapComponent";

const DrawTool = ({ geomType, image }) => {
  const map = useContext(MapContext);
  const tools = useContext(ToolContext);

  const [edit, setEdit] = useState(false);

  return (
    <div className="draw-tool-container">
      <img
        onClick={() => {
          setEdit(false);
          tools.openDrawTool(geomType);
        }}
        className="draw-tool"
        src={image}
        alt=""
      />
      <div
        className={`cancel-box ${
          tools.activeTool === geomType ? "active" : ""
        }`}
      >
        <span
          onClick={() => {
            setEdit(false);
            tools.closeTool(geomType);
          }}
          className="cancel-box-div left"
        >
          Cancel
        </span>
        <span
          onClick={() => {
            setEdit(!edit);
            if (!edit) map.editFeatures(geomType);
            else tools.closeTool(geomType);
          }}
          className="cancel-box-div right"
        >
          {edit ? "Save" : "Edit"}
        </span>
      </div>
    </div>
  );
};

export default DrawTool;
