import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const SelectionPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing authentication tokens
    navigate('/');
  };

  const options = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Product Catalogue', path: '/product-catalogue' },
    { name: 'Report Generation', path: '/report-generation' },
    { name: 'Shopping Site', path: '/shopping' },
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose an Option
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {option.name}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to={option.path}
                >
                  Go to {option.name}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={4} md={3}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectionPage;
