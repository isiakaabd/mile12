import { ArrowBack } from "@mui/icons-material";
import { Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import { CustomButton } from "components";
import Success from "components/Success";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import FormikControl from "validation/FormikControl";

const Checkout = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        gap={2}
        sx={{ pt: 2, py: 4, px: { md: 5, xs: 2 } }}
      >
        <Grid item>
          <IconButton size="large" edge="start">
            <ArrowBack sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Grid>
        <Typography color="secondary" variant="h3">
          Shipping Address
        </Typography>
        <Grid item container flexWrap={{ md: "nowrap" }}>
          <Grid item md={8} sx={{ p: 3 }}>
            <Grid item container>
              <Formik
                initialValues={{
                  address: "",
                  street: "",
                  lastName: "",
                  firstName: "",
                  phone: "",
                  zip: "",
                  state: "",
                }}
              >
                <Form style={{ width: "100%" }}>
                  <Grid item container>
                    <FormikControl
                      name="address"
                      placeholder="Recent Address"
                    />
                  </Grid>
                  <Grid item container>
                    <Typography variant="h6" my={2}>
                      New Address
                    </Typography>
                    <Grid
                      item
                      container
                      gap={2}
                      // sx={{ background: "#8F8D8D", p: 3 }}
                    >
                      <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
                        <Grid item md={6} xs={12}>
                          <FormikControl
                            name="firstName"
                            placeholder="First Name"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormikControl
                            name="lastName"
                            placeholder="Last Name"
                          />
                        </Grid>
                      </Grid>

                      <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
                        <Grid item md={6} xs={12}>
                          <FormikControl
                            name="phone"
                            placeholder="Phone Number"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormikControl name="zip" placeholder="Zip Code" />
                        </Grid>
                      </Grid>
                      <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
                        <Grid item md={6} xs={12}>
                          <FormikControl name="state" placeholder="State" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormikControl
                            name="street"
                            placeholder="Street Address"
                          />
                        </Grid>
                        {/* <Grid item md={6} xs={12} sx={{ visibility: "hidden" }}>
                        <FormikControl name="state" placeholder="State" />
                      </Grid> */}
                      </Grid>
                      <Grid item mt={4}>
                        <CustomButton
                          title="Use This Address"
                          onClick={() => setModal(true)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid item container gap={4} flexDirection="column">
              <Grid
                item
                sx={{ p: 2, bgcolor: "#EFEFEF", borderRadius: ".6rem" }}
                flexDirection={"column"}
                container
                gap={2}
              >
                <Typography variant="h5">Order Summary</Typography>
                <Divider flexItem />
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Typography variant="h5" sx={{ color: "#8F8D8D" }}>
                    Items (2)
                  </Typography>
                  <Typography variant="h5">NGN 140,000</Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Typography variant="h5" sx={{ color: "#8F8D8D" }}>
                    Shipping fee:
                  </Typography>
                  <Typography variant="h5">NGN 2,000</Typography>
                </Grid>
                <Divider flexItem />
                <Typography
                  variant="h6"
                  sx={{ color: "#7C7777", fontWeight: 400 }}
                >
                  By placing your order, you agree to our company Privacy Policy
                  & Conditions of Use.{" "}
                </Typography>
                <Grid item container>
                  <CustomButton title={"Continue"} />
                </Grid>
              </Grid>
              <Grid
                item
                sx={{ p: 2, bgcolor: "#EFEFEF", borderRadius: ".6rem" }}
                flexDirection={"column"}
                container
                gap={2}
              >
                <Typography variant="h5">Payment Method</Typography>
                <Grid item container flexWrap="nowrap" gap={2}>
                  <Grid item flex={1}>
                    <Button fullWidth variant="outlined">
                      paystack
                    </Button>
                  </Grid>
                  <Grid item flex={1}>
                    <Button fullWidth variant="outlined">
                      Stripe
                    </Button>
                  </Grid>
                </Grid>
                <Grid item container>
                  <CustomButton title={"Continue"} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Success open={modal} handleClose={() => setModal(false)} />
    </>
  );
};

export default Checkout;
