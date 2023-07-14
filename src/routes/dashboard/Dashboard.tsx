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

import data from '../../../normal_tx.json';

const DashboardPage = () => {
  const ExpenseCard = styled('div')(() => ({
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
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
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Expense Tracker Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={8}>
            <ExpenseCard>
              <Typography variant="h6" component="h2" gutterBottom>
                Monthly Expense Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line type="monotone" dataKey="paid_in" stroke="#8884d8" />
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
