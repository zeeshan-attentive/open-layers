import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import OlMap from "ol/Map";
import View from "ol/View";
import { XYZ } from "ol/source";
import { defaults } from "ol/control";
import { GOOGLE_IMAGERY_SATELLITE } from "../Constants";
import Draw from "ol/interaction/Draw";
import { LINESTRING_LAYER_ID } from "../Constants";

export class Map {
  constructor() {
    this.map = null;
    this.selectedLayer = null;
    this.draw = null;
    this.source = new VectorSource({ wrapX: false });
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
    this.addVectorLayer();
  }

  addBaseLayer() {
    const raster = new TileLayer({
      source: new XYZ({
        url: GOOGLE_IMAGERY_SATELLITE,
      }),
    });
    this.map.addLayer(raster);
  }

  addVectorLayer() {
    const vector = new VectorLayer({
      source: this.source,
    });

    this.selectedLayer = vector;
    this.map.addLayer(vector);
  }

  drawGeometry(drawType) {
    this.draw = new Draw({
      source: this.source,
      type: drawType,
    });

    // this.draw.on("drawstart", (event) => {
    //   console.log("start");
    // });

    this.draw.on("drawend", (event) => {
      console.log("end");
      event.feature.setProperties({
        id: LINESTRING_LAYER_ID,
      });
    });

    this.map.addInteraction(this.draw);
  }

  // cancelInteraction() {
  //   this.map.removeInteraction(this.draw);
  // }

  // changeInteraction() {
  //   this.map.removeInteraction(this.draw);
  //   this.addDrawTool(this.draw);
  // }

  // undoPoint() {
  //   this.draw.removeLastPoint();
  // }
}
