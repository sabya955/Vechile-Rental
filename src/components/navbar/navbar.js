import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { api } from '../../commonapi'; 
import '../navbar.css';

const NavLink = [
    { id: "1", title: "HOME", link: "/" },
    { id: "2", title: "CARS", link: "/cars" },
    { id: "3", title: "BIKES", link: "/Bike" },
    { id: "4", title: "ABOUT", link: "/About" },
    { id: "5", title: "BOOKING", link: "/cancelBook" },
    { id: "6", title: "CONTACT", link: "/Contact" },


];

const Navbar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <>
            <nav className="navbar">
                <h2 className="logo">Car Rental</h2>
                <div className="nav-links">
                    {NavLink.map((data) => (
                        <a key={data.id} href={data.link}>{data.title}</a>
                    ))}
                    
  {user?.role === "admin" && (
    <a href="/Allbooking">ALL BOOKINGS</a>
    )}

                    {user ? (
                        <>
                            <span className="user-info">Welcome, {user.fullName}</span>
                            <button className="logoutbtn" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <button className="signupbtn1" onClick={() => setShowModal(true)}>Signup/Login</button>
                    )}
                </div>
            </nav>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Signup / Login</h2>
                        <LoginSignupForm setUser={setUser} closeModal={() => setShowModal(false)} />
                    </div>
                </div>
            )}
        </>
    );
};

const LoginSignupForm = ({ setUser, closeModal }) => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        driving_licence: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || (isSignup && (!formData.fullName || !formData.phone || !formData.driving_licence))) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const endpoint = isSignup ? "auth/signup" : "auth/login";
            const requestBody = isSignup
                ? formData
                : { email: formData.email, password: formData.password };

            const response = await api.post(endpoint, requestBody);

            if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                setUser(response.user);
                closeModal();
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {isSignup && (
                <>
                    <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange}  />
                    <input type="text" name="phone" placeholder="Phone" onChange={handleChange}  />
                    <input type="text" name="driving_licence" placeholder="Driving Licence" onChange={handleChange} />
                </>
            )}
            <input type="email" name="email" placeholder="Email" onChange={handleChange}  />
            <input type="password" name="password" placeholder="Password" onChange={handleChange}  />
            {isSignup && (
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange}  />
            )}

            <button  type="submit">{isSignup ? "Signup" : "Login"}</button>
            <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer" }}>
                {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
            </p>
        </form>
    );
};

export default Navbar;
