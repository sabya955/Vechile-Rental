import React from 'react'
import './hero.css'
import {motion} from "framer-motion";
import { useNavigate}  from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/cars');
  };
  return (
    
    <motion.div
    className="container"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
  >
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <p>Effortless</p>
      <h1>We Rent Limousines</h1>
      <p>
      We value the time and quality of travel
      </p>
      <p>
        Book your car ride with us and experience the difference.
      </p>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        onClick={handleClick}
        className="btn"
      >
        Get Started
      </motion.button>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <img
        src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGNhcnxlbnwwfHwwfHx8MA%3D%3D"
        alt="Car"
      />
    </motion.div>
  </motion.div>
  )
}

export default Hero
