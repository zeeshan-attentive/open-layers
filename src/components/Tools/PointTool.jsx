import React from "react";
import "./tools.css";

const PointTool = ({ setSelectedTool }) => {
    const handleClick = () => {
        setSelectedTool("Point");
    };

    return (
        <div>
            <img
                onClick={handleClick}
                className="draw-tool"
                src="https://cdn-icons-png.flaticon.com/512/3601/3601885.png"
                alt=""
            />
        </div>
    );
};

export default PointTool;
