import React, { useEffect, useState } from "react";
import { mapObj } from "../Map/index";
import Toolbar from "./Toolbar";

const MapComponent = () => {
  // const [drawType, setDrawType] = useState("LineString");

  useEffect(() => {
    mapObj.initMap();
  }, []);

  // useEffect(() => {
  //   mapObj.drawGeometry(drawType);
  // }, [drawType]);

  return (
    <div id="map" className="map-container">
      <Toolbar />
    </div>
  );
};

export default MapComponent;
