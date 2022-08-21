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
import { editStyles, mapStyles } from "../OlStyles";
import { asArray } from "ol/color";

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
      style: mapStyles[GEOMETRY_TYPE_STRING[geomType]],
    });

    draw.current.on("drawend", () => {
      cancelInteraction(draw.current);
    });

    map.addInteraction(draw.current);
  };

  const cancelInteraction = (draw) => {
    map.removeInteraction(draw);
  };

  const getLayerById = (geomType) => {
    if (!map) return;
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

    setStyles(source, geomType);

    cancelInteraction(draw.current);
    map.addInteraction(modify.current);

    source.forEachFeature((feature) => {
      feature.setStyle(editStyles[GEOMETRY_TYPE_STRING[geomType]]);
    });
  };

  const cancelEdit = (geomType) => {
    cancelInteraction(modify.current);
    cancelInteraction(draw.current);

    let layer = getLayerById(geomType);
    if (!layer) return;

    const source = layer.getSource();
    modify.current = new Modify({ source: source });

    setStyles(source, geomType);
  };

  const setStyles = (source, geomType) => {
    source.forEachFeature((feature) => {
      feature.setStyle(mapStyles[GEOMETRY_TYPE_STRING[geomType]]);
    });
  };

  const renderGeojson = () => {
    if (draw.current) cancelInteraction(draw.current);

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

  const getOpacity = (col, opacity) => {
    let color = asArray(col);
    color[3] = opacity;
    console.log(opacity);
    return color;
  };

  const changeStyle = (layer, width, color, opacity) => {
    const source = layer.getSource();
    let radius;
    // console.log(opacity);
    if (layer.get("id") === GEOMETRY_TYPE.POINT) {
      radius = width;
    }

    const styles = {
      LineString: new Style({
        stroke: new Stroke({ color: color || "#428dd7", width: width || 3 }),
      }),
      Polygon: new Style({
        stroke: new Stroke({ color: color || "#428dd7", width: width || 3 }),
        fill: new Fill({
          color: color
            ? getOpacity(color, opacity || 0.3)
            : "rgb(66, 141, 215, 0.3)",
        }),
      }),
      Point: new Style({
        image: new Circle({
          radius: radius || 6,
          fill: new Fill({ color: [0, 0, 0, 0] }),
          stroke: new Stroke({ color: color || "#428dd7", width: 3 }),
        }),
      }),
    };

    source.forEachFeature((feature) => {
      feature.setStyle(styles[feature.getGeometry().getType()]);
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
