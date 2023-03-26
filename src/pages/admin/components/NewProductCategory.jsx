import { useTheme } from "@emotion/react";
import { Chip, Grid, Typography } from "@mui/material";
import { CustomButton } from "components";
import Success from "components/Success";
import React, { useState } from "react";
import { useGetCategoriesQuery } from "redux/slices/productSlice";
import FormikControl from "validation/FormikControl";

const NewProductCategory = ({ isSubmitting, initialValues }) => {
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
  const [open, setOpen] = useState(false);

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const newCategory = categories?.map((item) => item.name);
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Grid item container gap={4}>
          <Grid item container>
            <FormikControl
              name="category"
              control={"autocomplete"}
              placeholder="Category"
              // defaultValue={initialValues.NewProductCategory}
              options={isLoading || isError ? [] : newCategory}
            />
          </Grid>
          <Grid item container>
            <FormikControl name="stock_count" placeholder="Stock Count" />
          </Grid>
          <Typography variant="h5">Recent Categories</Typography>
          <Grid item container gap={1}>
            {arr?.map((item, index) => (
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
                      item.id === state
                        ? theme.palette.primary.main
                        : "#E4E4E4",
                  },
                }}
              />
            ))}
          </Grid>
          <Grid item container>
            <CustomButton
              title="List Item"
              type="submit"
              isSubmitting={isSubmitting}
              // onClick={handleSumit}
            />

            {/* </Button> */}
          </Grid>
        </Grid>
      </Grid>
      <Success open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default NewProductCategory;
