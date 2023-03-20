import LoadingButton from "@mui/lab/LoadingButton";
const CustomButton = ({
  children,
  width,
  height,
  title,
  isSubmitting,
  background,
  fontSize,
  borderRadius,
  ...rest
}) => {
  return (
    <LoadingButton
      sx={{
        width: "100%",
        // height: "5.4rem",
        textTransform: "initial",
        padding: ".5em 1.5em",
        fontSize: fontSize ? fontSize : { md: "1.6rem", xs: "1.2rem" },
      }}
      disableElevation
      loading={isSubmitting}
      variant="contained"
      type="submit"
      {...rest}
    >
      <span>{title}</span>
    </LoadingButton>
  );
};

export default CustomButton;
