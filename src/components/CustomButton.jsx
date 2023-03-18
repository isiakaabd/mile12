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
        height: "5.4rem",
        textTransform: "initial",
        fontSize: fontSize ? fontSize : { md: "2rem", xs: "1.6rem" },
      }}
      disableElevation
      loading={isSubmitting}
      variant="contained"
      type="submit"
    >
      <span>{title}</span>
    </LoadingButton>
  );
};

export default CustomButton;
