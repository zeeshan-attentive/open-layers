import React, { useContext, useState } from "react";
import { GEOMETRY_TYPE } from "../Constants";
import DrawTool from "../Tools/DrawTool";
import { MapContext } from "./MapComponent";

const Toolbar = () => {
  const [cancelBox, setCancelBox] = useState("none");
  const [cancelBox1, setCancelBox1] = useState("none");
  const [cancelBox2, setCancelBox2] = useState("none");
  const [popupFlag, setPopupFlag] = useState(false);

  const map = useContext(MapContext);

  const handleCancel = () => {
    map.cancelInteraction();
    setCancelBox("none");
    setPopupFlag(false);
  };

  const handleCancel1 = () => {
    map.cancelInteraction();
    setCancelBox1("none");
    setPopupFlag(false);
  };

  const handleCancel2 = () => {
    map.cancelInteraction();
    setCancelBox2("none");
    setPopupFlag(false);
  };

  return (
    <div className="tools-div">
      <DrawTool
        setCancelBox={setCancelBox}
        geomType={GEOMETRY_TYPE.LINESTRING}
        setPopupFlag={setPopupFlag}
        popupFlag={popupFlag}
        image={"https://cdn-icons-png.flaticon.com/512/876/876225.png"}
      />
      <DrawTool
        setCancelBox={setCancelBox1}
        geomType={GEOMETRY_TYPE.POLYGON}
        setPopupFlag={setPopupFlag}
        popupFlag={popupFlag}
        image={
          "https://cdn.icon-icons.com/icons2/1875/PNG/512/shapepolygon_120487.png"
        }
      />
      <DrawTool
        setCancelBox={setCancelBox2}
        geomType={GEOMETRY_TYPE.POINT}
        setPopupFlag={setPopupFlag}
        popupFlag={popupFlag}
        image={
          "https://icons-for-free.com/iconfiles/png/512/map+point+icon-1320073183505881976.png"
        }
      />
      <div className="cancel-box" style={{ display: cancelBox }}>
        <span onClick={handleCancel}>Cancel</span>
      </div>
      <div className="cancel-box1" style={{ display: cancelBox1 }}>
        <span onClick={handleCancel1}>Cancel</span>
      </div>
      <div className="cancel-box2" style={{ display: cancelBox2 }}>
        <span onClick={handleCancel2}>Cancel</span>
      </div>
    </div>
  );
};

export default Toolbar;
