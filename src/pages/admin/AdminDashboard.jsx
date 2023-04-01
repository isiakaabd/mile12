import { Chip, Grid, Skeleton, Typography } from "@mui/material";
import BasicCard from "./components/Card";
import BusIcon from "assets/svg/Bus";
import BusIcon2 from "assets/svg/Bus2";
import BusIcon3 from "assets/svg/Bus3";
import BasicTables, {
  EmptyCells,
  StyledTableCell,
  StyledTableRow,
} from "./components/Table";
import { useGetStatsQuery } from "redux/slices/adminSlice";
import { useLazyGetOrdersQuery } from "redux/slices/orderSlice";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { Link } from "react-router-dom";
import { capitalize, getDate, shortText } from "helpers";
import { ArrowOutwardOutlined } from "@mui/icons-material";

const AdminDashboard = () => {
  const [page] = useState(1);
  const [values, setValues] = useState("");
  const { data: stats, isLoading } = useGetStatsQuery();
  const [getOrder, { data: ordersList, isLoading: load }] =
    useLazyGetOrdersQuery();
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

  const headers = [
    "Item",
    "Item Cost",
    "Shipping fee",
    "Time left",
    "Order ID",
    "Status",
  ];
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
                      label: "All",
                      value: "",
                    },
                    {
                      label: "Confirmed",
                      value: "confirmed",
                    },

                    {
                      label: "Pending",
                      value: "pending",
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
        {load ? (
          <Skeletonss />
        ) : (
          <BasicTables headers={headers}>
            {ordersList?.orders?.length > 0 ? (
              ordersList?.orders?.map((row) => (
                <StyledTableRow
                  component={Link}
                  to={`/dashboard/${row.id}`}
                  key={row.id}
                  sx={
                    {
                      // "&:last-child td, &:last-child th": { border: 0 },
                    }
                  }
                >
                  <StyledTableCell align="left">
                    {row.items.slice(0, 2).map((ite) => (
                      <Typography key={ite.item_id} noWrap variant="span">
                        {ite?.product?.name},
                      </Typography>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.cost}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.shipping_fee}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {getDate(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ color: "#AE01FF" }}>
                    {shortText(row.id)} <ArrowOutwardOutlined />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Chip
                      sx={{
                        fontSize: { md: "1.2rem", xs: "1rem" },
                        background:
                          row.status === "delivered" ? "#42936C" : "#FCF2CC",
                        color: row.status === "delivered" ? "#fff" : "#CD7B2E",
                      }}
                      label={capitalize(row?.status)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <EmptyCells />
            )}
          </BasicTables>
        )}
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
