import React, { useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
// import OSM from "ol/source/OSM";
import "./mapped.css";
import { useEffect } from "react";

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
        });
    }, []);

    return (
        <div>
            <div ref={mapElement} className="map-container"></div>
        </div>
    );
};

export default Mapped;
