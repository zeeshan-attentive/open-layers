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

import Draw from "ol/interaction/Draw";

export const useMap = () => {
  const [map, setMap] = useState();
  const draw = useRef();

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
    if (!map) return;

    const vectorLayer = new VectorLayer({
      id: id,
      source: new VectorSource(),
    });

    map.addLayer(vectorLayer);
    return vectorLayer;
  };

  const drawGeometry = (geomType) => {
    if (!map) return;

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

    draw.current.on("drawstart", (e) => {});

    map.addInteraction(draw.current);
  };

  const cancelInteraction = () => {
    if (!map) return;

    draw.current && map.removeInteraction(draw.current);
  };

  return { drawGeometry, cancelInteraction };
};
