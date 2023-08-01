import { Box, Container, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../common/http';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { AxiosError } from 'axios';

type Inputs = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    setIsAuthenticated,
    setAccessToken,
    setRefreshToken,
    setIsAdmin,
    setUserId,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (
    d: Inputs,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      const variables = { email: d.email, password: d.password };
      const response = await axiosInstance.post(
        '/api/v1/users/login',
        variables
      );

      setAccessToken(response.data.token);
      setRefreshToken(response.data.refresh_token);
      const decodedToken: any = jwtDecode(response.data.token);
      setIsAdmin(decodedToken.is_admin);
      setUserId(decodedToken.user_id);
      setIsAuthenticated(true);

      // Output the decoded token
      console.log(decodedToken);
      navigate('/dashboard', {
        state: {
          title: 'Dashboard',
          url: '/dashboard',
        },
      });
    } catch (e:AxiosError) {
      if(e.response.status==404){
        setErrorMessage(e.response.statusText)
      }
      
    }
  };

  const LoginForm = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }));

  const SubmitButton = styled(Button)(() => ({
    marginTop: '2rem',
  }));

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
            Login
          </Typography>
          {errorMessage&&<Alert severity="warning">{errorMessage}</Alert>}
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
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
              Login
            </SubmitButton>
            <Button onClick={() => navigate('/signUp')}>Sign Up</Button>
          </LoginForm>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
