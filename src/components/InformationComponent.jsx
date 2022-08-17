import React, { useContext, useState } from "react";
import { MapContext } from "./MapComponent";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { HexColorPicker } from "react-colorful";

const InformationComponent = () => {
  const useMap = useContext(MapContext);

  const [allLayers, setAllLayers] = useState([]);
  const [lyr, setLyr] = useState();
  const [color, setColor] = useState("#aabbcc");
  const [width, setWidth] = useState(2);
  const [opacity, setOpacity] = useState(0.3);
  const [img1, setImg1] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (layer) => {
    setLyr(layer);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const showAllLayers = () => {
    setAllLayers(useMap.getLayersForView());
  };

  const handleLayers = () => {
    setImg1(!img1);
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

  const handleStyle = (lyr, width, color, opacity) => {
    useMap.changeStyle(lyr, width, color, opacity);
  };

  const style = {
    position: "absolute",
    top: "130px",
    right: "300px",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  return (
    <div className="information-container">
      <div className="information-hide-all">
        <img
          className="information-all-checkbox"
          src={
            img1
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
                  <div className="information-layer-div">
                    <button
                      className="open-modal-btn"
                      onClick={() => handleOpen(e)}
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
                            color={color}
                            onChange={(value) => {
                              setLyr(lyr);
                              setColor(value);
                              handleStyle(lyr, width, color, opacity);
                            }}
                          />
                          <p className="information-layer-heading">
                            Stroke Width:
                          </p>
                          <Slider
                            onChange={(event, value) => {
                              setLyr(lyr);
                              setWidth(value);
                              handleStyle(lyr, width, color, opacity);
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
                              setLyr(lyr);
                              setOpacity(value);
                              handleStyle(lyr, width, color, opacity);
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
