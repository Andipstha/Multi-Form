import { Formik, FormikConfig, FormikValues, FormikHelpers, Form } from 'formik';
import React, { useState } from 'react';
import FormNavigation from './FormNavigation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/system';
import StepConnector from '@mui/material/StepConnector';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';


interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const steps = React.Children.toArray(children) as React.ReactElement[];
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues) => {
    setFadeIn(false); 
    setTimeout(() => {
      setStepNumber(stepNumber + 1);
      setSnapshot(values);
      setFadeIn(true); 
    }, 300);
  };

  const previous = (values: FormikValues) => {
    setFadeIn(false); 
    setTimeout(() => {
      setSnapshot(values);
      setStepNumber(stepNumber - 1);
      setFadeIn(true); // Fade in previous step
    }, 300);
  };

  const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions); // Final form submission
    } else {
      actions.setTouched({});
      next(values); // Move to the next step
    }
  };

  const CustomStepLabel = styled(StepLabel)({
    '& .MuiStepLabel-label': {
      display: 'none', // Hide labels
    },
    '& .MuiStepIcon-root': {
      color: '#43066C', // Default step icon color
      '&.Mui-completed': {
        color: '#4caf50', // Completed step color
      },
      '&.Mui-active': {
        color: '#4caf50', // Active step color
      },
    },
  });

   // Custom connector for the stepper
   const CustomStepConnector = styled(StepConnector)({
    '& .MuiStepConnector-line': {
      borderColor: '#4caf50', // Line color
      borderWidth: 5, // Line thickness
      borderRadius: '4px', // Optional: round the edges of the line
    },
    '& .Mui-active .MuiStepConnector-line': {
      borderColor: '#1976d2', // Active line color
    },
    '& .Mui-completed .MuiStepConnector-line': {
      borderColor: '#4caf50', // Completed line color
    },
  });

  return (
    <div>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <Stepper 
              activeStep={stepNumber} 
              alternativeLabel sx={{ mb: 3 }}
              connector={<CustomStepConnector />}
              >
              {steps.map((currentStep, index) => {
                const label = currentStep.props.stepName;

                return (
                  <Step key={label} completed={stepNumber > index}>
                    <CustomStepLabel>{label}</CustomStepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {/* Faded transition for form steps */}
            <Fade in={fadeIn} timeout={300}>
              <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}>
                {step}
              </Box>
            </Fade>

            {/* Navigation buttons */}
            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;

// FormStep component
export const FormStep = ({ stepName = '', children }: any) => children;
