import React from 'react';
import Navbar from './components/navbar/navbar';
import Hero from './components/Hero/hero';
import About from './components/About/about';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';  
import Car from './components/cars/Car';
import CancelBook from './components/cancelBook/cancelBook';
import AllBookings from './components/Allbooking/Allbooking';
import Bike from './components/Bike/Bike';
import Footer from './components/Footer/Footer';
import Hero1 from './Hero1/Hero1';
import './App.css';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<><Hero/><About/><Hero1/><Contact/></>} />
          <Route path="/cars" element={<Car/>} />
          <Route path="/Bike" element={<Bike/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/cancelBook" element={<CancelBook/>} />
          <Route path="/Allbooking" element={<AllBookings/>} />
          <Route path="/Contact" element={<Contact/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
