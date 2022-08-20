export const GOOGLE_IMAGERY_SATELLITE =
  "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}?v=1";

export const BASE_LAYER_ID = "BASE_LAYER";
export const GEOJSON_LAYER_ID = "GEOJSON_LAYER";

export const GEOMETRY_TYPE = {
  LINESTRING: 1,
  POLYGON: 2,
  POINT: 3,
};

export const VECTOR_LAYER_ID = {
  [GEOMETRY_TYPE.LINESTRING]: "LINESTRING_LAYER",
  [GEOMETRY_TYPE.POLYGON]: "POLYGON_LAYER",
  [GEOMETRY_TYPE.POINT]: "POINT_LAYER",
};

export const GEOMETRY_TYPE_STRING = {
  [GEOMETRY_TYPE.LINESTRING]: "LineString",
  [GEOMETRY_TYPE.POLYGON]: "Polygon",
  [GEOMETRY_TYPE.POINT]: "Point",
};
