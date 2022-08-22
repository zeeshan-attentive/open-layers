import React from "react";
import { useMap } from "../hooks/useMap";
import { useTool } from "../hooks/useTool";
import InformationComponent from "./InformationComponent";
import Toolbar from "./Toolbar";

export const MapContext = React.createContext();
export const ToolContext = React.createContext();

const MapComponent = () => {
  const map = useMap();
  const tools = useTool(map);

  return (
    <MapContext.Provider value={map}>
      <div id="map" className="map-container">
        <ToolContext.Provider value={tools}>
          <Toolbar />
          <InformationComponent />
        </ToolContext.Provider>
      </div>
    </MapContext.Provider>
  );
};

export default MapComponent;
