import React, { useContext, useState } from "react";
import { GEOMETRY_TYPE } from "../Constants";
import DrawTool from "../Tools/DrawTool";
import { MapContext } from "./MapComponent";

const Toolbar = () => {
  const [cancelBox, setCancelBox] = useState({
    box1: "none",
    box2: "none",
    box3: "none",
  });
  const [importToggle, setImportToggle] = useState(false);

  const map = useContext(MapContext);

  const handleCancel = (type) => {
    setCancelBox({
      box1: "none",
      box2: "none",
      box3: "none",
    });

    map.cancelInteraction();
    map.cancelEdit(type);
  };

  const handleEdit = (editGeomType) => {
    map.editFeatures(editGeomType);
  };

  const handleImport = () => {
    setCancelBox({
      box1: "none",
      box2: "none",
      box3: "none",
    });

    map.cancelInteraction();

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
        cancelBox={cancelBox}
        setCancelBox={setCancelBox}
        geomType={GEOMETRY_TYPE.LINESTRING}
        image={"https://cdn-icons-png.flaticon.com/512/876/876225.png"}
      />
      <DrawTool
        cancelBox={cancelBox}
        setCancelBox={setCancelBox}
        geomType={GEOMETRY_TYPE.POLYGON}
        image={"https://cdn-icons-png.flaticon.com/512/2708/2708406.png"}
      />
      <DrawTool
        cancelBox={cancelBox}
        setCancelBox={setCancelBox}
        geomType={GEOMETRY_TYPE.POINT}
        image={
          "https://icons-for-free.com/iconfiles/png/512/map+point+icon-1320073183505881976.png"
        }
      />
      <div className="cancel-box" style={{ display: cancelBox.box1 }}>
        <span
          onClick={() => handleCancel(GEOMETRY_TYPE.LINESTRING, 1)}
          className="cancel-box-div"
          style={{ borderRight: "1px solid rgb(72, 78, 81)" }}
        >
          Cancel
        </span>
        <span
          onClick={() => handleEdit(GEOMETRY_TYPE.LINESTRING)}
          className="cancel-box-div"
          style={{ borderRadius: "0px 5px 5px 0px" }}
        >
          Edit
        </span>
      </div>
      <div className="cancel-box1" style={{ display: cancelBox.box2 }}>
        <span
          onClick={() => handleCancel(GEOMETRY_TYPE.POLYGON, 2)}
          className="cancel-box-div"
          style={{ borderRight: "1px solid rgb(72, 78, 81)" }}
        >
          Cancel
        </span>
        <span
          onClick={() => handleEdit(GEOMETRY_TYPE.POLYGON, 3)}
          className="cancel-box-div"
          style={{ borderRadius: "0px 5px 5px 0px" }}
        >
          Edit
        </span>
      </div>
      <div className="cancel-box2" style={{ display: cancelBox.box3 }}>
        <span
          onClick={() => handleCancel(GEOMETRY_TYPE.POINT)}
          className="cancel-box-div"
          style={{ borderRight: "1px solid rgb(72, 78, 81)" }}
        >
          Cancel
        </span>
        <span
          onClick={() => handleEdit(GEOMETRY_TYPE.POINT)}
          className="cancel-box-div"
          style={{ borderRadius: "0px 5px 5px 0px" }}
        >
          Edit
        </span>
      </div>
      <div className="import-button">
        <img
          onClick={handleImport}
          className="draw-tool"
          src="https://cdn-icons.flaticon.com/png/512/3524/premium/3524338.png?token=exp=1660130409~hmac=1246130d21c1e8db7dbd22750a90bbee"
          alt=""
          style={{ width: "15px", height: "15px" }}
        />
        <img
          onClick={handleExport}
          className="draw-tool"
          src="https://cdn-icons.flaticon.com/png/512/3524/premium/3524363.png?token=exp=1660130594~hmac=caf931f51e03ab4a349fc5e5966b91a7"
          alt=""
          style={{ width: "15px", height: "15px" }}
        />
      </div>
    </div>
  );
};

export default Toolbar;
