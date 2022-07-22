import React from "react";
import "./tools.css";

const NoneTool = ({ setSelectedTool }) => {
    const handleClick = () => {
        setSelectedTool("None");
    };

    return (
        <div>
            <img
                onClick={handleClick}
                className="draw-tool"
                src="https://cdn-icons-png.flaticon.com/512/803/803253.png"
                alt=""
            />
        </div>
    );
};

export default NoneTool;
