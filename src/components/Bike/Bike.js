import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Grid as Grid2 } from "@mui/material";
import { api } from "../../commonapi";

function Bike() {
  const [bikes, setBikes] = useState([]);
  const [showAddBike, setShowAddBike] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);

  const [newBike, setNewBike] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price_per_day: "",
    img_url: "",
    type: "",
  });

  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user?.role === "admin";

  const handelBookingInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    api
      .get("product/type/bike")
      .then((data) => {
        console.log(data);
        setBikes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addBike = () => {
    if (
      !newBike.name ||
      !newBike.brand ||
      !newBike.price_per_day ||
      !newBike.img_url ||
      !newBike.model ||
      !newBike.year ||
      !newBike.type
    ) {
      alert("Please fill all fields");
      return;
    }

    api
      .post("product", newBike)
      .then((data) => {
        console.log("Bike", data);

        setBikes([data, ...bikes]);
        setNewBike({
          name: "",
          brand: "",
          model: "",
          year: "",
          price_per_day: "",
          img_url: "",
          type: "",
        });
        setShowAddBike(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmBooking = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.startDate || !bookingDetails.endDate) {
      alert("Please fill all fields");
      return;
    }

    const bookingPayload = {
      name: bookingDetails.name,
      email: bookingDetails.email,
      bike_id: selectedBike._id || selectedBike.id,
      start_date: bookingDetails.startDate,
      end_date: bookingDetails.endDate,
    };

    api
      .post("booking", bookingPayload)
      .then((res) => {
        alert("Booking Confirmed");
        setOpenBookingDialog(false);
        setBookingDetails({
          name: "",
          email: "",
          phone: "",
          startDate: "",
          endDate: "",
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Booking Failed");
      });
  };

  return (
    <div>
      <Grid2 container spacing={2} sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
        <Grid2 xs={12}>
          <Typography variant="h4" gutterBottom sx={{ color: "#e65c00", textAlign: "center" }}>
            Bikes
          </Typography>
        </Grid2>
      </Grid2>

      {isAdmin && (
        <Grid2
          xs={12}
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <IconButton
            onClick={() => setShowAddBike(!showAddBike)}
            sx={{
              color: "#ff6600",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
            size="large"
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid2>
      )}

      <Grid2 container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {bikes.map((bike, index) => (
          <Grid2 item xs={12} sm={6} md={3} key={index}>
            <Card
              onClick={() => {
                setSelectedBike(bike);
                setOpenDialog(true);
              }}
              variant="outlined"
              sx={{
                height: "320px",
                width: "100%", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderColor: "#e65c00",
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                image={bike.img_url}
                alt={bike.name}
                sx={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: "#ff6600", fontSize: "2rem", lineHeight: 1.4 }}>
                  {bike.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888" }}>
                  {bike.brand} ({bike.year})
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {showAddBike && isAdmin && (
        <Grid2
          xs={10}
          sx={{
            position: "absolute",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            overflow: "visible",
            width: "90%",
          }}
        >
          <Card sx={{ padding: 3, border: "2px solid #e65c00", borderRadius: 2 }}>
            <Typography variant="h5" sx={{ color: "#e65c00", textAlign: "center" }}>
              Add New Bike
            </Typography>
            <Grid2 container spacing={2} sx={{ marginTop: 2, justifyContent: "center", alignContent: "center", gap: "10px" }}>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Name"
                  value={newBike.name}
                  fullWidth
                  onChange={(e) => setNewBike({ ...newBike, name: e.target.value })}
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Brand"
                  value={newBike.brand}
                  fullWidth
                  onChange={(e) => setNewBike({ ...newBike, brand: e.target.value })}
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Model"
                  value={newBike.model}
                  fullWidth
                  onChange={(e) => setNewBike({ ...newBike, model: e.target.value })}
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Year"
                  type="text"
                  value={newBike.year}
                  fullWidth
                  onChange={(e) => setNewBike({ ...newBike, year: e.target.value })}
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Price per day"
                  type="text"
                  value={newBike.price_per_day}
                  fullWidth
                  onChange={(e) => setNewBike({ ...newBike, price_per_day: e.target.value })}
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Image URL"
                  value={newBike.img_url}
                  fullWidth
                  onChange={(e) => setNewBike({ ...newBike, img_url: e.target.value })}
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Type"
                  value={newBike.type}
                  fullWidth
                  onChange={(e) => setNewBike({ ...newBike, type: e.target.value })}
                />
              </Grid2>
              <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center", alignContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#e65c00",
                    color: "#fff",
                    height: "50px",
                    width: "200px",
                  }}
                  onClick={addBike}
                >
                  Add Bike
                </Button>
              </Grid2>
            </Grid2>
          </Card>
        </Grid2>
      )}

      {selectedBike && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 3,
              textAlign: "center",
            },
          }}
        >
          <Typography variant="h5" sx={{ color: "#e65c00", mb: 2 }}>
            {selectedBike.name}
          </Typography>

          <CardMedia
            component="img"
            image={selectedBike.img_url}
            alt={selectedBike.name}
            sx={{
              height: 300,
              width: "100%",
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
            }}
          />

          <Grid2 container spacing={2} justifyContent="center">
            <Grid2 item xs={12}>
              <Typography variant="body1">
                <strong>Brand:</strong> {selectedBike.brand}
              </Typography>
            </Grid2>
            <Grid2 item xs={12}>
              <Typography variant="body1">
                <strong>Model:</strong> {selectedBike.model}
              </Typography>
            </Grid2>
            <Grid2 item xs={12}>
              <Typography variant="body1">
                <strong>Year:</strong> {selectedBike.year}
              </Typography>
            </Grid2>
            <Grid2 item xs={12}>
              <Typography variant="body1">
                <strong>Price per Day:</strong> ₹{selectedBike.price_per_day}
              </Typography>
            </Grid2>
          </Grid2>

          <Grid2 gap={2} sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#e65c00" }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#e65c00" }}
              onClick={() => {
                setOpenDialog(false);
                setOpenBookingDialog(true);
              }}
            >
              Book Now
            </Button>
          </Grid2>
        </Dialog>
      )}

      <Dialog
        open={openBookingDialog}
        onClose={() => setOpenBookingDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 3,
            textAlign: "center",
          },
        }}
      >
        {selectedBike && (
          <>
            <Typography variant="h5" sx={{ color: "#e65c00", mb: 2 }}>
              Booking {selectedBike.name}
            </Typography>
            <CardMedia
              component="img"
              image={selectedBike.img_url}
              alt={selectedBike.name}
              sx={{
                height: 200,
                width: "100%",
                objectFit: "cover",
                borderRadius: 2,
                mb: 2,
              }}
            />
            <Grid2 container spacing={2}>
              <Grid2 item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Your Name"
                  value={bookingDetails.name}
                  onChange={handelBookingInputChange}
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={bookingDetails.email}
                  onChange={handelBookingInputChange}
                />
              </Grid2>
              <Grid2 item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={bookingDetails.startDate}
                  onChange={handelBookingInputChange}
                />
              </Grid2>
              <Grid2 item xs={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={bookingDetails.endDate}
                  onChange={handelBookingInputChange}
                />
              </Grid2>
            </Grid2>
            <Grid2 sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e65c00",
                  color: "#fff",
                  height: "50px",
                  width: "200px",
                }}
                onClick={confirmBooking}
              >
                Confirm Booking
              </Button>
            </Grid2>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default Bike;
