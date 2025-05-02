import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Contact = () => {
  return (
    <MotionBox
      sx={{ p: 4, backgroundColor: '#ffffff', color: '#333' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{  fontWeight: 'bold' }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        {/* Map Section */}
        <Grid item xs={12} md={6}>
          <MotionPaper
            elevation={4}
            sx={{ height: '100%', overflow: 'hidden' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0203883789454!2d-122.42037968467988!3d37.77492927975998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c2e0d1ed%3A0x70e9a2bfa4c1e5db!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1614085215277!5m2!1sen!2sus"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </MotionPaper>
        </Grid>

        {/* Contact Info Section */}
        <Grid item xs={12} md={6}>
          <MotionPaper
            elevation={4}
            sx={{
              p: 4,
              height: '100%',
              backgroundColor: '#fafafa',
              color: '#333',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ color: '#FF5722', mr: 2 }} />
              <Typography variant="body1">+1 (123) 456-7890</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ color: '#FF5722', mr: 2 }} />
              <Typography variant="body1">contact@yourdomain.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: '#FF5722', mr: 2 }} />
              <Typography variant="body1">123 Main Street, San Francisco, CA</Typography>
            </Box>
          </MotionPaper>
        </Grid>
      </Grid>
    </MotionBox>
  );
};

export default Contact;
