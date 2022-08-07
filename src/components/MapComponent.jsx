import React from "react";
import { useMap } from "../hooks/useMap";
import Toolbar from "./Toolbar";

export const MapContext = React.createContext();

const MapComponent = () => {
  const map = useMap();

  return (
    <MapContext.Provider value={map}>
      <div id="map" className="map-container">
        <Toolbar />
      </div>
    </MapContext.Provider>
  );
};

export default MapComponent;
