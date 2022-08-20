import { Style, Stroke, Circle, Fill } from "ol/style";

export const mapStyle = new Style({
  stroke: new Stroke({
    color: "#4589A9",
    width: 3,
  }),
  fill: new Fill({ color: `rgba(255,255,255,0.3)` }),
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: "rgba(255,255,255,0.3)" }),
    stroke: new Stroke({
      color: "rgba(69, 137, 169)",
      width: 3,
    }),
  }),
});

export const editStyle = new Style({
  stroke: new Stroke({
    color: "#FF5733",
    width: 3,
    lineDash: [6],
  }),
  fill: new Fill({ color: "rgba(255,255,255,0.3)" }),
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: "rgba(255,255,255,0.3)" }),
    stroke: new Stroke({
      color: [255, 0, 0],
      width: 3,
      lineDash: [3],
    }),
  }),
});
