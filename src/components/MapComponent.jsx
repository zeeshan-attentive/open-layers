import React, { useEffect } from "react";
import { mapObj } from "../Map";
import Toolbar from "./Toolbar";

const MapComponent = () => {
  useEffect(() => {
    mapObj.initMap();
  }, []);

  return (
    <div id="map" className="map-container">
      <Toolbar />
    </div>
  );
};

export default MapComponent;
