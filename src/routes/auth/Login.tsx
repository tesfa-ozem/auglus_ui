import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { gql, useMutation } from 'urql';
import { useForm, SubmitHandler } from 'react-hook-form';

const Login = `
mutation($email: String!, $password: String!){
    login(email: $email, password: $password) {
        ... on LoginSuccess {
            accessToken
            refreshToken
        }
        ... on LoginError {
            message
        }
    }
}
`;

type Inputs = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [updateLoginResult, updateLogin] = useMutation(Login);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const variables = { email: data.email, password: data.password };
    updateLogin(variables).then((result) => {
      if (result.error) {
        console.error('Oh no!', result.error);
      }
    });
    // Handle form submission logic
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
          </LoginForm>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
