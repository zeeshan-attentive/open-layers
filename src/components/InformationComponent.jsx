import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "./MapComponent";
import StyleModal from "./StyleModal";

const InformationComponent = () => {
  const map = useContext(MapContext);

  const [allLayers, setAllLayers] = useState([]);
  const [lyr, setLyr] = useState();
  // Don't keep these i.e., color, width and opaicty states
  // Directly update the layer style
  const [color, setColor] = useState({
    0: "#428dd7",
    1: "#428dd7",
    2: "#428dd7",
  });
  const [width, setWidth] = useState({});
  const [opacity, setOpacity] = useState({
    0: 0.3,
    1: 0.3,
    2: 0.3,
  });
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState();

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const refreshAllLayers = () => {
    setAllLayers(map.getLayersForView());
  };

  const hideLayers = () => {
    setVisible(!visible);
    map.hideAllLayers();
  };

  const handleZoom = (layer) => {
    map.zoomToLayer(layer);
  };

  const handleDelete = (layer) => {
    map.removeLayer(layer);
    setAllLayers(map.getLayersForView());
  };

  const handleLayerView = (layer) => {
    map.hideOneLayer(layer);
  };

  const exportGeojson = (layer) => {
    map.exportLayerGeojson(layer);
  };

  // Don't use effect
  // Directly update layer style from Modal
  useEffect(() => {
    if (!lyr) return;

    const handleStyle = (lyr, width, color, opacity) => {
      map.changeStyle(lyr, width, color, opacity);
    };

    handleStyle(lyr, width[index], color[index], opacity[index]);
  }, [lyr, width, color, opacity, index, map]);

  return (
    <div className="information-container">
      <div className="information-hide-all">
        <img
          className="information-all-checkbox"
          src={
            visible
              ? "https://visualpharm.com/assets/691/Hide-595b40b85ba036ed117dd526.svg"
              : "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-1024.png"
          }
          alt=""
          onClick={hideLayers}
        />
        <span> Hide all layers</span>
      </div>
      <div className="information-one-layer">
        <button className="show-all-btn" onClick={refreshAllLayers}>
          Get all layers
        </button>
        {allLayers
          ? allLayers.map((e, i) => {
              return (
                <div key={i} className="information-layer-div">
                  <button
                    style={{ backgroundColor: color[i] || "#428dd7" }}
                    className="open-modal-btn"
                    onClick={() => {
                      setIndex(i);
                      setLyr(e);
                      showModal();
                    }}
                  ></button>
                  <p className="information-layer-name">Layer {i + 1}:</p>
                  <div className="information-layer-icons">
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-1024.png"
                      alt=""
                      onClick={() => handleLayerView(e)}
                      className="information-all-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/117/117453.png"
                      alt=""
                      onClick={() => handleZoom(e)}
                      className="information-all-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                      alt=""
                      onClick={() => handleDelete(e)}
                      className="information-all-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/151/151900.png"
                      alt=""
                      onClick={() => exportGeojson(e)}
                      className="information-all-img"
                    />
                  </div>
                  <StyleModal
                    modalVisible={modalVisible}
                    closeModal={closeModal}
                    color={color}
                    index={index}
                    setColor={setColor}
                    setWidth={setWidth}
                    width={width}
                    setOpacity={setOpacity}
                    opacity={opacity}
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
