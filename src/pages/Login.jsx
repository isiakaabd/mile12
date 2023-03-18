import { useTheme } from "@emotion/react";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import CustomButton from "components/CustomButton";
import { Form, Formik } from "formik/dist";
import { useState } from "react";

import { Link } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";

const loginValidation = Yup.object({
  em: Yup.string("Enter Email").email("Enter Valid Email").required("Required"),
  psd: Yup.string().required("Enter your password"),
});
const Login = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid item md={10} xs={12} sx={{ margin: "auto", height: "100%" }}>
      <Grid
        item
        container
        flexDirection={"column"}
        sx={{ p: 5, height: "100%", justifyContent: "center" }}
      >
        <Grid item container flexDirection={"column"}>
          <Typography color="secondary" variant="h2">
            Sign In
          </Typography>
          <Typography color={theme.palette.common.lightBlack}>
            Welcome back! Please enter your credentials{" "}
          </Typography>
        </Grid>
        <Grid item container sx={{ mt: 3 }}>
          <Formik
            validationSchema={loginValidation}
            initialValues={{ em: "", psd: "", rememberMe: false }}
          >
            <Form style={{ width: "100%" }}>
              <Grid item container flexDirection="column" gap={3}>
                <Grid item container>
                  <FormikControl name="em" placeholder="Email Address" />
                </Grid>
                <Grid item container>
                  <FormikControl
                    name="psd"
                    placeholder="Password"
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
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <FormikControl
                      control="checkbox"
                      placeholder={"Remember Information"}
                      name="rememberMe"
                    />
                  </Grid>
                  <Typography
                    color="primary"
                    component={Link}
                    to="/auth/forgot-password"
                    sx={{ textDecoration: "none" }}
                  >
                    Forgot Password
                  </Typography>
                </Grid>
                <Grid item container>
                  <CustomButton title={"Sign Up"} />
                </Grid>
                <Grid item container>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "5.4rem",
                      fontWeight: 400,
                      color: "#534C4C",
                      borderColor: "#CCCCCC",
                      textTransform: "none",
                      fontSize: { md: "2rem", xs: "1.6rem" },
                    }}
                    startIcon={<Google />}
                  >
                    Sign In with Google
                  </Button>
                </Grid>
                <Grid item container flexWrap="nowrap">
                  <Typography
                    sx={{
                      color: "#534C4C",
                      fontWeight: 400,
                      // fontSize: { md: "1.8rem", xs: "1.5rem", sm: "1.6rem" },
                    }}
                  >
                    Don't have an account?
                    <Typography
                      color="primary"
                      to={"/auth/registration"}
                      component={Link}
                      sx={{ font: "inherit", ml: 1, textDecoration: "none" }}
                    >
                      Sign up
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
