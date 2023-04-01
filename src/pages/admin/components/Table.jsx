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
import NoData from "./NoData";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.2rem",
    //  { md: "1.4rem", xs: "1.2rem" },
  },
}));
const BasicTables = ({ headers, children }) => {
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
              {headers.map((item, idx) => (
                <TableCell align="left" key={idx}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export function EmptyCells() {
  return (
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
  );
}
export default BasicTables;
