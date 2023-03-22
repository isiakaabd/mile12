import { ArrowOutwardOutlined } from "@mui/icons-material";
import {
  Table,
  Paper,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const shortText = (text) => {
  let word = text.slice(0, 8);
  return `${word}...`;
};
const BasicTables = ({ values }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="simple-test-table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="left">Item Cost</TableCell>
            <TableCell align="left">Shipping fee</TableCell>
            <TableCell align="left">Time left</TableCell>
            <TableCell align="left">Order ID</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row, index) => (
            <TableRow
              component={Link}
              to={`/admin/order/${index}`}
              key={index}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="left">{row.item}</TableCell>
              <TableCell align="left">{row.cost}</TableCell>
              <TableCell align="left">{row.shippingFee}</TableCell>
              <TableCell align="left">{row.time}</TableCell>
              <TableCell align="left" sx={{ color: "#AE01FF" }}>
                {shortText(row.orderId)} <ArrowOutwardOutlined />
              </TableCell>
              <TableCell align="left">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTables;
