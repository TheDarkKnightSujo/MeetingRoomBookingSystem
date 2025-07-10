import React, { useState, useEffect } from "react";
import axios from "axios";


const Bookings = () => {
  

  const [bookings,setBookings]=useState([]);

  

  useEffect(() => {
    const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
    const fetchBookings=async()=>{
        try{
            const res=await axios.get("http://localhost:3001/bookings",{headers});
            setBookings(res.data);
        } catch(err){
            console.error("Error Fetching All Bookings: ",err);
        }
    };
    fetchBookings();
  }, []);
    
    
//   const handleSearchById = async () => {
//     if (!selectedUserId) return;
//     try {
//       const res = await axios.get(`http://localhost:3001/users/${selectedUserId}`, { headers });
//       setSelectedUser(res.data);
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error fetching user by ID:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/users/${id}`, { headers });
//       alert("User deleted");
//       setUsers(users.filter((u) => u.User_ID !== id));
//       if (selectedUser?.User_ID === id) setSelectedUser(null);
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setForm({
//       First_Name: user.First_Name,
//       Last_Name: user.Last_Name,
//       Email: user.Email,
//       Role: user.Role,
//     });
//     setEditMode(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:3001/users/${selectedUser.User_ID}`, form, { headers });
//       alert("User updated");
//       setEditMode(false);
//       setSelectedUser(null);

//       // Refresh user list
//       const res = await axios.get("http://localhost:3001/users", { headers });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error updating user:", err);
//     }
//   };

  return (
    <div className="PageBackground">
      <div className="BookContents">
        <header className="head">
          <div className="brand">
            <img src="/logo.png" alt="Company Logo" className="logo" />
            <h1>All Bookings (Admin)</h1>
          </div>
        </header>
        <h2>Bookings List</h2>
        <ul>
        {bookings.map(booking => (
          <li key={booking.Booking_ID}>
            <strong>Title:{booking.Title}</strong> —{" "}
            <p>User ID: {booking.User_ID}</p>
            <p>Start Time:{new Date(booking.Start_Time).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata"
            })}</p>
            <br />
            <p>End Time:{new Date(booking.End_Time).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata"
            })}</p>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default Bookings;
