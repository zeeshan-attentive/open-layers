import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
// import { defaults } from "ol/interaction.js";
// import OSM from "ol/source/OSM";
import "./mapped.css";
import ToolsSection from "../Tools/ToolsSection";

const Mapped = () => {
    const mapElement = useRef();

    const GOOGLE_IMAGERY_SATELLITE =
        "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}?v=1";

    useEffect(() => {
        new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: GOOGLE_IMAGERY_SATELLITE,
                    }),
                    // source: new OSM(),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
            // interactions: defaults({
            //     // doubleClickZoom: false,
            //     // dragAndDrop: false,
            //     dragPan: true,
            //     keyboardPan: true,
            //     // keyboardZoom: true,
            //     // mouseWheelZoom: true,
            //     // pointer: false,
            //     // select: false,
            // }),
            // controls: defaults({
            //     attribution: false,
            //     zoom: false,
            // }),
            keyboardEventTarget: document,
        });
    }, []);

    useEffect(() => {
        const callback = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.code === "KeyI") {
                console.log("Pressed Control + I");
            }
        };

        document.addEventListener("keydown", callback);

        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, []);

    return (
        <div>
            <div ref={mapElement} className="map-container">
                <ToolsSection />
            </div>
        </div>
    );
};

export default Mapped;
