import { useTheme } from "@emotion/react";
import { Chip, Grid, Typography } from "@mui/material";
import { useState } from "react";

const Categories = () => {
  const theme = useTheme();
  const arr = [
    {
      id: 0,
      name: "All",
      action: "#",
    },
    {
      id: 1,
      name: "Yam",
      action: "#",
    },
    {
      id: 2,
      name: "Beans",
      action: "#",
    },
    {
      id: 3,
      name: "Rice",
      action: "#",
    },
    {
      id: 4,
      name: "Chicken",
      action: "#",
    },
  ];
  const [state, setState] = useState(0);
  return (
    <Grid item container flexDirection="column" gap={1}>
      <Typography sx={{ color: "#1E1E1E" }}>Categories</Typography>
      <Grid item container gap={1}>
        {arr.map((item, index) => (
          <Chip
            onClick={() => setState(index)}
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
    </Grid>
  );
};

export default Categories;
