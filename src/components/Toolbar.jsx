import React, { useState } from "react";
import { GEOMETRY_TYPE } from "../Constants";
import DrawTool from "../Tools/DrawTool";

const Toolbar = ({ drawTool }) => {
  const [cancelBox, setCancelBox] = useState("none");

  const handleCancel = () => {
    setCancelBox("none");
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
      </div>
    </div>
  );
};

export default Toolbar;
