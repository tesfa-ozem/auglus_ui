import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const DashboardPage = () => {
    const ExpenseCard = styled('div')(() => ({
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    }));

    const data = [
        { month: 'Jan', expense: 1000 },
        { month: 'Feb', expense: 1500 },
        { month: 'Mar', expense: 1200 },
        { month: 'Apr', expense: 1800 },
        { month: 'May', expense: 900 },
        { month: 'Jun', expense: 2000 },
        { month: 'Jul', expense: 1700 },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                >
                    Expense Tracker Dashboard
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <ExpenseCard>
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                            >
                                Total Expenses
                            </Typography>
                            <Typography variant="h4">$2,500</Typography>
                        </ExpenseCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <ExpenseCard>
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                            >
                                Monthly Expenses
                            </Typography>
                            <Typography variant="h4">$1,200</Typography>
                        </ExpenseCard>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <ExpenseCard>
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                            >
                                Categories
                            </Typography>
                            <Typography variant="h4">5</Typography>
                        </ExpenseCard>
                    </Grid>

                    <Grid item xs={12} md={12} lg={8}>
                        <ExpenseCard>
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                            >
                                Monthly Expense Trends
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="expense"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ExpenseCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPage;
