import { useState } from "react";
import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useRateProductMutation } from "redux/slices/productSlice";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ value, setValue, readOnly, name, id }) {
  const [rateProduct, { data, isLoading }] = useRateProductMutation();
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        readOnly={readOnly}
        name={name}
        value={value}
        size="large"
        precision={0.5}
        getLabelText={getLabelText}
        onChange={async (event, newValue) => {
          setValue(newValue);
          await rateProduct({
            rating: newValue,
            product_id: id,
          });
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
