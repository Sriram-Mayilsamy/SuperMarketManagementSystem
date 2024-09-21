import React, { useState, useCallback } from 'react';
import { 
  Button, TextField, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Alert, Menu, MenuItem, Typography, 
  Grid, IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock data
const products = [
  { id: 1, name: 'Apple', price: 0.5, barcode: '123456' },
  { id: 2, name: 'Banana', price: 0.3, barcode: '234567' },
  { id: 3, name: 'Milk', price: 2.5, barcode: '345678' },
  { id: 4, name: 'Orange', price: 0.6, barcode: '456789' },
  { id: 5, name: 'Bread', price: 1.0, barcode: '567890' },
];

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
    if (value) {
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
    <Paper elevation={3} className="pos-container">
      <Typography variant="h4" className="pos-header">Point of Sale</Typography>
      
      <div className="pos-body">
        <form onSubmit={handleBarcodeSubmit} className="pos-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                value={barcode}
                onChange={handleBarcodeChange}
                placeholder="Scan or enter barcode/name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button 
                fullWidth
                type="submit" 
                variant="contained" 
                startIcon={<ShoppingCartIcon />}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && <Alert severity="error" className="pos-alert">{error}</Alert>}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && filteredProducts.length > 0}
          onClose={() => setAnchorEl(null)}
        >
          {filteredProducts.map(product => (
            <MenuItem key={product.id} onClick={() => addToCart(product)}>
              {product.name} - ${product.price.toFixed(2)}
            </MenuItem>
          ))}
        </Menu>

        <TableContainer component={Paper} className="pos-table">
          <Table>
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
                    <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2} className="pos-actions">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount %"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button 
              fullWidth
              onClick={applyDiscount} 
              variant="contained" 
              startIcon={<AttachMoneyIcon />}
            >
              Apply Discount
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="right" className="pos-total">
              Total: ${calculateTotal()}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2} className="pos-checkout">
        <Grid item xs={12} sm={6}>
          <Button 
            fullWidth
            onClick={handleCheckout} 
            variant="contained" 
            color="primary" 
            startIcon={<AttachMoneyIcon />}
          >
            Checkout
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button 
            fullWidth
            onClick={handlePrintReceipt} 
            variant="outlined" 
            startIcon={<ReceiptIcon />}
          >
            Print Receipt
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PointOfSale;
