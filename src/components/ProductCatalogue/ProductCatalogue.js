import React, { useState } from 'react';
import './ProductCatalogue.css';
import products from '../Products/Products'; // Assuming this is an array of product objects
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// ProductCard Component
const ProductCard = ({ product, onAddToCart, cartItem, onIncrement, onDecrement }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} className="product-image" />
    <div className="product-info">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      {cartItem ? (
        <div className="cart-controls">
          <span>Added to Cart</span>
          <IconButton onClick={() => onDecrement(product)} color="primary">
            <RemoveIcon />
          </IconButton>
          <span>{cartItem.quantity}</span>
          <IconButton onClick={() => onIncrement(product)} color="primary">
            <AddIcon />
          </IconButton>
        </div>
      ) : (
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'gold',
            color: 'black',
            '&:hover': {
              backgroundColor: 'darkgoldenrod',
            },
          }}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      )}
    </div>
  </div>
);

// ProductCatalogue Component
const ProductCatalogue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showBill, setShowBill] = useState(false);

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id));
  };

  const increment = (product) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrement = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.id !== product.id);
      }
    });
  };

  const handleCheckout = () => {
    setShowBill(true);
  };

  const handleClose = () => {
    setShowBill(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="product-catalogue">
      <h1 className="catalogue-title">Product Catalogue</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => {
          const cartItem = cart.find(item => item.id === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              cartItem={cartItem}
              onIncrement={increment}
              onDecrement={decrement}
            />
          );
        })}
      </div>
      {cart.length > 0 && (
        <Button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={cart.length === 0}
          variant="contained"
          sx={{
            backgroundColor: '#b8860b', // Gold
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkgoldenrod',
            },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ShoppingCartIcon sx={{ marginRight: 1 }} /> Checkout
        </Button>
      )}
      <Dialog open={showBill} onClose={handleClose}>
        <DialogTitle>Your Bill</DialogTitle>
        <DialogContent>
          {cart.map(item => (
            <div key={item.id} className="bill-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <div className="bill-controls">
                <IconButton onClick={() => decrement(item)} color="primary">
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => increment(item)} color="primary">
                  <AddIcon />
                </IconButton>
                <Button onClick={() => removeFromCart(item)} color="error" size="small">Remove</Button>
              </div>
            </div>
          ))}
          <div className="bill-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
          <Button onClick={() => alert('Payment successful! Thank you for your purchase.')} color="primary">Pay Now</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductCatalogue;
