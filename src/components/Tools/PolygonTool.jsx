import React from "react";
import "./tools.css";

const PolygonTool = ({ setSelectedTool }) => {
    const handleClick = () => {
        setSelectedTool("Polygon");
    };

    return (
        <div>
            <img
                onClick={handleClick}
                className="draw-tool"
                src="https://cdn-icons-png.flaticon.com/512/7168/7168063.png"
                alt=""
            />
        </div>
    );
};

export default PolygonTool;
