import { Avatar, Grid } from "@mui/material";
import { CustomButton } from "components";
import { useState } from "react";
import FormikControl from "validation/FormikControl";

const NewProductUpload = ({ values, setValue }) => {
  const [active, setActive] = useState(0);

  return (
    <Grid item container>
      <Grid item container>
        <Grid item container gap={4} flexWrap="nowrap">
          <Grid item xs={6}>
            <Grid item container>
              <Grid item container gap={2}>
                <Grid item container>
                  <FormikControl name="name" placeholder="Name of Item" />
                </Grid>
                <Grid item container>
                  <FormikControl control={"file"} name="file" multiple />
                </Grid>
                <Grid
                  item
                  container
                  display="grid"
                  gap={1}
                  gridTemplateColumns={{
                    xs: "repeat(auto-fill, minmax(5rem, 1fr))",
                  }}
                >
                  {values?.file?.preview?.map((item, idx) => (
                    <Grid
                      key={idx}
                      item
                      sx={{
                        p: 0.5,
                        border: `.3rem solid ${
                          idx === active ? "#EBC1FF" : "#F6F6F6"
                        }`,
                      }}
                    >
                      <Avatar
                        variant="square"
                        src={item}
                        sx={{
                          cursor: "pointer",
                          "& .MuiAvatar-img": {
                            objectFit: "contain !important",
                          },
                          maxHeight: "100%",
                          transition: "border 1ms linear",
                        }}
                        onClick={() => setActive(idx)}
                      />
                    </Grid>
                  ))}
                  {/* <Grid item>
                          <Grid
                            item
                            container
                            sx={{
                              height: "100%",
                              backgroundColor: "#F2F2F2",
                            }}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <AddOutlined sx={{ fontSize: "3rem" }} />
                          </Grid>
                        </Grid> */}
                </Grid>
                <Grid item container>
                  <FormikControl name="price" placeholder="Item Price" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid item container gap={2}>
              <Grid item container>
                <FormikControl
                  name="description"
                  placeholder="Description"
                  control={"textarea"}
                />
              </Grid>
              <Grid item container>
                <CustomButton
                  onClick={() => setValue(1)}
                  type="button"
                  title="Next"
                />

                {/* </Button> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewProductUpload;
