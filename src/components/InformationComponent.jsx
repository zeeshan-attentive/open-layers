import React, { useContext, useState } from "react";
import { MapContext } from "./MapComponent";
import StyleModal from "./StyleModal";

const InformationComponent = () => {
  const map = useContext(MapContext);

  const [allLayers, setAllLayers] = useState([]);
  const [lyr, setLyr] = useState();
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState();
  const [color, setColor] = useState({});

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const refreshAllLayers = () => {
    setAllLayers(map.getLayersForView());
  };

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
          onClick={() => {
            setVisible(!visible);
            map.hideAllLayers();
          }}
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
                      onClick={() => map.hideOneLayer(e)}
                      className="information-one-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/117/117453.png"
                      alt=""
                      onClick={() => map.zoomToLayer(e)}
                      className="information-one-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                      alt=""
                      onClick={() => {
                        map.removeLayer(e);
                        setAllLayers(map.getLayersForView());
                      }}
                      className="information-one-img"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/151/151900.png"
                      alt=""
                      onClick={() => map.exportGeojson(e)}
                      className="information-one-img"
                    />
                  </div>
                  <StyleModal
                    modalVisible={modalVisible}
                    closeModal={closeModal}
                    color={color}
                    index={index}
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
