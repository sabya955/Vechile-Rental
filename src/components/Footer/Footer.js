import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#111', color: '#ddd', py: 6,mt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom color="white">
              Vheicil Rental
            </Typography>
            <Typography variant="body2">
              Reliable cars. Affordable rates. Drive your journey with confidence.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="white">
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover" display="block">Home</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Vehicles</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Book Now</Link>
              <Link href="#" color="inherit" underline="hover" display="block">Contact</Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="white">
              Contact
            </Typography>
            <Typography variant="body2">Email: info@vheicilrental.com</Typography>
            <Typography variant="body2">Phone: +1 234 567 890</Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton href="#" color="inherit"><FacebookIcon /></IconButton>
              <IconButton href="#" color="inherit"><InstagramIcon /></IconButton>
              <IconButton href="#" color="inherit"><TwitterIcon /></IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5} textAlign="center" fontSize="14px" borderTop="1px solid #333" pt={3}>
          &copy; 2025 Vheicil Rental. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
