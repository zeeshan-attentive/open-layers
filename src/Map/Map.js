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
  LINESTRING_LAYER_ID,
  POINT_LAYER_ID,
  POLYGON_LAYER_ID,
} from "../Constants";
import Draw from "ol/interaction/Draw";

export class Map {
  constructor() {
    this.map = null;
    this.selectedLayer = null;
    this.draw = null;
    this.source = null;
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
    this.addVectorLayer();
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

  addVectorLayer() {
    const vectorLine = new VectorLayer({
      id: LINESTRING_LAYER_ID,
      source: new VectorSource({ wrapX: false }),
    });

    const vectorPolygon = new VectorLayer({
      id: POLYGON_LAYER_ID,
      source: new VectorSource({ wrapX: false }),
    });

    const vectorPoint = new VectorLayer({
      id: POINT_LAYER_ID,
      source: new VectorSource({ wrapX: false }),
    });

    this.map.addLayer(vectorLine);
    this.map.addLayer(vectorPolygon);
    this.map.addLayer(vectorPoint);
  }

  drawGeometry(geomType) {
    console.log(geomType);

    if (this.map && geomType !== "none") {
      if (geomType === 1) {
        this.map.getAllLayers().forEach((layer) => {
          if (layer.values_.id === LINESTRING_LAYER_ID) {
            this.source = layer.getSource();
            this.tool = "LineString";
          }
        });
      } else if (geomType === 2) {
        this.map.getAllLayers().forEach((layer) => {
          if (layer.values_.id === POLYGON_LAYER_ID) {
            this.source = layer.getSource();
            this.tool = "Polygon";
          }
        });
      } else {
        this.map.getAllLayers().forEach((layer) => {
          if (layer.values_.id === POINT_LAYER_ID) {
            this.source = layer.getSource();
            this.tool = "Point";
          }
        });
      }

      console.log(this.source);

      this.draw = new Draw({
        source: this.source,
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

  // cancelInteraction() {
  //   this.map.removeInteraction(this.draw);
  // }

  changeInteraction(geomType) {
    this.map.removeInteraction(this.draw);
    this.drawGeometry(geomType);
  }

  // undoPoint() {
  //   this.draw.removeLastPoint();
  // }
}
