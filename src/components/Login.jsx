import React from "react";
import "./login_page.css";
import { Link } from 'react-router-dom';
// const [username,setUsername] =useState("");
// const [password,setPassword] =useState("");
// const handleLogin=()=>{

// };

const Login = () => {
  return (
    <>
     <div className="logo"><img src="public\logo.png" alt="logo"  /></div>
    <div className="a">
     
        
      <div className="login_page_text">
        <h2 >Meeting Room Booking System</h2>
        <form className="form_imp">
          <div className="Username">
            <label ></label>
            <input
              type="email"
              placeholder="Enter your email"
              className=""
            />
          </div>
          
          <div className="Password">
            <label ></label>
            <input
              type="password"
              placeholder="Enter your password"
              className=""
            />
          </div>
          
          <div className="login_button">
          <button
            type="submit"
            className="login_button"
            // onClick={handleLogin}
          >
            
            LOGIN
          </button>
          </div>
        </form>
        <p className="forgot_password">
            <Link to="./ForgotPassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  </>
  );
};

export default Login;
