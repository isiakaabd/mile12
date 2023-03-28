import { Grid, Skeleton, Typography } from "@mui/material";
import { Backbutton } from "./components";
import { useParams } from "react-router-dom";
import { CustomButton, Error } from "components";
import { useGetOrderQuery } from "redux/slices/orderSlice";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { useUpdateOrderMutation } from "redux/slices/adminSlice";

const AdminSingleOrder = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderQuery(id);
  const [updateOrder, { isLoading: load }] = useUpdateOrderMutation();

  if (isLoading) return <Skeleton />;
  if (isError) return <Error />;
  const { items, status } = order;
  const handleSubmit = async (value) => {
    await updateOrder({
      status: value.status,
      id,
    });
  };
  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Grid item>
        <Backbutton />
      </Grid>
      <Grid item>
        <Grid item container>
          <Formik
            enableReinitialize
            initialValues={{ status }}
            onSubmit={handleSubmit}
          >
            <Form style={{ width: "100%" }}>
              <Grid item container flexWrap="nowrap" alignItems={"center"}>
                <Typography flex={1} gutterBottom>
                  Order status:
                </Typography>
                <Grid item>
                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item>
                      <FormikControl
                        name="status"
                        control={"select"}
                        placeholder="Status"
                        options={[
                          {
                            label: "Confirmed",
                            value: "confirmed",
                          },
                          {
                            label: "Shipped",
                            value: "shipped",
                          },
                          {
                            label: "Sent For Delivery",
                            value: "out_for_delivery",
                          },
                          {
                            label: "Delivered",
                            value: "delivered",
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item>
                      <CustomButton
                        sx={{ height: "100%" }}
                        fontSize={{ md: "1.4rem", xs: "1rem" }}
                        title={"Update"}
                        isSubmitting={load}
                      />

                      {/* </LoadingButton> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
      <Grid
        item
        container
        sx={{
          px: 2,
          py: 4,
          borderRadius: "1rem",
          background: " rgba(204, 95, 255, 0.08)",
        }}
        gap={2}
      >
        <Grid item>
          <Typography variant="h6">Items Information</Typography>
        </Grid>
        {items.map((item) => (
          <Single key={item.item_id} item={item} />
        ))}
      </Grid>
    </Grid>
  );
};

export default AdminSingleOrder;
function Single({ item }) {
  const { name, category, price } = item?.product;
  return (
    <Grid item container flexWrap="nowrap" sx={{ "&>*": { flex: 1 } }}>
      <Grid item container flexDirection={"column"}>
        <Typography variant="body2" sx={{ color: "#979797" }}>
          Sender
        </Typography>
        <Typography variant="body2">{name}</Typography>
      </Grid>
      <Grid item container flexDirection={"column"}>
        <Typography variant="body2" sx={{ color: "#979797" }}>
          Category
        </Typography>
        <Typography variant="body2">{category}</Typography>
      </Grid>
      <Grid item container flexDirection={"column"}>
        <Typography variant="body2" sx={{ color: "#979797" }}>
          Item Count
        </Typography>
        <Typography variant="body2"> {item?.count}</Typography>
      </Grid>
      <Grid item container flexDirection={"column"}>
        <Typography variant="body2" sx={{ color: "#979797" }}>
          Item Value
        </Typography>
        <Typography variant="body2">$ {price?.toLocaleString()}</Typography>
      </Grid>
    </Grid>
  );
}
