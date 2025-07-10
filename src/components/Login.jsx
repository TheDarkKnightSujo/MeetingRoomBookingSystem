import React ,{useState} from "react";
import "./login_page.css";
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const navigate = useNavigate(); 
  const handleLogin=async (e)=>{
  e.preventDefault();
  if(!email||!password){
    alert("Enter both username and password");
    return;
  }
  try {
    const response=await axios.post("http://localhost:3001/users/login",{Email:email,password:password},{withCredentials:true});
    if(response.status==200||response.status==204){
      const { token, Role, User_ID, First_Name } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", Role);
      localStorage.setItem("userId", User_ID);
      localStorage.setItem("userName", First_Name);
      alert("Login Succesful");
      
      if (Role === 'Admin') {
        navigate("/admin");   
      } else {
        navigate("/dashboard"); 
      }
    }

  }catch(err){
    console.error("Login failed",err);
    alert("Invalid username or password")
  }
};

  return (
    <><div className="logincontents">
     <div className="logo"><img src="/logo.png" alt="logo"  /></div>
    <div className="a">
     
        
      <div className="login_page_text">
        <h2 >Meeting Room Booking System</h2>
        <form className="form_imp" onSubmit={handleLogin}>
          <div className="Username">
            <label ></label>
            <input
              type="email"
              placeholder="Enter your email"
              className=""
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          
          <div className="Password">
            <label ></label>
            <input
              type="password"
              placeholder="Enter your password"
              className=""
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          
          <div className="login_button">
          <button
            type="submit"
            className="login_button">
            {/* {loading ? "Logging in..." : "LOGIN"} */}
            Login
          </button>
          </div>
        </form>
        <div className="forgot_password">
            <div>
            <Link to="./forgot-password">Forgot Password?</Link>
            </div>
            <div>
            <Link to="./register">Register </Link>
            </div>
        </div>
      </div>
    </div>
    </div>
  </>
  );
};

export default Login;
