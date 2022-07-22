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
                src="https://cdn-icons.flaticon.com/png/512/2740/premium/2740706.png?token=exp=1658491540~hmac=d8e360411069dd501a100d3f7be386e6"
                alt=""
            />
        </div>
    );
};

export default PointTool;
