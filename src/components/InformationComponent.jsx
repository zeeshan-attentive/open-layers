import React, { useContext, useState } from "react";
import { MapContext } from "./MapComponent";
import StyleModal from "./StyleModal";

const InformationComponent = () => {
  const map = useContext(MapContext);

  const [allLayers, setAllLayers] = useState([]);
  const [lyr, setLyr] = useState();
  const [layersVisible, setLayersVisible] = useState(false);
  const [styleModalVisible, setStyleModalVisible] = useState(false);
  const [color, setColor] = useState({});
  const [layerId, setLayerId] = useState();

  const showModal = () => {
    setStyleModalVisible(true);
  };

  const closeModal = () => setStyleModalVisible(false);

  const refreshAllLayers = () => {
    setAllLayers(map.getLayersForView());
  };

  const toggleLayersVisibility = () => {
    setLayersVisible(!layersVisible);
    map.toggleLayersVisibility();
  };

  const openLayerModal = (e) => {
    setLayerId(map.getLayerId(e));
    setLyr(e);
    showModal();
  };

  return (
    <div className="information-container">
      <div className="information-hide-allLayers">
        <img
          className="information-allLayers-checkbox"
          src={
            layersVisible
              ? "https://visualpharm.com/assets/691/Hide-595b40b85ba036ed117dd526.svg"
              : "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-1024.png"
          }
          alt=""
          onClick={toggleLayersVisibility}
        />
        <span> Hide all layers</span>
      </div>
      <div className="information-oneLayer">
        <button className="show-all-btn" onClick={refreshAllLayers}>
          Get all layers
        </button>
        {allLayers
          ? allLayers.map((e, i) => {
              return (
                <div key={i} className="information-layer-div">
                  <button
                    onClick={() => openLayerModal(e)}
                    style={{
                      backgroundColor: color[map.getLayerId(e)] || "#428dd7",
                    }}
                    className="open-modal-btn"
                  ></button>
                  <p className="information-layer-name">Layer {i + 1}:</p>
                  <div className="information-layer-icons">
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-1024.png"
                      alt=""
                      onClick={() => map.hideOneLayer(e)}
                      className="information-layer-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/117/117453.png"
                      alt=""
                      onClick={() => map.zoomToLayer(e)}
                      className="information-layer-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                      alt=""
                      onClick={() => {
                        map.removeLayer(e);
                        setAllLayers(map.getLayersForView());
                      }}
                      className="information-layer-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/151/151900.png"
                      alt=""
                      onClick={() => map.exportGeojson(e)}
                      className="information-layer-img"
                    />
                  </div>
                  <StyleModal
                    styleModalVisible={styleModalVisible}
                    closeModal={closeModal}
                    color={color}
                    layerId={layerId}
                    setColor={setColor}
                    lyr={lyr}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default InformationComponent;
