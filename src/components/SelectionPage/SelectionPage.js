import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, List, ListItem } from '@mui/material';
import { useAuth } from '../Firebase/AuthContext'; // Import useAuth

// Import the local image
import backgroundImage from './selectionpagebg.jpg'; // Update the path as necessary

import './SelectionPage.css'; // Import your custom CSS for styling

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

  return (
    <div className="selection-page dark-mode">
      {/* Sidebar */}
      <div className="sidebar">
        <Typography variant="h6" className="sidebar-title">
          Menu
        </Typography>
        <List className="sidebar-list">
          {options.map((option, index) => (
            <ListItem button component={Link} to={option.path} key={index} className="sidebar-item">
              {option.name}
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout} className="sidebar-item">
            Logout
          </ListItem>
        </List>
      </div>

      {/* Main content */}
      <main className="main-content">
        <Container
          maxWidth={false}
          className="main-container"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Box className="content-box">
            <Typography variant="h4" gutterBottom className="welcome-text">
              WELCOME TO SUPERMARKET MANAGEMENT
            </Typography>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default SelectionPage;
