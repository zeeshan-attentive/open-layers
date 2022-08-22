import React, { useContext, useState } from "react";
import { MapContext } from "../components/MapComponent";
import { GEOMETRY_TYPE } from "../Constants";

const DrawTool = ({ geomType, image }) => {
  const map = useContext(MapContext);

  const [cancelModal, setCancelModal] = useState("none");
  const [modalPosition, setModalPosition] = useState("15px");

  const handleClick = () => {
    if (geomType === GEOMETRY_TYPE.POLYGON) {
      setModalPosition("52px");
    } else if (geomType === GEOMETRY_TYPE.POINT) {
      setModalPosition("88px");
    }

    map.drawGeometry(geomType);
    setCancelModal("block");
  };

  return (
    <div>
      <img onClick={handleClick} className="draw-tool" src={image} alt="" />
      <div
        className="cancel-box"
        style={{ display: cancelModal, top: modalPosition }}
      >
        <span
          onClick={() => {
            setCancelModal("none");
            map.cancelEdit(geomType);
          }}
          className="cancel-box-div left"
        >
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
