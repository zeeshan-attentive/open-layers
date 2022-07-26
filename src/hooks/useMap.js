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
  GEOMETRY_TYPE_STRING,
  GOOGLE_IMAGERY_SATELLITE,
} from "../Constants";
import { Draw, Modify, defaults as defaultInteractions } from "ol/interaction";
import GeoJSON from "ol/format/GeoJSON";
import data from "../files/random.json";
import { editStyles, mapStyles } from "../OlStyles";

export const useMap = () => {
  const [map, setMap] = useState();
  const draw = useRef();
  const modify = useRef();
  const style = useRef();

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

  const drawGeometry = (geomType, options) => {
    cancelAllInteraction();

    let layer = getLayerById(geomType);
    if (!layer) layer = addVectorLayer(geomType);

    let source = layer.getSource();

    draw.current = new Draw({
      source: source,
      type: GEOMETRY_TYPE_STRING[geomType],
      style: mapStyles[GEOMETRY_TYPE_STRING[geomType]],
    });

    map.addInteraction(draw.current);

    draw.current.on("drawend", (e) => {
      options.onDrawEnd();
      e.feature.setStyle(mapStyles[GEOMETRY_TYPE_STRING[geomType]]);
    });
  };

  const cancelAllInteraction = () => {
    draw.current && map.removeInteraction(draw.current);
    modify.current && map.removeInteraction(modify.current);
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

    let arr = layer.getSource().getFeatures();
    style.current = arr[0].getStyle();

    const source = layer.getSource();
    modify.current = new Modify({ source: source });

    cancelAllInteraction();
    map.addInteraction(modify.current);

    source.forEachFeature((feature) => {
      feature.setStyle(editStyles[GEOMETRY_TYPE_STRING[geomType]]);
    });
  };

  const cancelEdit = (geomType) => {
    cancelAllInteraction();

    let layer = getLayerById(geomType);
    if (!layer) return;

    const source = layer.getSource();

    if (style.current)
      source.forEachFeature((feature) => {
        feature.setStyle(style.current);
      });
  };

  const renderGeojson = () => {
    cancelAllInteraction();

    let source = new VectorSource({
      features: new GeoJSON().readFeatures(data),
    });

    const geojsonLayer = new VectorLayer({
      id: GEOJSON_LAYER_ID,
      source: source,
    });

    source.forEachFeature((feature) => {
      feature.setStyle(mapStyles[feature.getGeometry().getType()]);
    });

    map.addLayer(geojsonLayer);
  };

  const removeGeojson = () => {
    let layer = getLayerById(GEOJSON_LAYER_ID);
    if (!layer) return;

    map.removeLayer(layer);
  };

  const exportGeojson = (layer) => {
    let features = [];

    if (layer) {
      let source = layer.getSource();
      source.forEachFeature((feature) => {
        features.push(feature);
      });
    } else {
      map.getAllLayers().forEach((layer) => {
        if (layer.get("id") !== BASE_LAYER_ID) {
          let source = layer.getSource();
          source.forEachFeature((feature) => {
            features.push(feature);
          });
        }
      });
    }

    let geojson = new GeoJSON();
    let finalObject = geojson.writeFeaturesObject(features);

    console.log(finalObject);
  };

  const toggleLayersVisibility = () => {
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

  const getLayerId = (layer) => {
    return layer.getProperties().id;
  };

  return {
    drawGeometry,
    cancelAllInteraction,
    editFeatures,
    cancelEdit,
    renderGeojson,
    removeGeojson,
    exportGeojson,
    toggleLayersVisibility,
    getLayersForView,
    zoomToLayer,
    removeLayer,
    hideOneLayer,
    getLayerId,
  };
};
