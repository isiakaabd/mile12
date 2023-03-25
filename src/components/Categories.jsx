import { useTheme } from "@emotion/react";
import { AddOutlined } from "@mui/icons-material";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Categories = ({ categories, setCat }) => {
  const theme = useTheme();
  const [state, setState] = useState(1);
  const { admin } = useSelector((state) => state.auth);

  return (
    <Grid item container flexDirection="column" gap={1} mt={2}>
      <Typography variant="h3" gutterBottom sx={{ color: "#1E1E1E" }}>
        Categories
      </Typography>
      <Grid
        item
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"nowrap"}
      >
        <Grid item container gap={1}>
          {categories?.map((item, index) => (
            <Chip
              onClick={() => {
                setCat(item.slug);
                setState(index + 1);
              }}
              key={index}
              label={item.name}
              sx={{
                backgroundColor:
                  item.id === state ? theme.palette.primary.main : "#E4E4E4",
                fontSize: { md: "1.6rem", xs: "1.2rem", sm: "1.4rem" },
                borderRadius: ".4rem",
                color: "#000",
                "&:hover": {
                  backgroundColor:
                    item.id === state ? theme.palette.primary.main : "#E4E4E4",
                },
              }}
            />
          ))}
        </Grid>
        {admin && (
          <Grid item container justifyContent={"flex-end"}>
            <Button
              variant="contained"
              component={Link}
              to="/product/add"
              startIcon={<AddOutlined />}
            >
              Add New Item
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Categories;
