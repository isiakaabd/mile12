import { useEffect, useState } from "react";
import { Stepper, Grid, StepLabel, Step } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
const steps = [
  {
    label: "Order Placed",
    description: `04/10/22`,
  },
  {
    label: "Payment  Confirmed",
    description: "04/10/22",
  },
  {
    label: "Shipped",
    description: `06/10/22`,
  },
  {
    label: "Out for Delivery",
    description: `06/10/22`,
  },
  {
    label: " Delivery",
    description: `06/10/22`,
  },
];

export default function MobileStepper({ status }) {
  const [activeStep, setActiveSTep] = useState(1);
  useEffect(() => {
    setActiveSTep(status);
  }, [status]);
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
