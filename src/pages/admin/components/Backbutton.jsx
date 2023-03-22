import { ArrowBackOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Backbutton = () => {
  const navigate = useNavigate();
  return (
    <Button
      color="secondary"
      sx={{ fontSize: "2rem", textTransform: "capitalize" }}
      startIcon={<ArrowBackOutlined sx={{ fontSize: "2rem" }} />}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default Backbutton;
