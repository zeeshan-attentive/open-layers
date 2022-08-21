import { Style, Stroke, Circle, Fill } from "ol/style";

export const mapStyles = {
  LineString: new Style({
    stroke: new Stroke({ color: "rgb(66, 141, 215)", width: 3 }),
  }),
  Polygon: new Style({
    stroke: new Stroke({ color: "rgb(66, 141, 215)", width: 3 }),
    fill: new Fill({
      color: "rgb(66, 141, 215, 0.2)",
    }),
  }),
  Point: new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({ color: "rgb(66, 141, 215, 0.2)" }),
      stroke: new Stroke({ color: "rgb(66, 141, 215)", width: 3 }),
    }),
  }),
};

export const editStyles = {
  LineString: new Style({
    stroke: new Stroke({
      color: "rgb(255, 87, 51)",
      width: 3,
      lineDash: [7],
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "rgb(255, 87, 51)",
      width: 3,
      lineDash: [7],
    }),
    fill: new Fill({
      color: "rgb(255, 87, 51,0.2)",
    }),
  }),
  Point: new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({ color: "rgb(255, 87, 51,0.2)" }),
      stroke: new Stroke({
        color: "rgb(255, 87, 51)",
        width: 3,
        lineDash: [3],
      }),
    }),
  }),
};
