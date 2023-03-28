import { Field, ErrorMessage, useFormikContext } from "formik/dist";
import PropTypes from "prop-types";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { TextError } from "./TextError";

const Text = ({ name, placeholder, options, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <Autocomplete
      freeSolo
      id={name}
      options={options}
      {...rest}
      name={name}
      onChange={(event, newValue) => {
        setFieldValue(name, newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...rest}
          label={placeholder}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};
const Autocompletes = (props) => {
  const { name, ...rest } = props;

  return (
    <Grid item container direction="column">
      <Field name={name} as={Text} {...rest} />

      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Autocompletes.propTypes = {
  name: PropTypes.string,
};

export default Autocompletes;
