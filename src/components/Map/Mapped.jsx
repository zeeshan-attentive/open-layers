import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Draw from "ol/interaction/Draw";
import { defaults } from "ol/interaction.js";
import "./mapped.css";
import ToolsSection from "../Tools/ToolsSection";
import { useState } from "react";

const Mapped = () => {
    const [selectedTool, setSelectedTool] = useState("None");
    console.log(selectedTool);

    const mapElement = useRef();

    const GOOGLE_IMAGERY_SATELLITE =
        "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}?v=1";

    useEffect(() => {
        const raster = new TileLayer({
            source: new XYZ({
                url: GOOGLE_IMAGERY_SATELLITE,
            }),
        });

        const source = new VectorSource({ wrapX: false });

        const vector = new VectorLayer({
            source: source,
        });

        const map = new Map({
            target: mapElement.current,
            layers: [raster, vector],
            view: new View({
                center: [0, 0],
                zoom: 3,
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
            controls: defaults({
                attribution: false,
                zoom: false,
            }),
            keyboardEventTarget: document,
        });

        let draw;

        function addInteraction() {
            if (selectedTool !== "None") {
                draw = new Draw({
                    source: source,
                    type: selectedTool,
                });
                map.addInteraction(draw);
            }
        }

        function changeGeometry() {
            map.removeInteraction(draw);
            console.log(selectedTool);
            addInteraction();
            console.log(draw, "draw");
        }
        
        console.log(draw);
        changeGeometry();
        addInteraction();
    }, [selectedTool]);

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
                <ToolsSection setSelectedTool={setSelectedTool} />
            </div>
        </div>
    );
};

export default Mapped;
