import React, { useState, useCallback } from 'react';
import {
  Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Alert, Menu, MenuItem, Typography,
  Grid, IconButton, Box, Container, Divider
} from '@mui/material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import products from '../Products/Products';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: '#f5f5f5',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1, 3),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  maxHeight: '400px',
  overflowY: 'auto',
}));

const PointOfSale = () => {
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setBarcode('');
    setFilteredProducts([]);
    setAnchorEl(null);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const handleBarcodeChange = useCallback((e) => {
    const value = e.target.value;
    setBarcode(value);

    if (value.length > 0) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.barcode.includes(value)
      );
      setFilteredProducts(filtered);
      setAnchorEl(e.currentTarget);
    } else {
      setFilteredProducts([]);
      setAnchorEl(null);
    }
  }, []);

  const handleBarcodeSubmit = useCallback((e) => {
    e.preventDefault();
    const product = products.find(p =>
      p.barcode.toLowerCase() === barcode.toLowerCase() ||
      p.name.toLowerCase() === barcode.toLowerCase()
    );
    if (product) {
      addToCart(product);
      setError('');
    } else {
      setError('Product not found');
    }
  }, [barcode, addToCart]);

  const applyDiscount = useCallback(() => {
    const discountPercentage = parseFloat(discount);
    if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
      setError('Invalid discount percentage');
      return;
    }
    setDiscount(discountPercentage);
    setError('');
  }, [discount]);

  const calculateTotal = useCallback(() => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = subtotal * (discount / 100);
    return (subtotal - discountAmount).toFixed(2);
  }, [cart, discount]);

  const handleCheckout = useCallback(() => {
    alert(`Total: $${calculateTotal()}. Proceeding to payment...`);
  }, [calculateTotal]);

  const handlePrintReceipt = useCallback(() => {
    alert('Printing receipt...');
  }, []);

  return (
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Point of Sale
        </Typography>

        <Box component="form" onSubmit={handleBarcodeSubmit} sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={barcode}
                onChange={handleBarcodeChange}
                placeholder="Scan or enter barcode/name"
                variant="outlined"
                InputProps={{
                  startAdornment: <SearchIcon color="action" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledButton
                fullWidth
                type="submit"
                variant="contained"
                startIcon={<ShoppingCartIcon />}
              >
                Add Item
              </StyledButton>
            </Grid>
          </Grid>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && filteredProducts.length > 0}
          onClose={() => {
            setAnchorEl(null);
            setFilteredProducts([]);
          }}
        >
          {filteredProducts.map(product => (
            <MenuItem
              key={product.id}
              onClick={() => {
                addToCart(product);
                setAnchorEl(null);
              }}
            >
              {product.name} - ${product.price.toFixed(2)}
            </MenuItem>
          ))}
        </Menu>

        <StyledTableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => removeFromCart(item.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount %"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledButton
              fullWidth
              onClick={applyDiscount}
              variant="contained"
              startIcon={<AttachMoneyIcon />}
              size="small"
            >
              Apply Discount
            </StyledButton>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="right">
              Total: ${calculateTotal()}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StyledButton
              fullWidth
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              startIcon={<AttachMoneyIcon />}
              size="large"
            >
              Checkout
            </StyledButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledButton
              fullWidth
              onClick={handlePrintReceipt}
              variant="outlined"
              startIcon={<ReceiptIcon />}
              size="large"
            >
              Print Receipt
            </StyledButton>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default PointOfSale;