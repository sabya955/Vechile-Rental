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
function Car() {
  const [cars, setCars] = useState([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
const [selectedCar, setSelectedCar] = useState(null);

  const [newCar, setNewCar] = useState({
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
    startDate:"",
    endDate: "",
  })
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAdmin = user?.role === "admin";
  const handelBookingInputChange = (e) => {
    setBookingDetails({...bookingDetails, [e.target.name]: e.target.value})
  }
  useEffect(() => {    api
      .get("product/type/car")
      .then((data) => {
        console.log(data);
        setCars(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const addCar = () => {
    if(!newCar.name || !newCar.brand || !newCar.price_per_day || !newCar.img_url || !newCar.model || !newCar.year|| !newCar.type ){
      alert("Please fill all fields")
      return;
    }
    api
      .post("product",newCar)
      .then((data) => {
        console.log("Product", data);

        setCars([data,...cars]);
        setNewCar({
          name: "",
          brand: "",
          model: "",
          year: "",
          price_per_day: "",
          img_url: "",
          type: "",
        });
        setShowAddCar(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const confirmbooking = () => {
    if(!bookingDetails.name || !bookingDetails.email || !bookingDetails.startDate || !bookingDetails.endDate){
      alert("Please fill all fields")
      return;
    }
  
    const bookingPayload = {
      name: bookingDetails.name,
      email: bookingDetails.email,
      car_id: selectedCar._id || selectedCar.id,
      start_date: bookingDetails.startDate,
      end_date: bookingDetails.endDate,
    };
    
    api.post("booking", bookingPayload)
        .then((res)=>{
          alert("Booking Confirmed")
          setOpenBookingDialog(false);
          setBookingDetails({
            name: "",
            email: "",
            phone: "",
            startDate:"",
            endDate: "",
          })
        }).catch((error)=>{
          console.log(error);
          alert("Booking Failed")
        })
  }

  return (
    <div>
      <Grid2
        container
        spacing={2}
        sx={{ pading: 3, maxWidth: 800, margin: "auto" }}
      >
        <Grid2 xs={12}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#e65c00", textAlign: "center" }}
          >
            Cars
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
            onClick={() => setShowAddCar(!showAddCar)}
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
  {cars.map((car, index) => (
    <Grid2 item xs={12} sm={6} md={3} key={index}>
      <Card
        onClick={() => {
          setSelectedCar(car);
          setOpenDialog(true);
        }}
        variant="outlined"
        sx={{
          height: "320px", // fixed card height
          width: "100%",   // full width of Grid item
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderColor: "#e65c00",
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          image={car.img_url}
          alt={car.name}
          sx={{
            height: "220px",
            objectFit: "cover",
          }}
        />
        <CardContent sx={{  flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: "#ff6600", fontSize: "2rem", lineHeight: 1.4 }}
          >
            {car.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#888" }}>
            {car.brand} ({car.year})
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  ))}
</Grid2>


      {showAddCar && isAdmin && (
        <Grid2 xs={10}  sx={{ position: "absolute", 
          top: "50px", 
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10, 
          overflow: "visible", 
          width: "90%",  }}>
          <Card
            sx={{ padding: 3, border: "2px solid #e65c00", borderRadius: 2 }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#e65c00", textAlign: "center" }}
            >
              Add New Car
            </Typography>
            <Grid2
              container
              spacing={2}
              sx={{
                marginTop: 2,
                justifyContent: "center",
                alignContent: "center",
                gap: "10px",
              }}
            >
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Name"
                  value={newCar.name}
                  fullWidth
                  onChange={(e) =>
                    setNewCar({ ...newCar, name: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Brand"
                  value={newCar.brand}
                  fullWidth
                  onChange={(e) =>
                    setNewCar({ ...newCar, brand: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Model"
                  value={newCar.model}
                  fullWidth
                  onChange={(e) =>
                    setNewCar({ ...newCar, model: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Year"
                  type="text"
                  value={newCar.year}
                  fullWidth
                  onChange={(e) =>
                    setNewCar({ ...newCar, year: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Price per day"
                  type="text"
                  value={newCar.price_per_day}
                  fullWidth
                  onChange={(e) =>
                    setNewCar({ ...newCar, price_per_day: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Image URL"
                  value={newCar.img_url}
                  fullWidth
                  onChange={(e) =>
                    setNewCar({ ...newCar, img_url: e.target.value })
                  }
                />
              </Grid2>
              <Grid2 xs={12} sm={10}>
                <TextField
                  label="Type"
                  value={newCar.type}
                  fullWidth
                  onChange={(e) =>
                    setNewCar({ ...newCar, type: e.target.value })
                  }
                />
              </Grid2>
              <Grid2
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#e65c00",
                    color: "#fff",
                    height: "50px",
                    width: "200px",
                  }}
                  onClick={addCar}
                >
                  Add Car
                </Button>
              </Grid2>
            </Grid2>
          </Card>
        </Grid2>
      )}
      {selectedCar && (
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
      {selectedCar.name}
    </Typography>

    <CardMedia
      component="img"
      image={selectedCar.img_url}
      alt={selectedCar.name}
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
          <strong>Brand:</strong> {selectedCar.brand}
        </Typography>
      </Grid2>
      <Grid2 item xs={12}>
        <Typography variant="body1">
          <strong>Model:</strong> {selectedCar.model}
        </Typography>
      </Grid2>
      <Grid2 item xs={12}>
        <Typography variant="body1">
          <strong>Year:</strong> {selectedCar.year}
        </Typography>
      </Grid2>
      <Grid2 item xs={12}>
        <Typography variant="body1">
          <strong>Price per Day:</strong> ₹{selectedCar.price_per_day}
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
    <Button  variant="contained" sx={{ mt: 3, backgroundColor: "#e65c00" }}
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
        PaperProps ={{sx:{borderRadius: 3, p: 3, textAlign: "center"}}}
    >
      {selectedCar && (
        <>
          <Typography variant="h5" sx={{ color: "#e65c00", mb: 2 }}>
            Booking {selectedCar.name}
          </Typography>
          <CardMedia
            component="img"
            image={selectedCar.img_url}
            alt={selectedCar.name}
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
          <Grid2 sx={{ display: "flex", justifyContent: "center", mt: 3 }} gap={2}>
              <Button variant="outlined" onClick={() => setOpenBookingDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#e65c00", color: "#fff" }}
                onClick={confirmbooking}
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

export default Car;
