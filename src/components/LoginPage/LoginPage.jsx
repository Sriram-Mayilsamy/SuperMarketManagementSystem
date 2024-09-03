import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/FireBaseConfiguration'; // Adjust the path based on your file structure

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Placeholder for the logo */}
        <img src="/path-to-your-logo.png" alt="Logo" style={{ marginBottom: '20px' }} />
        
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
          Login
        </Typography>
        {error && <Typography color="error" style={{ marginBottom: '20px' }}>{error}</Typography>}
        
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: '#ccc' } }}
            style={{ backgroundColor: '#fafafa' }}
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
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#ccc' } }}
            style={{ backgroundColor: '#fafafa' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px', backgroundColor: '#0095f6', color: '#fff' }}
            startIcon={<AccountCircle />}
          >
            Login
          </Button>
        </form>
        
        <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Don't have an account? <Button color="primary" onClick={handleSignupRedirect} style={{ padding: 0 }}>Sign Up</Button>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default LoginPage;
