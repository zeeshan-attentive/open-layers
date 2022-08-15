import React, { useContext, useState } from "react";
import { MapContext } from "./MapComponent";

const InformationComponent = () => {
  const useMap = useContext(MapContext);

  const [allLayers, setAllLayers] = useState([]);

  //   useEffect(() => {
  // setInterval(() => {
  // }, 5000);
  //   }, [useMap]);

  const showAllLayers = () => {
    setAllLayers(useMap.getLayersForView());
  };

  const handleLayers = () => {
    useMap.hideAllLayers();
  };

  const handleZoom = (layer) => {
    useMap.zoomToLayer(layer);
  };

  const handleDelete = (layer) => {
    useMap.removeLayer(layer);
    setAllLayers(useMap.getLayersForView());
  };

  const handleLayerView = (layer) => {
    useMap.hideOneLayer(layer);
  };

  const handleGeojson = (layer) => {
    useMap.exportLayerGeojson(layer);
  };

  return (
    <div className="information-container">
      <div>
        <input
          className="information-all-checkbox"
          type={"checkbox"}
          onChange={handleLayers}
        ></input>
        <span> Hide all layers</span>
      </div>
      <div className="information-one-layer">
        <button className="show-all-btn" onClick={showAllLayers}>
          Get all layers:
        </button>
        {allLayers
          ? allLayers.map((e, i) => {
              return (
                <div style={{ fontSize: "16px" }} key={i}>
                  <p
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    value={e}
                    key={i}
                  >
                    Layer {i + 1}:
                  </p>

                  <div>
                    <div style={{ marginBottom: "8px" }}>
                      <input
                        onChange={() => handleZoom(e)}
                        className="information-all-checkbox1"
                        type={"checkbox"}
                      ></input>
                      <span style={{ marginRight: "20px" }}>
                        {" "}
                        Zoom to Layer
                      </span>
                      <input
                        onChange={() => handleLayerView(e)}
                        className="information-all-checkbox1"
                        type={"checkbox"}
                      ></input>
                      <span> Hide Layer</span>
                    </div>
                    <div>
                      <div>
                        <button
                          className="information-btn1"
                          onClick={() => handleDelete(e)}
                        >
                          Delete Layer
                        </button>
                        <button
                          onClick={() => handleGeojson(e)}
                          className="information-btn2"
                        >
                          Geojson
                        </button>
                      </div>
                      <div>
                        <p className="styling-text">Styling:</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default InformationComponent;
