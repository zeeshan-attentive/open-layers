import React from "react";
import { GEOMETRY_TYPE } from "../Constants";
import DrawTool from "../Map/Tools/DrawTool";

const Toolbar = () => {
  return (
    <div className="tools-div">
      <DrawTool geomType={GEOMETRY_TYPE.POLYGON} />
      <DrawTool geomType={GEOMETRY_TYPE.LINESTRING} />
      <DrawTool geomType={GEOMETRY_TYPE.POINT} />
    </div>
  );
};

export default Toolbar;
