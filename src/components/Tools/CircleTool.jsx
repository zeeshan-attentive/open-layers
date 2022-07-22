import React from "react";
import "./tools.css";

const CircleTool = ({ setSelectedTool }) => {
    const handleClick = () => {
        setSelectedTool("Circle");
    };

    return (
        <div>
            <img
                onClick={handleClick}
                className="draw-tool"
                src="https://cdn-icons-png.flaticon.com/512/481/481078.png"
                alt=""
            />
        </div>
    );
};

export default CircleTool;
