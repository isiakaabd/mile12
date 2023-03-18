import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Form, Formik } from "formik/dist";
import { useState } from "react";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const validationSchema = Yup.object({
    psd1: Yup.string().oneOf([Yup.ref("psd"), null], "Passwords must match"),
    psd: Yup.string()
      .required("Enter your password")
      .min(8, "password too short")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  });
  return (
    <Grid item md={10} xs={12} sx={{ margin: "auto", height: "100%" }}>
      <Grid
        item
        container
        flexDirection={"column"}
        sx={{ p: 5, height: "100%", justifyContent: "center" }}
      >
        <Grid item container justifyContent="center">
          <Typography color="secondary" variant="h2">
            Create a New Password
          </Typography>
        </Grid>
        <Grid item container sx={{ mt: 3 }}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ psd1: "", psd: "", rememberMe: false }}
          >
            <Form style={{ width: "100%" }}>
              <Grid item container flexDirection="column" gap={3}>
                <Grid item container>
                  <FormikControl
                    name="psd"
                    placeholder="New Password"
                    type={showPassword1 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                          edge="end"
                        >
                          {showPassword1 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    name="psd1"
                    placeholder="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>

                <Grid item>
                  <FormikControl
                    control="checkbox"
                    placeholder={"Remember Information"}
                    name="rememberMe"
                  />
                </Grid>

                <Grid item container>
                  <CustomButton title={"Create New Password"} />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
