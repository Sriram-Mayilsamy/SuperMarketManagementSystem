import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImg from './pcbg.jpg'; // Import your local image

const products = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: '$3.99/lb',
    image: 'https://via.placeholder.com/150?text=Apples',
  },
  {
    id: 2,
    name: 'Whole Wheat Bread',
    price: '$2.49/loaf',
    image: 'https://via.placeholder.com/150?text=Bread',
  },
  {
    id: 3,
    name: 'Organic Milk',
    price: '$4.99/gallon',
    image: 'https://via.placeholder.com/150?text=Milk',
  },
  {
    id: 4,
    name: 'Eggs (Dozen)',
    price: '$2.99/dozen',
    image: 'https://via.placeholder.com/150?text=Eggs',
  },
];

const FancyTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '20px',
  color: '#007bff',
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 700,
  fontSize: '2.5rem',
});

const FullScreenBackground = styled('div')({
  position: 'relative',
  width: '100vw',
  height: '100vh',
  background: `url(${backgroundImg}) no-repeat center center`,
  backgroundSize: 'cover',
  overflow: 'hidden',
});

const ContentContainer = styled(Container)({
  position: 'relative',
  zIndex: 1,
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const ProductCatalogue = () => {
  const handleRestock = (productId) => {
    console.log(`Restocking product with id: ${productId}`);
  };

  return (
    <FullScreenBackground>
      <ContentContainer maxWidth="md">
        <FancyTitle variant="h1" component="h1">
          Supermarket Product Catalogue
        </FancyTitle>
        
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Button
                    size="small"
                    color="primary"
                    style={{ margin: '10px', backgroundColor: '#007bff', color: '#ffffff' }}
                    onClick={() => handleRestock(product.id)}
                  >
                    Restock
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    style={{ margin: '10px', backgroundColor: '#007bff', color: '#ffffff' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
    </FullScreenBackground>
  );
};

export default ProductCatalogue;
