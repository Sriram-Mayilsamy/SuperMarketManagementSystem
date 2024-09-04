import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/FireBaseConfiguration'; // Adjust the path based on your file structure

// Import the logo image
import logo from './logo.jpeg'; // Update with the correct relative path

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
    <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Fancy Header Text */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            marginBottom: '20px',
            color: '#0095f6',
            fontFamily: 'cursive',
            textAlign: 'center',
          }}
        >
          Super Market
        </Typography>

        {/* Logo */}
        <img 
          src={logo}  // Use the imported image variable
          alt="Logo" 
          style={{ marginBottom: '20px', width: '100px', height: 'auto' }} 
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
            autoComplete="off"  // Prevent autofill for email
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{ backgroundColor: '#fafafa', marginBottom: '20px' }}
            type="email" // HTML5 email type for built-in validation
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
            autoComplete="new-password"  // Prevent autofill for password
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
    </Container>
  );
};

export default LoginPage;
