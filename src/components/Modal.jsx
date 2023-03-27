import { CloseOutlined } from "@mui/icons-material";
import { Modal, Box, Grid, IconButton } from "@mui/material";
import PropTypes from "prop-types";

const Modals = ({
  isOpen,
  isClose,
  handleClose,
  width,
  title,
  color,
  children,
  rowSpacing,
  height,
  styles,
  background,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: height ? height : "auto",
    width: { md: 400, xs: "80%" },
    bgcolor: "#fff",
    borderRadius: "1rem",
    borderColor: "#373328",
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      closeAfterTransition
      aria-describedby="modal-description"
    >
      <Box sx={style} padding={{ xs: 2, md: 4 }}>
        <Grid item container justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Grid>
        {children}
      </Box>
    </Modal>
  );
};
Modals.propTypes = {
  isOpen: PropTypes.bool,
  isClose: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  rowSpacing: PropTypes.number,
};

Modals.defaultProps = {
  height: "auto",
};

export default Modals;
