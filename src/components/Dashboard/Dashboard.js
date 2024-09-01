import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Tooltip, ResponsiveContainer, Cell, XAxis, YAxis, Legend } from 'recharts';
import './Dashboard.css';

const dataSales = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4000 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 7000 },
];

const dataProducts = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Typography variant="h4" gutterBottom>
        Supermarket Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataSales}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" gutterBottom>
              Product Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataProducts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {dataProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" gutterBottom>
              Revenue
            </Typography>
            <Typography variant="h4">$100,000</Typography>
            <Typography variant="body2" color="textSecondary">
              Revenue Growth: 10% MoM
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="dashboard-paper">
            <Typography variant="h6" gutterBottom>
              Customer Traffic
            </Typography>
            <Typography variant="h4">2,000</Typography>
            <Typography variant="body2" color="textSecondary">
              Daily Visitors: 50% Returning
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
