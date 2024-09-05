import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/FireBaseConfiguration'; // Adjust the path based on your file structure

// Import the logo and banner images
import logo from './logo.jpeg'; // Update with the correct relative path
import leftBannerImage from './leftbanner.png'; // Update with the correct relative path
import rightBannerImage from './rightbanner.png'; // Update with the correct relative path

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/selection'); // Redirect to the selection page after successful login
    } catch (error) {
      console.error("Error signing in:", error); // Log error details
      setError('Invalid email or password');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      
      {/* Left and Right Banners */}
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* Left Banner */}
        <Box sx={{ flex: 1, backgroundColor: '#f0f0f0' }}>
          <img
            src={leftBannerImage}  // Use the imported variable for the banner image
            alt="Left Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        
        {/* Right Banner */}
        <Box sx={{ flex: 1, backgroundColor: '#e0e0e0' }}>
          <img
            src={rightBannerImage}  // Use the imported variable for the banner image
            alt="Right Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>

      {/* Login Form */}
      <Box 
        sx={{
          position: 'absolute',
          width: '300px',  // Keep the form lean
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          border: '2px solid transparent', // Set initial border to transparent
          boxShadow: '0 0 15px rgba(64, 64, 64, 0.8)', // Dark grey neon effect
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          variant="h2"
          component="h1"
          sx={{
            marginBottom: '20px',
            color: '#6f4f28', // Brown color
            fontFamily: 'Times New Roman', // Roman-style font
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Super Market
        </Typography>

        {/* Logo */}
        <img 
          src={logo}  // Use the imported image variable
          alt="Logo" 
          style={{ marginBottom: '20px', width: '100px', height: 'auto', display: 'block' }} 
        />

        {error && <Typography color="error" sx={{ marginBottom: '20px' }}>{error}</Typography>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{ backgroundColor: '#fafafa', marginBottom: '20px' }}
            type="email"
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{ backgroundColor: '#fafafa', marginBottom: '20px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px', backgroundColor: '#0095f6', color: '#fff' }}
            startIcon={<AccountCircle />}
          >
            Login
          </Button>
        </form>

        <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Don't have an account? <Button color="primary" onClick={handleSignupRedirect} sx={{ padding: 0 }}>Sign Up</Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
