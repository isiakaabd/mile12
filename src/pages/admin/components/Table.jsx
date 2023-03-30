import { ArrowOutwardOutlined } from "@mui/icons-material";
import {
  Table,
  Paper,
  TableBody,
  TableRow,
  TableHead,
  Chip,
  TableCell,
  TableContainer,
  tableCellClasses,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import NoData from "./NoData";
import { getDate, capitalize } from "helpers";
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
              <TableCell align="left">Shipping fee</TableCell>
              <TableCell align="left">Time left</TableCell>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values?.length > 0 ? (
              values?.map((row) => (
                <StyledTableRow
                  component={Link}
                  to={`/admin/${row.id}`}
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
              <StyledTableRow
                style={{
                  height: 53 * 4,
                  width: "100%",
                }}
              >
                <TableCell colSpan={10}>
                  <Grid container justifyContent="center">
                    <NoData />
                  </Grid>
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default BasicTables;
