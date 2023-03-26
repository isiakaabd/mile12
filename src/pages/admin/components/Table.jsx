import { ArrowOutwardOutlined } from "@mui/icons-material";
import {
  Table,
  Paper,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  tableCellClasses,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
const shortText = (text) => {
  let word = text.slice(0, 8);
  return `${word}...`;
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: "pointer",
  textDecoration: "none",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.2rem",
    //  { md: "1.4rem", xs: "1.2rem" },
  },
}));
const BasicTables = ({ values }) => {
  return (
    <Grid item container>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: { md: "100%", xs: "100%" } }}
      >
        {/* //} */}
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="left">Item Cost</TableCell>
              <TableCell align="left" nonce="">
                Shipping fee
              </TableCell>
              <TableCell align="left">Time left</TableCell>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((row, index) => (
              <StyledTableRow
                component={Link}
                to={`/admin/order/${index}`}
                key={index}
                sx={
                  {
                    // "&:last-child td, &:last-child th": { border: 0 },
                  }
                }
              >
                <StyledTableCell align="left">{row.item}</StyledTableCell>
                <StyledTableCell align="left">{row.cost}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.shippingFee}
                </StyledTableCell>
                <StyledTableCell align="left">{row.time}</StyledTableCell>
                <StyledTableCell align="left" sx={{ color: "#AE01FF" }}>
                  {shortText(row.orderId)} <ArrowOutwardOutlined />
                </StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default BasicTables;
