import { ArrowBackOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Backbutton = () => {
  const navigate = useNavigate();
  return (
    <Button
      color="secondary"
      sx={{
        p: 0,
        fontSize: { sm: "2rem", xs: "1.5rem" },
        textTransform: "capitalize",
      }}
      startIcon={
        <ArrowBackOutlined sx={{ fontSize: { sm: "2rem", xs: "1.5rem" } }} />
      }
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default Backbutton;
