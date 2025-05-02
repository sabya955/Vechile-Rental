import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Hero1 = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Bike');
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
        <p>Adventure Awaits</p>
        <h1>We Rent Premium Bikes</h1>
        <p>
          Ride with freedom and style
        </p>
        <p>
          Book your dream bike today and feel the thrill.
        </p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={handleClick}
          className='btn'

        >
          Explore Bikes
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpa2V8ZW58MHx8MHx8fDA%3D"
          alt="Bike"
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero1;
