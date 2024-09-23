import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { title: 'Product Catalogue', path: '/product-catalogue', icon: <InventoryIcon /> },
  { title: 'Sales', path: '/sales', icon: <ShoppingCartIcon /> },
  { title: 'Shopping Site', path: '/shopping', icon: <PeopleIcon /> }, // Renamed and updated
  { title: 'Reports', path: '/report-generation', icon: <AssessmentIcon /> },
  { title: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];

const SelectionPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.title} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="selection-page">
      <AppBar position="static" sx={{ backgroundColor: 'white', borderBottom: '2px solid gold' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'gold', fontWeight: 'bold' }}>
            Supermarket Management
          </Typography>
          {!isMobile && navItems.map((item) => (
            <Button 
              key={item.title} 
              color="inherit" 
              component={Link} 
              to={item.path}
              sx={{
                border: '2px solid gold',
                color: 'black',
                mx: 1,
                '&:hover': {
                  backgroundColor: 'gold',
                  color: 'white',
                }
              }}
            >
              {item.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'gold', fontWeight: 'bold' }}>
          Welcome to Supermarket Management System
        </Typography>
        <Grid container spacing={3}>
          {navItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Card sx={{ textAlign: 'center', border: '2px solid gold' }}>
                <CardContent>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Typography variant="h5" sx={{ color: 'gold' }}>{item.title}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size="small" component={Link} to={item.path} sx={{ color: 'gold' }}>Go to {item.title}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SelectionPage;
