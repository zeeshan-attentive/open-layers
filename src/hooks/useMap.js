import { useRef, useEffect, useState } from "react";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import OlMap from "ol/Map";
import View from "ol/View";
import { XYZ } from "ol/source";
import { defaults } from "ol/control";
import {
  BASE_LAYER_ID,
  GEOMETRY_TYPE_STRING,
  GOOGLE_IMAGERY_SATELLITE,
} from "../Constants";
import { Draw, Modify, Snap } from "ol/interaction";
import { Style, Stroke, Circle, Fill } from "ol/style";

export const useMap = () => {
  const [map, setMap] = useState();
  const draw = useRef();
  const snap = useRef();
  const modify = useRef();

  useEffect(() => {
    const rasterlayer = new TileLayer({
      id: BASE_LAYER_ID,
      source: new XYZ({ url: GOOGLE_IMAGERY_SATELLITE }),
    });

    const olMap = new OlMap({
      target: "map",
      layers: [rasterlayer],
      view: new View({ center: [0, 0], zoom: 3, maxZoom: 24 }),
      controls: defaults({ attribution: false, zoom: true }),
    });

    setMap(olMap);

    return () => {
      olMap.setTarget(undefined);
      olMap.dispose();
    };
  }, []);

  const addVectorLayer = (id) => {
    const vectorLayer = new VectorLayer({
      id: id,
      source: new VectorSource(),
      wrapX: false,
    });

    map.addLayer(vectorLayer);
    return vectorLayer;
  };

  const drawGeometry = (geomType) => {
    draw.current && map.removeInteraction(draw.current);

    let layer;
    map.getAllLayers().forEach((lyr) => {
      if (lyr.get("id") === geomType) {
        layer = lyr;
      }
    });

    if (!layer) layer = addVectorLayer(geomType);

    const source = layer.getSource();

    draw.current = new Draw({
      source: source,
      type: GEOMETRY_TYPE_STRING[geomType],
    });

    draw.current.on("drawend", (e) => {
      // console.log(e);
    });

    map.addInteraction(draw.current);

    snap.current = new Snap({ source: source });
    map.addInteraction(snap.current);
  };

  const cancelInteraction = () => {
    if (!map) return;

    draw.current && map.removeInteraction(draw.current);
  };

  const editFeatures = (type) => {
    let layer;
    map.getAllLayers().forEach((lyr) => {
      if (lyr.get("id") === type) {
        layer = lyr;
      }
    });

    if (!layer) return;

    const source = layer.getSource();
    modify.current = new Modify({ source: source });

    source.forEachFeature(function (feature) {
      let style = new Style({
        stroke: new Stroke({
          color: "#FF5733",
          width: 2,
          lineDash: [6],
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: "rgba(255,255,255,0.4)" }),
          stroke: new Stroke({
            color: [255, 0, 0],
            width: 2,
            lineDash: [3],
          }),
        }),
      });

      feature.setStyle(style);
    });

    map.removeInteraction(draw.current);
    map.addInteraction(modify.current);
  };

  const cancelEdit = (type) => {
    map.removeInteraction(modify.current);

    let layer;
    map.getAllLayers().forEach((lyr) => {
      if (lyr.get("id") === type) {
        layer = lyr;
      }
    });

    if (!layer) return;

    const source = layer.getSource();
    modify.current = new Modify({ source: source });

    source.forEachFeature(function (feature) {
      let style = new Style({
        stroke: new Stroke({
          color: "#4589A9",
          width: 1.2,
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: "rgba(255,255,255,0.4)" }),
          stroke: new Stroke({
            color: "rgba(69, 137, 169)",
            width: 2,
          }),
        }),
      });

      feature.setStyle(style);
    });
  };

  return { drawGeometry, cancelInteraction, editFeatures, cancelEdit };
};
