import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import axios from 'axios';

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter both email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        {
          First_Name: fname,
          Last_Name: lname,
          Email: email,
          password: password,
          Role: role
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Register Successful");
        navigate("/");
      }
    } catch (err) {
      console.error("Register failed", err);
      alert("Something Went Wrong");
    }
  };

  return (
    <div className="registercontents">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="a">
        <div className="login_page_text">
          <h2>Meeting Room Booking System</h2>
          <form className="form_imp" onSubmit={handleRegister}>
            <div className="FirstName">
              <input
                type="text"
                placeholder="Enter your First Name"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className="LastName">
              <input
                type="text"
                placeholder="Enter your Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            <div className="Username">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="Password">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="RadioButton">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={role === "Admin"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Admin
              </label>
            </div>

            <div className="RadioButton">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="User"
                  checked={role === "User"}
                  onChange={(e) => setRole(e.target.value)}
                />
                User
              </label>
            </div>

            <div className="login_button">
              <button type="submit" className="login_button">
                Register
              </button>
            </div>
          </form>

          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
