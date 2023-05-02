import PropTypes from "prop-types";
import { Pagination } from "@mui/material";

const Paginations = ({ page, setPage, count }) => {
  const handleChange = (_, value) => {
    setPage(value);
  };

  return (
    <Pagination
      page={page}
      count={count}
      size="medium"
      sx={{
        margin: "auto",
        py: 2,
        color: "#AE01FF",
        "& .MuiPaginationItem-root": {
          alignItems: "center",
          fontSize: "2rem",
          "&.Mui-selected": {
            color: "#AE01FF",
          },
        },
        "& .MuiPaginationItem-icon": {
          fontSize: "3rem",
        },
      }}
      onChange={handleChange}
    />
  );
};

Paginations.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

Paginations.defaultProps = {
  count: 10,
};

export default Paginations;
