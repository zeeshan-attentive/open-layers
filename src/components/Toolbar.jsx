import React, { useContext, useState } from "react";
import { GEOMETRY_TYPE } from "../Constants";
import DrawTool from "../Tools/DrawTool";
import { MapContext } from "./MapComponent";

const Toolbar = () => {
  const [cancelBox1, setCancelBox1] = useState("none");
  const [cancelBox2, setCancelBox2] = useState("none");
  const [cancelBox3, setCancelBox3] = useState("none");
  const [popupFlag, setPopupFlag] = useState(false);
  const [importToggle, setImportToggle] = useState(false);

  const map = useContext(MapContext);

  const handleCancel = (type, box) => {
    if (box === 1) {
      setCancelBox1("none");
    } else if (box === 2) {
      setCancelBox2("none");
    } else {
      setCancelBox3("none");
    }
    map.cancelInteraction();
    map.cancelEdit(type);
    setPopupFlag(false);
  };

  const handleEdit = (editGeomType) => {
    map.editFeatures(editGeomType);
  };

  const handleImport = () => {
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
        setCancelBox={setCancelBox1}
        geomType={GEOMETRY_TYPE.LINESTRING}
        setPopupFlag={setPopupFlag}
        popupFlag={popupFlag}
        image={"https://cdn-icons-png.flaticon.com/512/876/876225.png"}
      />
      <DrawTool
        setCancelBox={setCancelBox2}
        geomType={GEOMETRY_TYPE.POLYGON}
        setPopupFlag={setPopupFlag}
        popupFlag={popupFlag}
        image={
          "https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/000/507/original/vector-patch-polygon.png"
        }
      />
      <DrawTool
        setCancelBox={setCancelBox3}
        geomType={GEOMETRY_TYPE.POINT}
        setPopupFlag={setPopupFlag}
        popupFlag={popupFlag}
        image={
          "https://icons-for-free.com/iconfiles/png/512/map+point+icon-1320073183505881976.png"
        }
      />
      <div className="cancel-box" style={{ display: cancelBox1 }}>
        <span
          onClick={() => handleCancel(GEOMETRY_TYPE.LINESTRING, 1)}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </span>
        <span onClick={() => handleEdit(GEOMETRY_TYPE.LINESTRING)}>Edit</span>
      </div>
      <div className="cancel-box1" style={{ display: cancelBox2 }}>
        <span
          onClick={() => handleCancel(GEOMETRY_TYPE.POLYGON, 2)}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </span>
        <span onClick={() => handleEdit(GEOMETRY_TYPE.POLYGON, 3)}>Edit</span>
      </div>
      <div className="cancel-box2" style={{ display: cancelBox3 }}>
        <span
          onClick={() => handleCancel(GEOMETRY_TYPE.POINT)}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </span>
        <span onClick={() => handleEdit(GEOMETRY_TYPE.POINT)}>Edit</span>
      </div>
      <div className="import-button">
        <button
          onClick={handleImport}
          style={{ cursor: "pointer", marginBottom: "10px" }}
        >
          Import
        </button>
        <button style={{ cursor: "pointer" }} onClick={handleExport}>
          Export
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
