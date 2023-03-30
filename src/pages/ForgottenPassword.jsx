import { useTheme } from "@emotion/react";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Form, Formik } from "formik/dist";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "redux/slices/authSlice";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
const validationSchema = Yup.object({
  em: Yup.string("Enter Email").email("Enter Valid Email").required("Required"),
});
const ForgottenPassword = () => {
  const [resetPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (values) => {
    const { data, error } = await resetPassword({ email: values.em });

    if (data) {
      toast.success(data);
    }
    if (error) toast.error(error);
  };
  const theme = useTheme();
  return (
    <>
      <Grid item container flexDirection={"column"}>
        <Typography color="secondary" variant="h2">
          Forgot Password
        </Typography>
        <Typography color={theme.palette.common.lightBlack}>
          To reset your password, enter your email address, and we'll send you a
          link.{" "}
        </Typography>
      </Grid>
      <Grid item container sx={{ mt: 3 }}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ em: "" }}
          onSubmit={handleSubmit}
        >
          <Form style={{ width: "100%" }}>
            <Grid item container flexDirection="column" gap={3}>
              <Grid item container>
                <FormikControl name="em" placeholder="Email Address" />
              </Grid>

              <Grid item container>
                <CustomButton title={"Continue"} isSubmitting={isLoading} />
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
    </>
  );
};

export default ForgottenPassword;
