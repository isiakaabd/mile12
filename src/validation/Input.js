import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
import { FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import { TextError } from "./TextError";

const Text = ({ name, placeholder, ...rest }) => (
  <FormControl sx={{ width: "100%" }} variant="outlined">
    <InputLabel htmlFor={`outlined-adornment-${name}`}>
      {placeholder}
    </InputLabel>
    <OutlinedInput id={name} label={placeholder} {...rest} />
  </FormControl>
);
const Input = (props) => {
  const { label, name, borderRadius, helperText, styles, ...rest } = props;

  return (
    <Grid item container direction="column">
      <Field name={name} as={Text} {...rest} />

      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
