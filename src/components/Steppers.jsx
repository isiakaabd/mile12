import { useEffect, useState } from "react";
import { Stepper, Grid, StepLabel, Step } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { getDate } from "helpers";

export default function MobileStepper({ status, state }) {
  const [activeStep, setActiveSTep] = useState(1);
  useEffect(() => {
    setActiveSTep(status);
  }, [status]);
  const steps = [
    {
      label: "Order Created",
      description: state?.createdAt ? getDate(state?.createdAt) : "No Date",
    },
    {
      label: "Order Placed",
      description: state?.order_placed
        ? getDate(state?.order_placed)
        : "No Date",
    },
    {
      label: "Payment  Confirmed",
      description: state?.confirmed ? getDate(state?.confirmed) : "No Date",
    },
    {
      label: "Shipped",
      description: state?.shipped ? getDate(state?.shipped) : "No Date",
    },
    {
      label: "Out for Delivery",
      description: state?.out_for_delivery
        ? getDate(state?.out_for_delivery)
        : "No Date",
    },
    {
      label: "Delivered",
      description: getDate(state?.delivered),
    },
  ];
  return (
    <Grid item container>
      <Stepper
        activeStep={activeStep}
        connector={<QontoConnector />}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{
                padding: 0,
                "& .MuiSvgIcon-root": {
                  fontSize: "2.5rem",
                  "&.Mui-active": {
                    color: "#008A00",
                  },
                },
                "& .MuiStepIcon-text": { fontSize: "1.6rem" },
              }}
              optional={step.description}
              //   StepIconComponent={QontoStepIcon}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Grid>
  );
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: "1rem",

    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      minHeight: "3rem",
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
