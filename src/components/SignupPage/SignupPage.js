import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/FireBaseConfiguration'; // Adjust the path based on your file structure

// Import the logo and banner images
import logo from './logo.jpeg'; // Update with the correct relative path
import leftBannerImage from './leftbanner.png'; // Update with the correct relative path
import rightBannerImage from './rightbanner.png'; // Update with the correct relative path

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (confirmText !== 'CONFIRM') {
      setError('Please type "CONFIRM" to proceed.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Account created successfully!');
      // Redirect to the selection page after successful signup
      navigate('/selection');
    } catch (error) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      
      {/* Left and Right Banners */}
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* Left Banner */}
        <Box sx={{ flex: 1, backgroundColor: '#f0f0f0' }}>
          <img
            src={leftBannerImage}
            alt="Left Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        
        {/* Right Banner */}
        <Box sx={{ flex: 1, backgroundColor: '#e0e0e0' }}>
          <img
            src={rightBannerImage}
            alt="Right Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>

      {/* Signup Form */}
      <Box 
        sx={{
          position: 'absolute',
          width: '280px', // Reduced width
          maxHeight: '90vh', // Max height to fit the page
          backgroundColor: '#ffffff',
          padding: '20px', // Reduced padding
          borderRadius: '12px',
          border: '2px solid transparent',
          boxShadow: '0 0 15px rgba(64, 64, 64, 0.8)', // Dark grey neon effect
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto', // Add scroll if needed
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '4px',
            left: '4px',
            right: '4px',
            bottom: '4px',
            border: '1px solid #f50057', // Pink border
            borderRadius: '10px',
            zIndex: -1,
          },
        }}
      >
        {/* Fancy Header Text */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            marginBottom: '20px',
            color: '#6f4f28', // Brown color
            fontFamily: 'Times New Roman', // Roman-style font
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '1.5rem', // Adjust font size
          }}
        >
          WELCOME
        </Typography>

        {/* Logo */}
        <img 
          src={logo}
          alt="Logo"
          style={{ marginBottom: '20px', width: '80px', height: 'auto', display: 'block' }} 
        />

        {error && <Typography color="error" sx={{ marginBottom: '20px' }}>{error}</Typography>}
        {success && <Typography color="success" sx={{ marginBottom: '20px' }}>{success}</Typography>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }} autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="new-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: '10px' }} // Reduced margin
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="new-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '10px' }} // Reduced margin
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '10px' }} // Reduced margin
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: '10px' }} // Reduced margin
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmText"
            label="Type 'CONFIRM'"
            id="confirmText"
            autoComplete="off"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            sx={{ marginBottom: '10px' }} // Reduced margin
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '10px', backgroundColor: '#3897f0', color: '#ffffff' }} // Adjust margin
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
