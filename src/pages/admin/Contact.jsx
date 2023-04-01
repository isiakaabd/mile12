import React, { useState } from "react";
import BasicTables, {
  EmptyCells,
  StyledTableCell,
  StyledTableRow,
} from "./components/Table";
import { useGetContactsQuery } from "redux/slices/adminSlice";
import { Typography, Skeleton } from "@mui/material";
import { Error } from "components";

const Contact = () => {
  const [page] = useState(1);
  const { data, isLoading, error } = useGetContactsQuery({ offset: page - 1 });
  if (isLoading) return <Skeleton />;
  if (error) return <Error error={error} />;
  const headers = ["Name", "Email Address", "Message"];
  return (
    <BasicTables headers={headers}>
      {data?.contacts?.length > 0 ? (
        data?.contacts?.map((row) => (
          <StyledTableRow>
            <StyledTableCell align="left">
              <Typography noWrap variant="span">
                {row.name}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="left">{row.email}</StyledTableCell>
            <StyledTableCell align="left">{row.message}</StyledTableCell>
          </StyledTableRow>
        ))
      ) : (
        <EmptyCells />
      )}
    </BasicTables>
  );
};

export default Contact;
