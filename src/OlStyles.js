import { Style, Stroke, Circle, Fill, Icon } from "ol/style";
import { asArray } from "ol/color";
import { GEOMETRY_TYPE } from "./Constants";

export const mapStyles = {
  LineString: new Style({
    stroke: new Stroke({ color: "rgb(66, 141, 215)", width: 3 }),
    image: new Icon({
      scale: 0.06,
      src: "https://cdn-icons.flaticon.com/png/512/4250/premium/4250315.png?token=exp=1661074814~hmac=c14f4946e0abf0e0f428cba3be805324",
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({ color: "rgb(66, 141, 215)", width: 3 }),
    fill: new Fill({
      color: "rgb(66, 141, 215, 0.2)",
    }),
    image: new Icon({
      scale: 0.06,
      src: "https://cdn-icons.flaticon.com/png/512/4250/premium/4250315.png?token=exp=1661074814~hmac=c14f4946e0abf0e0f428cba3be805324",
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

const getOpacity = (col, opacity) => {
  let color = asArray(col);
  color[3] = opacity;
  return color;
};

export const dynamicStyles = (layer, width, color, opacity) => {
  const source = layer.getSource();
  let radius;

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
        color: getOpacity(color || "rgb(66, 141, 215, 0.3)", opacity || 0.3),
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
