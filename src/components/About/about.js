import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.img
            src="https://images.unsplash.com/photo-1608319984133-1d0e5e20988e?w=800"
            alt="Car Service"
            style={{ width: "100%", borderRadius: "12px", height: "500px" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typography variant="h4" gutterBottom>
              About Our Vehicle Booking Company
            </Typography>
            <Typography variant="body1" paragraph>
              At **EasyRide Rentals**, we bring convenience, safety, and style
              to your travels. Whether you're planning a business trip, a
              weekend getaway, or need a luxurious ride for a special event —
              we’ve got you covered.
            </Typography>
            <Typography variant="body1" paragraph>
              With a wide range of vehicles, easy online booking, and dedicated
              customer support, our mission is to make your car rental
              experience smooth and memorable.
            </Typography>
            <Button
          sx={{
            backgroundColor: "#ff6600",
            color: "white",
            padding: "13px 30px",
            borderRadius: "8px",

            "&:hover": {
              backgroundColor: "#e65c00",
            },
          }}
        >
          Read More
        </Button>
          </motion.div>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default About;
