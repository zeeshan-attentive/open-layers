import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "./MapComponent";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { HexColorPicker } from "react-colorful";

const InformationComponent = () => {
  // Rename useMap to map
  const useMap = useContext(MapContext);

  const [allLayers, setAllLayers] = useState([]);
  const [lyr, setLyr] = useState();
  th;

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

  // Rename view to visible
  const [view, setView] = useState(false);

  // Rename it to modalVisible
  const [open, setOpen] = useState(false);

  const [index, setIndex] = useState();

  // Rename it to showModal
  const handleOpen = () => {
    setOpen(true);
  };

  // Rename it to closeModal
  const handleClose = () => setOpen(false);

  // Rename to refreshAllLayers
  const showAllLayers = () => {
    setAllLayers(useMap.getLayersForView());
  };

  // Rename to hideAllLayers
  const handleLayers = () => {
    setView(!view);
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

  // Don't use effect
  // Directly update layer style from Modal
  useEffect(() => {
    if (!lyr) return;

    const handleStyle = (lyr, width, color, opacity) => {
      useMap.changeStyle(lyr, width, color, opacity);
    };

    handleStyle(lyr, width[index], color[index], opacity[index]);
  }, [lyr, width, color, opacity, index, useMap]);

  const style = {
    position: "absolute",
    top: "130px",
    right: "300px",
    width: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  return (
    <div className="information-container">
      <div className="information-hide-all">
        <img
          className="information-all-checkbox"
          src={
            view
              ? "https://visualpharm.com/assets/691/Hide-595b40b85ba036ed117dd526.svg"
              : "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-1024.png"
          }
          alt=""
          onClick={handleLayers}
        />
        <span> Hide all layers</span>
      </div>
      <div className="information-one-layer">
        <button className="show-all-btn" onClick={showAllLayers}>
          Get all layers
        </button>
        {allLayers
          ? allLayers.map((e, i) => {
              return (
                <div key={i}>
                  {/* Remove outer div and add key={i} to inner div */}
                  <div className="information-layer-div">
                    <button
                      style={{ backgroundColor: color[i] || "#428dd7" }}
                      className="open-modal-btn"
                      onClick={() => {
                        setIndex(i);
                        setLyr(e);
                        handleOpen();
                      }}
                    ></button>
                    <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                      Layer {i + 1}:
                    </p>
                    <div className="information-layer-icons">
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-1024.png"
                        alt=""
                        onClick={() => handleLayerView(e)}
                        className="information-all-checkbox1"
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/117/117453.png"
                        alt=""
                        onClick={() => handleZoom(e)}
                        className="information-all-checkbox1"
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                        alt=""
                        onClick={() => handleDelete(e)}
                        className="information-all-checkbox1"
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/151/151900.png"
                        alt=""
                        onClick={() => handleGeojson(e)}
                        className="information-all-checkbox1"
                      />
                    </div>
                  </div>
                  <div>
                    {/* Remove this div */}
                    {/* Make a new component for Modal */}
                    {/* Add the new modal component as the last child of above div */}
                    {/* Pass all required info as props to the component */}
                    <Modal
                      className="modal-div"
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      BackdropProps={{ invisible: true }}
                    >
                      <Box sx={style}>
                        <div style={{ fontSize: "16px" }}>
                          <p style={{ marginTop: "5px" }}>Fill and Outline:</p>
                          <HexColorPicker
                            color={color[index] || "#428dd7"}
                            onChange={(value) => {
                              setColor({ ...color, [index]: value });
                            }}
                          />
                          <p className="information-layer-heading">
                            Stroke Width:
                          </p>
                          <Slider
                            onChange={(event, value) => {
                              setWidth({ ...width, [index]: value });
                            }}
                            size="small"
                            step={1}
                            min={1}
                            max={10}
                            defaultValue={3}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                          />
                          <p className="information-layer-heading">Opacity:</p>
                          <Slider
                            onChange={(event, value) => {
                              setOpacity({ ...opacity, [index]: value });
                            }}
                            size="small"
                            step={0.1}
                            min={0}
                            max={1}
                            defaultValue={0.3}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                          />
                        </div>
                      </Box>
                    </Modal>
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
