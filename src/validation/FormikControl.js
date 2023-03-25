import Input from "./Input";
import Selects from "./Select";
import PropTypes from "prop-types";
import SwitchComponent from "./Switch";
import { UploadComponent } from "./Files";
import CheckBox from "./Checkboxs";
import TextArea from "./Textarea";
import Radios from "./Radios";
import Autocompletes from "./AutoComplete";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "select":
      return <Selects {...rest} />;
    case "switch":
      return <SwitchComponent {...rest} />;
    case "file":
      return <UploadComponent {...rest} />;
    case "checkbox":
      return <CheckBox {...rest} />;
    case "radio":
      return <Radios {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "autocomplete":
      return <Autocompletes {...rest} />;
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string,
};
FormikControl.defaultProps = {
  control: "input",
};
export default FormikControl;
