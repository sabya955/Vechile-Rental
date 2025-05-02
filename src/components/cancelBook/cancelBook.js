import React, { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Button, CircularProgress, Grid, Alert
} from "@mui/material";
import { api } from "../../commonapi";

const CancelBook = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      setError("You must be logged in to view bookings.");
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(localUser);
    setUser(parsedUser);

    const loadBookings = async () => {
      try {
        const endpoint = parsedUser.role === "admin" ? "booking/admin/all-bookings" : "booking/user/bookings";
        const data = await api.get(endpoint);
        setBookings(data);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    setCanceling(id);
    try {
      const res = await api.update(`booking/cancel/${id}`);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? res.booking : b))
      );
    } catch (err) {
      alert("Failed to cancel booking.");
    } finally {
      setCanceling(null);
    }
  };

  if (loading) return <Box mt={4} textAlign="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {user?.role === "admin" ? "All Bookings (Admin View)" : "My Bookings"}
      </Typography>
      {bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card sx={{ background: "#1e1e1e", color: "#fff" }}>
                <CardContent>
                  <Typography variant="h6">{booking.name}</Typography>
                  <Typography>Email: {booking.email}</Typography>
                  <Typography>Car Name: {booking.car_name}</Typography>
                  <Typography>Car ID: {booking.car_id}</Typography>
                  <Typography>From: {booking.start_date}</Typography>
                  <Typography>To: {booking.end_date}</Typography>
                  <Typography>Status: {booking.status}</Typography>
                  {booking.status === "Booked" && (
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="error"
                        disabled={canceling === booking.id}
                        onClick={() => cancelBooking(booking.id)}
                      >
                        {canceling === booking.id ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Cancel Booking"
                        )}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CancelBook;
