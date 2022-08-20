import React from "react";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { HexColorPicker } from "react-colorful";

const StyleModal = ({
  modalVisible,
  closeModal,
  color,
  index,
  setColor,
  setOpacity,
  opacity,
  width,
  setWidth,
}) => {
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
    <Modal
      className="modal-div"
      open={modalVisible}
      onClose={closeModal}
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
          <p className="information-layer-heading">Stroke Width:</p>
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
  );
};

export default StyleModal;
