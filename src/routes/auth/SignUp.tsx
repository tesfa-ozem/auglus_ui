import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../common/http';
import { useState } from 'react';

type Inputs = {
  email: string;
  password: string;
  user_name: string;
};
const SignUpForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '2rem',
}));
const SignUpPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setAccessToken, setRefreshToken } = useAuth();
  const [userId,setUserId] = useState(null)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createUser = async (d: Inputs) => {
    try {
      const variables = {
        email: d.email,
        password: d.password,
        user_name: d.user_name,
      };
      const response = await axiosInstance.post('/api/v1/users', variables);

      setUserId(response.data.id)
      handleNext();
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (data) => {
    // Handle form submission, e.g., update user data in the backend
    console.log(data);
    try {
      const variables = {
        first_name: data.first_name,
        last_name: data.last_name,
        user_id: userId,
        skill_ids: [],
      };
      const response = await axiosInstance.post('/professional', variables);
    } catch (e) {}
      navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Sign Up
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Step 1: Personal Information</StepLabel>
              <StepContent>
                <SignUpForm onSubmit={handleSubmit(createUser)}>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span>This field is required</span>}
                  <TextField
                    id="user_name"
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('user_name', { required: true })}
                  />
                  {errors.user_name && <span>This field is required</span>}
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('password', { required: true })}
                  />
                  {errors.password && <span>This field is required</span>}

                  <SubmitButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Next
                  </SubmitButton>
                  <Button onClick={() => navigate('/login')}>Sign in</Button>
                </SignUpForm>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Step 2: More Details</StepLabel>
              <StepContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="First Name" fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Last Name" fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Skills (comma-separated)"
                            multiline
                            rows={3}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
