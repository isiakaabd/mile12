import { ArrowBack } from "@mui/icons-material";
import { Divider, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { CustomButton } from "components";
import Success from "components/Success";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateAddressMutation,
  useGetAddressQuery,
} from "redux/slices/addressSlice";
import { useMakeOrderMutation } from "redux/slices/orderSlice";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";

const validationSchema = Yup.object({
  street: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  phone: Yup.number().typeError("only number").required("Required"),
  zip: Yup.number().typeError("only number").required("Required"),
});
const Checkout = () => {
  const [modal, setModal] = useState(false);
  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const { isLoading: load, data: address } = useGetAddressQuery();
  const [createOrder, { isLoading: loadi }] = useMakeOrderMutation();
  const { carts, totalPayout } = useSelector((state) => state.carts);

  const handleSubmit = async (value, { resetForm }) => {
    const { street, lastName, firstName, phone, zip, state } = value;

    const { data, error } = await createAddress({
      first_name: firstName,
      last_name: lastName,
      street_address: street,
      phone_number: phone,
      zip_code: zip,
      state: state,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => setModal(true), 3000);
      setTimeout(() => resetForm(), 4000);
    }
    if (error) toast.error(error);
  };
  const add = address?.at(1);
  console.log(add);
  const newArr = carts.map((item) => {
    return {
      item_id: item?.id,
      count: item?.number,
    };
  });
  const handleCheckOut = async () => {
    const { data, error } = await createOrder({
      address: add?.id,
      items: newArr,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => setModal(true), 3000);
    }
    if (error) toast.error(error);
  };

  return (
    <>
      <Grid
        item
        container
        flexDirection="column"
        gap={2}
        sx={{ py: 4, pt: { sm: 2, xs: 1 }, px: { md: 5, xs: 1 } }}
      >
        <Grid item>
          <IconButton size="large" edge="start">
            <ArrowBack sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Grid>
        <Typography color="secondary" variant="h3">
          Shipping Address
        </Typography>
        <Grid item container rowGap={3} flexWrap={{ md: "nowrap" }}>
          <Grid item md={8} sm={6} sx={{ p: { sm: 3 } }}>
            <Grid item container>
              <Formik
                initialValues={{
                  address: add
                    ? `${add?.zip_code}, ${add?.street_address}, ${add?.state}`
                    : "",
                  street: add?.street_address || "",
                  lastName: "",
                  firstName: "",
                  phone: "",
                  zip: add?.zip_code || "",
                  state: add?.state || "",
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values }) => {
                  console.log(values);
                  return (
                    <Form style={{ width: "100%" }}>
                      {load ? (
                        <Skeleton
                          variant="rounded"
                          sx={{ height: "4rem", width: "100%" }}
                        />
                      ) : (
                        <Grid item container>
                          <FormikControl
                            name="address"
                            placeholder="Recent Address"
                            disabled={add ? true : false}
                          />
                        </Grid>
                      )}

                      <Grid item container>
                        <Typography variant="h6" my={2}>
                          New Address
                        </Typography>
                        <Grid item container gap={2}>
                          <Grid
                            item
                            container
                            gap={2}
                            flexWrap={{ md: "nowrap" }}
                          >
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

                          <Grid
                            item
                            container
                            gap={2}
                            flexWrap={{ md: "nowrap" }}
                          >
                            <Grid item md={6} xs={12}>
                              <FormikControl
                                name="phone"
                                placeholder="Phone Number"
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <FormikControl
                                name="zip"
                                placeholder="Zip Code"
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            gap={2}
                            flexWrap={{ md: "nowrap" }}
                          >
                            <Grid item md={6} xs={12}>
                              <FormikControl name="state" placeholder="State" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <FormikControl
                                name="street"
                                placeholder="Street Address"
                              />
                            </Grid>
                          </Grid>
                          <Grid item mt={4}>
                            <CustomButton
                              isSubmitting={isLoading}
                              title="Use This Address"
                              type="submit"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
          </Grid>
          <Grid item md={4} sm={6}>
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
                    {`Items (${carts.length})`}
                  </Typography>
                  <Typography variant="h5">
                    $ {totalPayout?.toLocaleString()}
                  </Typography>
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
                  <Typography variant="h5">
                    $ {totalPayout >= 150 ? 0 : 9.99 * carts.length - 1}
                  </Typography>
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
                  <CustomButton
                    title={"Continue"}
                    isSubmitting={loadi}
                    type="button"
                    onClick={handleCheckOut}
                  />
                </Grid>
              </Grid>
              {/* <Grid
                item
                sx={{ p: 2, bgcolor: "#EFEFEF", borderRadius: ".6rem" }}
                flexDirection={"column"}
                container
                gap={2}
              >
                <Typography variant="h5">Payment Method</Typography>

                <Grid item container>
                  <CustomButton title={"Pay with Stripe"} />
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Success open={modal} handleClose={() => setModal(false)} />
    </>
  );
};

export default Checkout;
