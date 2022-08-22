import { useState } from "react";

export const useTool = (map) => {
  const [activeTool, setActiveTool] = useState();

  const openDrawTool = (geomType) => {
    setActiveTool(geomType);
    map.drawGeometry(geomType, {
      onDrawEnd: () => closeTool(),
    });
  };

  const closeTool = () => {
    setActiveTool(null);
    // Add cancelAllInteraction
  };

  return { activeTool, openDrawTool, closeTool };
};
