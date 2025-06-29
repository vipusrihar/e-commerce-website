import React, { useState } from 'react';
import {
  Grid, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const summaryData = [
  { title: 'Total Books', count: 124, color: '#1976d2' },
  { title: 'Total Users', count: 342, color: '#2e7d32' },
  { title: 'Total Orders', count: 95, color: '#ed6c02' },
  { title: 'Active Discounts', count: 8, color: '#d32f2f' },
];

const ordersDataByYear = {
  2023: [4, 8, 9, 0, 6, 15, 20, 18, 10],
  2024: [5, 12, 18, 25, 20, 15],
  2025: [6, 10, 22, 30, 25, 20],
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState(2024);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        {summaryData.map((item, index) => (
          <Grid key={index}>
            <Paper
              sx={{
                padding: 3,
                backgroundColor: item.color,
                color: 'white',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="h4">{item.count}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Box sx={{ marginTop: 5 }}>
        <Paper sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Orders Per Month ({selectedYear})
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select value={selectedYear} label="Year" onChange={handleYearChange}>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <BarChart
            xAxis={[{ scaleType: 'band', data: months }]}
            series={[{ data: ordersDataByYear[selectedYear], label: 'Orders' }]}
            width={600}
            height={300}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
