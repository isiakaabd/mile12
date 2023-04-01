import { Field, ErrorMessage } from "formik/dist";
import { TextField, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextError } from "./TextError";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const Dates = ({ name, placeholder, rest }) => {
  // const { setFieldValue } = useFormikContext();
  const today = new Date();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name={name}
        // onChange={(value) => {
        //   setFieldValue(name, value);
        // }}
        // value={value}
        defaultValue={dayjs(today)}
        label={placeholder}
        {...rest}
        renderInput={(params) => (
          <TextField {...params} sx={{ padding: "-12px" }} />
        )}
      />
    </LocalizationProvider>
  );
};

const DateTimePicker = (props) => {
  const { name, label, ...rest } = props;

  return (
    <Grid container direction="column" gap={1}>
      <Field name={name} type="date" as={Dates} label={label} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

export default DateTimePicker;
