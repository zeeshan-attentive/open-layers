import TileLayer from "ol/layer/Tile";
import OlMap from "ol/Map";
import View from "ol/View";
import { XYZ } from "ol/source";
import { defaults } from "ol/control";
import { GOOGLE_IMAGERY_SATELLITE } from "../Constants";

export class Map {
  constructor() {
    this.map = null;
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
      source: new XYZ({
        url: GOOGLE_IMAGERY_SATELLITE,
      }),
    });

    this.map.addLayer(raster);
  }

  addVectorLayer() {}
}
