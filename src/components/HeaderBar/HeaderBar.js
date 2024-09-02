import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const HeaderBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Supermarket Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
