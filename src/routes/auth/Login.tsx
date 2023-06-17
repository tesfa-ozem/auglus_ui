import React from 'react';
import { Box, Container, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const LoginPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
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
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                    >
                        Login
                    </Typography>

                    <LoginForm onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                        />

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
