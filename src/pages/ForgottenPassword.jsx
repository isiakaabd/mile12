import { useTheme } from "@emotion/react";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Form, Formik } from "formik/dist";
import { Link } from "react-router-dom";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
const validationSchema = Yup.object({
  em: Yup.string("Enter Email").email("Enter Valid Email").required("Required"),
});
const ForgottenPassword = () => {
  const theme = useTheme();
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
            Forgot Password
          </Typography>
          <Typography color={theme.palette.common.lightBlack}>
            To reset your password, enter your email address, and we'll send you
            a link.{" "}
          </Typography>
        </Grid>
        <Grid item container sx={{ mt: 3 }}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ em: "" }}
          >
            <Form style={{ width: "100%" }}>
              <Grid item container flexDirection="column" gap={3}>
                <Grid item container>
                  <FormikControl name="em" placeholder="Email Address" />
                </Grid>

                <Grid item container>
                  <CustomButton title={"Continue"} />
                </Grid>
                <Grid item container>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={"/auth/login"}
                    sx={{
                      width: "100%",
                      padding: ".5em 2em",
                      fontWeight: 400,
                      color: "#534C4C",
                      borderColor: "transparent",
                      textTransform: "none",
                      fontSize: { md: "2rem", xs: "1.6rem" },
                    }}
                    startIcon={<ArrowBackIosNewOutlined />}
                  >
                    Back to Sign In
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgottenPassword;
