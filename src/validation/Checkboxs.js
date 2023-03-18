import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { useFormikContext, Field } from "formik/dist";
import PropTypes from "prop-types";

const Switchs = ({ placeholder, name, size, value, ...rest }) => {
  return (
    <FormControlLabel
      control={<Checkbox name={name} {...rest} />}
      label={placeholder}
    />
  );
};

const CheckBox = (props) => {
  const { errors } = useFormikContext();
  const { name, ...rest } = props;

  return (
    <Grid container direction="column">
      <Field id={name} type="checkbox" name={name} as={Switchs} {...rest} />
      {errors[name] && (
        <Typography variant="span" color="error">
          {errors[name]}
        </Typography>
      )}
    </Grid>
  );
};
CheckBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
export default CheckBox;
