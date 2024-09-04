import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/FireBaseConfiguration'; // Adjust the path based on your file structure

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
    <Container component="main" maxWidth="xs">
      <Box 
        sx={{
          marginTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            marginBottom: '20px',
            color: '#262626',
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Join With Us
        </Typography>
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
            sx={{ marginBottom: '20px' }}
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
            sx={{ marginBottom: '20px' }}
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
            sx={{ marginBottom: '20px' }}
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
            sx={{ marginBottom: '20px' }}
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
            sx={{ marginBottom: '20px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px', backgroundColor: '#3897f0', color: '#ffffff' }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
