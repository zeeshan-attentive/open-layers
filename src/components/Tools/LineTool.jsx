import React from "react";
import "./tools.css";

const LineTool = ({ setSelectedTool }) => {
    const handleClick = () => {
        setSelectedTool("LineString");
    };

    return (
        <div>
            <img
                onClick={handleClick}
                className="draw-tool"
                src="https://cdn-icons-png.flaticon.com/512/876/876225.png"
                alt=""
            />
        </div>
    );
};

export default LineTool;
