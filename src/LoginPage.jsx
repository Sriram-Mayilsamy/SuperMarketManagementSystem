import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { orange } from '@mui/material/colors';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
          Login :)
        </Typography>
        <form style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ style: { color: '#ccc' } }} // Customize input label color
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
            InputLabelProps={{ style: { color: '#ccc' } }} // Customize input label color
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            startIcon={<AccountCircle />}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
