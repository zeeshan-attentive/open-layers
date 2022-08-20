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
  GEOJSON_LAYER_ID,
  GEOMETRY_TYPE,
  GEOMETRY_TYPE_STRING,
  GOOGLE_IMAGERY_SATELLITE,
} from "../Constants";
import { Draw, Modify, defaults as defaultInteractions } from "ol/interaction";
import { Style, Stroke, Circle, Fill } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import data from "../files/random.json";
import { editStyle, mapStyle } from "../OlStyles";

export const useMap = () => {
  const [map, setMap] = useState();
  const draw = useRef();
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
      interactions: defaultInteractions({ doubleClickZoom: false }),
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
    draw.current && cancelInteraction(draw.current);

    let layer = getLayerById(geomType);

    if (!layer) layer = addVectorLayer(geomType);

    const source = layer.getSource();

    draw.current = new Draw({
      source: source,
      type: GEOMETRY_TYPE_STRING[geomType],
      style: mapStyle,
    });

    draw.current.on("drawend", () => {
      cancelInteraction(draw.current);
    });

    map.addInteraction(draw.current);
  };

  const cancelInteraction = (draw) => {
    if (draw) map.removeInteraction(draw);
  };

  const getLayerById = (geomType) => {
    if(!map) return;
    let layer;

    map.getAllLayers().forEach((lyr) => {
      if (lyr.get("id") === geomType) {
        layer = lyr;
      }
    });

    return layer;
  };

  const editFeatures = (geomType) => {
    let layer = getLayerById(geomType);
    if (!layer) return;

    const source = layer.getSource();
    modify.current = new Modify({ source: source });

    source.forEachFeature((feature) => {
      let style = editStyle;
      feature.setStyle(style);
    });

    cancelInteraction(draw.current);
    map.addInteraction(modify.current);
  };

  const cancelEdit = (geomType) => {
    cancelInteraction(modify.current);

    let layer = getLayerById(geomType);
    if (!layer) return;

    const source = layer.getSource();
    modify.current = new Modify({ source: source });

    source.forEachFeature((feature) => {
      let style = mapStyle;
      feature.setStyle(style);
    });
  };

  const renderGeojson = () => {
    map.cancelInteraction(draw.current);

    const geojsonLayer = new VectorLayer({
      id: GEOJSON_LAYER_ID,
      source: new VectorSource({
        features: new GeoJSON().readFeatures(data),
      }),
    });

    map.addLayer(geojsonLayer);
  };

  const removeGeojson = () => {
    let layer = getLayerById(GEOJSON_LAYER_ID);

    if (!layer) return;

    map.removeLayer(layer);
  };

  const exportGeojson = () => {
    let features = [];

    map.getAllLayers().forEach((layer) => {
      if (layer.get("id") !== BASE_LAYER_ID) {
        let source = layer.getSource();
        source.forEachFeature((feature) => {
          features.push(feature);
        });
      }
    });

    let geojson = new GeoJSON();
    let finalObject = geojson.writeFeaturesObject(features);

    console.log(finalObject);
  };

  const hideAllLayers = () => {
    map.getAllLayers().forEach((lyr) => {
      if (lyr.get("id") !== BASE_LAYER_ID) {
        lyr.setVisible(!lyr.getVisible());
      }
    });
  };

  const getLayersForView = () => {
    if (!map) return;

    const all = [];

    map.getAllLayers().forEach((lyr) => {
      if (lyr.get("id") !== BASE_LAYER_ID) {
        all.push(lyr);
      }
    });

    return all;
  };

  const zoomToLayer = (layer) => {
    let source = layer.getSource();
    map.getView().fit(source.getExtent(), map.getSize());
  };

  const removeLayer = (layer) => {
    map.removeLayer(layer);
  };

  const hideOneLayer = (layer) => {
    layer.setVisible(!layer.getVisible());
  };

  const exportLayerGeojson = (layer) => {
    let features = [];

    let source = layer.getSource();
    source.forEachFeature((feature) => {
      features.push(feature);
    });

    let geojson = new GeoJSON();
    let finalObject = geojson.writeFeaturesObject(features);

    console.log(finalObject);
  };

  const changeStyle = (layer, width, color, opacity) => {
    const source = layer.getSource();
    let radius;

    if (layer.get("id") === GEOMETRY_TYPE.POINT) {
      radius = width;
    }

    source.forEachFeature((feature) => {
      // Import from OlStyles.js
      let style = new Style({
        stroke: new Stroke({
          color: color,
          width: width,
        }),
        fill: new Fill({ color: `rgba(255,255,255,${opacity})` }),
        image: new Circle({
          radius: radius || 3,
          fill: new Fill({ color: `rgba(255,255,255,${opacity})` }),
          stroke: new Stroke({
            color: color,
            width: 3,
          }),
        }),
      });

      feature.setStyle(style);
    });
  };

  return {
    drawGeometry,
    cancelInteraction,
    editFeatures,
    cancelEdit,
    renderGeojson,
    removeGeojson,
    exportGeojson,
    hideAllLayers,
    getLayersForView,
    zoomToLayer,
    removeLayer,
    hideOneLayer,
    exportLayerGeojson,
    changeStyle,
  };
};
