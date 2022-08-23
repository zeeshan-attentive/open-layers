import { useState } from "react";

export const useTool = (map) => {
  const [activeTool, setActiveTool] = useState();

  const openDrawTool = (geomType) => {
    setActiveTool(geomType);
    map.drawGeometry(geomType, {
      onDrawEnd: () => closeTool(),
    });
  };

  const closeTool = (geomType) => {
    setActiveTool(null);
    map.cancelAllInteraction();
    map.cancelEdit(geomType);
  };

  return { activeTool, openDrawTool, closeTool };
};
