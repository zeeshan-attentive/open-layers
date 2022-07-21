import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
// import OSM from "ol/source/OSM";
// import { defaults } from "ol/interaction.js";
import "./mapped.css";

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
                zoom: 4,
            }),
            // interactions: defaults({
            //     // doubleClickZoom: false,
            //     // dragAndDrop: false,
            //     // dragPan: true,
            //     // keyboardPan: true,
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

    return (
        <div>
            <div ref={mapElement} className="map-container"></div>
        </div>
    );
};

export default Mapped;
