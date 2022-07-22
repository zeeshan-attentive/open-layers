import React from "react";
import CircleTool from "./CircleTool";
import LineTool from "./LineTool";
import NoneTool from "./NoneTool";
import PointTool from "./PointTool";
import PolygonTool from "./PolygonTool";
import "./tools.css";

const ToolsSection = ({ setSelectedTool }) => {
    return (
        <div className="tools-div">
            <NoneTool setSelectedTool={setSelectedTool} />
            <PointTool setSelectedTool={setSelectedTool} />
            <LineTool setSelectedTool={setSelectedTool} />
            <PolygonTool setSelectedTool={setSelectedTool} />
            <CircleTool setSelectedTool={setSelectedTool} />
        </div>
    );
};

export default ToolsSection;
