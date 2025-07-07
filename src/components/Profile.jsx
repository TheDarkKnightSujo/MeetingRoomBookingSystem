import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null); // Full user object
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    password:""
  });
  


  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users/me", {
          withCredentials: true, // if using cookies
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using token in storage
          },
        });
        setUser(res.data);
        setFormData({
          First_Name: res.data.First_Name,
          Last_Name: res.data.Last_Name,
          Email: res.data.Email,
          password:""
        });
      } catch (err) {
            if (err.response?.status !== 401) {
               alert("Failed to load profile");
              }
              console.error("Error fetching profile:", err);
         }

    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
        const payload={...formData};
        if(!payload.password){
            delete payload.password;
        }
      const res = await axios.put(
        "http://localhost:3001/users/me",
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Profile updated!");
      setUser(res.data);
      setEditMode(false);
      setFormData((prev)=>({...prev,password:""}));
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (<>
    <header className="header">
        <div className="brand">
          <img src="/logo.png" alt="Company Logo" className="logo" />
          <h1>Meeting Room Booking System</h1>
        </div>
        <button className="logout-btn">Logout</button>
      </header>
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-form">
        <label>First Name</label>
        <input
          type="text"
          name="First_Name"
          value={formData.First_Name}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="Last_Name"
          value={formData.Last_Name}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Email</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          disabled
        />
        {editMode&&(
            <>
            <label>New Password</label>
             <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave Blank to Keep Current Password"
        />
            </>
        )}
        

        <div className="profile-buttons">
          {editMode ? (
            <>
            <div className="HandleSave">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
            </>
          ) : (
            <div className="HandleEditprofile">
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
