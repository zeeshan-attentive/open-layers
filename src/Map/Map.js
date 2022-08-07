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
  VECTOR_LAYER_ID,
} from "../Constants";
import Draw from "ol/interaction/Draw";

export class Map {
  constructor() {
    this.map = null;
    // this.selectedLayer = null;
    this.draw = null;
    this.featureId = 0;
  }

  initMap() {
    this.map = new OlMap({
      target: "map",
      layers: [],
      view: new View({
        center: [0, 0],
        zoom: 3,
        minZoom: 2,
        maxZoom: 24,
      }),
      controls: defaults({
        attribution: false,
        zoom: true,
      }),
    });

    this.addBaseLayer();
  }

  addBaseLayer() {
    const raster = new TileLayer({
      id: BASE_LAYER_ID,
      source: new XYZ({
        url: GOOGLE_IMAGERY_SATELLITE,
      }),
    });
    this.map.addLayer(raster);
  }

  addVectorLayer(layerId) {
    const layer = new VectorLayer({
      id: layerId,
      source: new VectorSource({ wrapX: false }),
    });

    this.map.addLayer(layer);
  }

  drawGeometry(geomType) {
    console.log(geomType);
    if (this.map && geomType !== "none") {
      this.addVectorLayer(VECTOR_LAYER_ID[geomType]);

      let layerSource;

      this.map.getAllLayers().forEach((layer) => {
        if (layer.values_.id === VECTOR_LAYER_ID[geomType]) {
          layerSource = layer.getSource();
        }
      });

      console.log(layerSource);

      this.draw = new Draw({
        source: layerSource,
        type: GEOMETRY_TYPE_STRING[geomType],
      });

      // this.draw.on("drawstart", (event) => {
      // });

      // this.draw.on("drawend", (event) => {
      // console.log("end");
      // event.feature.setProperties({
      //   id: this.featureId,
      // });
      // this.featureId++;
      // });

      console.log(this.draw);

      this.map.addInteraction(this.draw);
    }
  }

  cancelInteraction() {
    this.map.removeInteraction(this.draw);
  }

  changeInteraction(geomType) {
    this.map.removeInteraction(this.draw);
    this.drawGeometry(geomType);
  }

  // undoPoint() {
  //   this.draw.removeLastPoint();
  // }
}
