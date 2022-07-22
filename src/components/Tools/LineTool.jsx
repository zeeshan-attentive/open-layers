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
                src="https://cdn-icons.flaticon.com/png/512/5410/premium/5410681.png?token=exp=1658485307~hmac=99145fe680df21a668eaf06ae252e54a"
                alt=""
            />
        </div>
    );
};

export default LineTool;
