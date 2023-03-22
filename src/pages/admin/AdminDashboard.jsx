import { Grid } from "@mui/material";
import BasicCard from "./components/Card";
import BusIcon from "assets/svg/Bus";
import BusIcon2 from "assets/svg/Bus2";
import BusIcon3 from "assets/svg/Bus3";
import BasicTables from "./components/Table";

const AdminDashboard = () => {
  const arr = [
    {
      headings: "Ongoing orders",
      figure: 300,
      Icon: BusIcon,
    },
    {
      headings: "Incoming orders",
      figure: 5,
      Icon: BusIcon2,
    },
    {
      headings: "Completed orders",
      figure: 1000,
      Icon: BusIcon3,
    },
  ];

  return (
    <Grid item container gap={2} flexDirection={"column"} sx={{ p: 3 }}>
      <Grid item container gap={2} flexWrap={"nowrap"} sx={{ p: 3 }}>
        {arr.map((item, idx) => (
          <Grid item xs={4}>
            <BasicCard key={idx} item={item} />
          </Grid>
        ))}
      </Grid>
      <BasicTables
        values={[
          {
            item: "Black Hoodie (2)",
            cost: "NGN 140,000",
            shippingFee: "NGN 2000",
            time: "3 Days",
            orderId: "5757585gfjhjhjhj",
            status: "Ongoing",
          },
          {
            item: "Black Hoodie (2)",
            cost: "NGN 140,000",
            shippingFee: "NGN 2000",
            time: "3 Days",
            orderId: "5757585gfjhjhjhj",
            status: "Ongoing",
          },
        ]}
      />
    </Grid>
  );
};

export default AdminDashboard;
