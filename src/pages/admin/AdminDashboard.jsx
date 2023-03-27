import { Grid, Skeleton } from "@mui/material";
import BasicCard from "./components/Card";
import BusIcon from "assets/svg/Bus";
import BusIcon2 from "assets/svg/Bus2";
import BusIcon3 from "assets/svg/Bus3";
import BasicTables from "./components/Table";
import { useGetStatsQuery } from "redux/slices/adminSlice";
import {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
} from "redux/slices/orderSlice";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const [values, setValues] = useState("");
  const { data: stats, isLoading } = useGetStatsQuery();
  const [getOrder, { data: ordersList, isLoading: load }] =
    useLazyGetOrdersQuery({});
  useEffect(() => {
    getOrder({
      offset: page - 1,
      status: values,
    });
    //eslint-disable-next-line
  }, [page, values]);
  const arr = [
    {
      headings: "Ongoing orders",
      figure: stats?.ongoing_orders,
      Icon: BusIcon,
    },
    {
      headings: "Incoming orders",
      figure: stats?.incoming,
      Icon: BusIcon2,
    },
    {
      headings: "Completed orders",
      figure: stats?.completed,
      Icon: BusIcon3,
    },
  ];
  // const { orders } = ordersList;
  const handleChange = (e) => setValues(e.target.value);
  //total_pages
  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Grid item container gap={2} flexWrap={{ sm: "nowrap", xs: "wrap" }}>
        {isLoading ? (
          <Skeletons />
        ) : (
          arr.map((item, idx) => (
            <Grid item sm={4} xs={12}>
              <BasicCard key={idx} item={item} />
            </Grid>
          ))
        )}
      </Grid>

      <Grid item container gap={2}>
        <Grid item ml="auto">
          <Formik initialValues={{ name: "recent" }}>
            <Form>
              <Grid item container>
                <FormikControl
                  name="recent"
                  control={"select"}
                  onChange={handleChange}
                  placeholder="Filter"
                  options={[
                    {
                      label: "Confirmed",
                      value: "confirmed",
                    },
                    {
                      label: "Order Placed",
                      value: "order_placed",
                    },
                    {
                      label: "Shipped",
                      value: "shipped",
                    },
                    {
                      label: "Ready For delivery",
                      value: "out_for_delivery",
                    },
                    {
                      label: "Delivered",
                      value: "delivered",
                    },
                  ]}
                />
              </Grid>
            </Form>
          </Formik>
        </Grid>
        {load ? <Skeletonss /> : <BasicTables values={ordersList?.orders} />}
      </Grid>
    </Grid>
  );
};
const Skeletons = () => {
  return (
    <Grid item container gap={2} flexWrap={{ sm: "nowrap", xs: "wrap" }}>
      {Array(3)
        .fill(undefined)
        .map((_, idx) => (
          <Grid
            item
            sm={4}
            key={idx}
            xs={12}
            sx={{ width: "100%", height: "12rem" }}
          >
            <Skeleton
              sx={{ width: "100%", height: "100%" }}
              variant="rounded"
            />
          </Grid>
        ))}
    </Grid>
  );
};
const Skeletonss = () => {
  return (
    <Grid item container sx={{ height: "20rem" }}>
      <Skeleton sx={{ width: "100%", height: "100%" }} variant="rounded" />
    </Grid>
  );
};
export default AdminDashboard;
