import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { api } from "../../commonapi";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await api.get("booking/admin/all-bookings");
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch all bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <Box mt={4} textAlign="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>All Bookings (Admin View)</Typography>
      {bookings.length === 0 ? (
        <Typography>No bookings available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card sx={{ background: "#121212", color: "#fff" }}>
                <CardContent>
                  <Typography variant="h6">{booking.name}</Typography>
                  <Typography>Email: {booking.email}</Typography>
                  <Typography>Car ID: {booking.car_id}</Typography>
                  <Typography>
                    From: {new Date(booking.start_date).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    To: {new Date(booking.end_date).toLocaleDateString()}
                  </Typography>
                  <Typography>Status: {booking.status}</Typography>
                  <Typography variant="caption">
                    Created: {new Date(booking.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllBookings;
