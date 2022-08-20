import React, { useContext, useState } from "react";
import { GEOMETRY_TYPE } from "../Constants";
import DrawTool from "../Tools/DrawTool";
import { MapContext } from "./MapComponent";

const Toolbar = () => {
  const map = useContext(MapContext);

  // const inputFile = useRef(null);
  const [importToggle, setImportToggle] = useState(false);

  const handleImport = () => {
    // inputFile.current.click();

    if (!importToggle) {
      setImportToggle(true);
      map.renderGeojson();
    } else {
      setImportToggle(false);
      map.removeGeojson();
    }
  };

  const handleExport = () => {
    map.exportGeojson();
  };

  return (
    <div className="tools-div">
      <DrawTool
        geomType={GEOMETRY_TYPE.LINESTRING}
        image={"https://cdn-icons-png.flaticon.com/512/876/876225.png"}
      />
      <DrawTool
        geomType={GEOMETRY_TYPE.POLYGON}
        image={"https://cdn-icons-png.flaticon.com/512/2708/2708406.png"}
      />
      <DrawTool
        geomType={GEOMETRY_TYPE.POINT}
        image={
          "https://icons-for-free.com/iconfiles/png/512/map+point+icon-1320073183505881976.png"
        }
      />
      <div className="import-button">
        <img
          onClick={handleImport}
          className="draw-tool"
          src="https://cdn-icons-png.flaticon.com/512/151/151901.png"
          alt=""
          style={{ width: "20px", height: "20px" }}
        />
        {/* <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
        /> */}
        <img
          onClick={handleExport}
          className="draw-tool"
          src="https://cdn-icons-png.flaticon.com/512/151/151900.png"
          alt=""
          style={{ width: "20px", height: "20px" }}
        />
      </div>
    </div>
  );
};

export default Toolbar;
