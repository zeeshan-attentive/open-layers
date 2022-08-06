import React, { useState } from "react";
import { GEOMETRY_TYPE } from "../Constants";
import DrawTool from "../Map/Tools/DrawTool";
// import { mapObj } from "../Map";

const Toolbar = ({drawTool}) => {
  const [cancelBox, setCancelBox] = useState("none");

  const handleCancel = () => {
    setCancelBox("none");
    // mapObj.cancelInteraction();
  };

  const handleUndo = () => {
    // mapObj.undoPoint();
  };

  return (
    <div className="tools-div">
      <DrawTool
        setCancelBox={setCancelBox}
        geomType={GEOMETRY_TYPE.LINESTRING}
        image={"https://cdn-icons-png.flaticon.com/512/876/876225.png"}
      />
      <DrawTool
        setCancelBox={setCancelBox}
        geomType={GEOMETRY_TYPE.POLYGON}
        image={
          "https://cdn.icon-icons.com/icons2/1875/PNG/512/shapepolygon_120487.png"
        }
      />
      <DrawTool
        setCancelBox={setCancelBox}
        geomType={GEOMETRY_TYPE.POINT}
        image={
          "https://icons-for-free.com/iconfiles/png/512/map+point+icon-1320073183505881976.png"
        }
      />
      <div className="cancel-box" style={{ display: cancelBox }}>
        <span onClick={handleCancel}>Cancel</span>
        <span onClick={handleUndo} style={{ marginLeft: "15px" }}>
          Undo
        </span>
      </div>
    </div>
  );
};

export default Toolbar;
