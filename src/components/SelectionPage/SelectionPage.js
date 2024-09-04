import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../Firebase/AuthContext'; // Import useAuth

// Import the local image
import backgroundImage from './selectionpagebg.jpg'; // Update the path as necessary

const SelectionPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from AuthContext

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const options = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Product Catalogue', path: '/product-catalogue' },
    { name: 'Report Generation', path: '/report-generation' },
    { name: 'Shopping Site', path: '/shopping' },
  ];

  // Get current hour
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    if (currentHour < 21) return 'Good Evening';
    return 'Good Night';
  };

  // Inline styles with imported image
  const containerStyle = {
    minHeight: '100vh',
    padding: '20px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const boxStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const cardStyle = {
    backgroundColor: '#f8f8f8', // Light grey for cards
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
    margin: 'auto',
  };

  const cardContentStyle = {
    padding: '20px',
  };

  const cardTitleStyle = {
    fontFamily: "'Arial', sans-serif",
    fontWeight: 600,
    color: '#262626',
    marginBottom: '15px',
  };

  const cardButtonStyle = {
    backgroundColor: '#3897f0', // Instagram blue
    color: '#ffffff',
    fontFamily: "'Arial', sans-serif",
    fontWeight: 600,
    padding: '10px 0',
    borderRadius: '5px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    width: '100%',
  };

  const logoutButtonStyle = {
    marginTop: '20px',
    color: '#ffffff',
    backgroundColor: '#e1306c', // Instagram pink
    borderRadius: '5px',
    fontFamily: "'Arial', sans-serif",
    fontWeight: 600,
    padding: '10px 0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    width: '100%',
  };

  return (
    <Container maxWidth={false} style={containerStyle}>
      <Box style={boxStyle}>
        <Typography variant="h4" gutterBottom style={{ color: '#262626', fontFamily: "'Arial', sans-serif" }}>
          {getGreeting()}!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {options.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card style={cardStyle}>
                <CardContent style={cardContentStyle}>
                  <Typography variant="h6" style={cardTitleStyle} gutterBottom>
                    {option.name}
                  </Typography>
                  <Button
                    variant="contained"
                    style={cardButtonStyle}
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
              variant="contained"
              style={logoutButtonStyle}
              fullWidth
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SelectionPage;
