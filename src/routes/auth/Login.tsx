import { Box, Container, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useMutation } from '@apollo/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LOGIN } from '../../gql/mutations';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const navigate = useNavigate();
  const [updateLogin, { data, loading, error }] = useMutation(LOGIN);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (
    d: Inputs,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    debugger;
    const variables = { email: d.email, password: d.password };
    const result = await updateLogin({ variables: variables });
    if (error != undefined) {
      console.error('Oh no!', error.message);
      throw Error(error.message);
    } else {
      await localStorage.setItem('access_token', result.data.login.accessToken);
      await localStorage.setItem(
        'refresh_token',
        result.data.login.refreshToken
      );
      navigate('/dashboard', {
        state: {
          title: 'Dashboard',
          url: '/dashboard',
        },
      });
    }
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
