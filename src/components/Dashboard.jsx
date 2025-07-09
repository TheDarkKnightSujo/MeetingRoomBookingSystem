// // import React, { useState,useEffect } from "react";
// // import "./dashboard.css";
// // import { Link } from 'react-router-dom';
// // import { useNavigate } from "react-router-dom";



// // const Dashboard = () => {

// //   const navigate=useNavigate();

// //   useEffect(()=>{
// //     const token =localStorage.getItem("token");
// //     if(!token)
// //       navigate('/');
// //   },[])

// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [todayMeetings,setTodayMeetings]=useState([]);
// //   const now=new Date();

// //   const hours=now.getHours();
// //   const minutes=now.getMinutes();
// //   const seconds=now.getSeconds();
  

// //   const dayOfMonth=now.getDate();
// //   const month=now.getMonth()+1;
// //   const year=now.getFullYear();
// //   const dayOfWeek=now.getDay();
// //   // const dayOfWeek="";
// //   // switch(day)
// //   // {
// //   //   case 0:
// //   //     dayOfWeek="Sunday";
// //   //     break;
// //   //   case 1:
// //   //     dayOfWeek="Monday";
// //   //     break;
// //   //   case 1:
// //   //     dayOfWeek="Monday";
// //   //     break;
// //   //   case 1:
// //   //     dayOfWeek="Monday";
// //   //     break;
// //   //   case 1:
// //   //     dayOfWeek="Monday";
// //   //     break;  
// //   // }

// //   const handleLogout=()=>{
// //     localStorage.removeItem("token");
// //     navigate("/");
// //   }

// //   const bookings = [
// //     { id: 1, room: "Conference Room A", bookedBy: "John Smith", time: "10:00 AM - 11:00 AM", date: "2025-07-04", status: "Upcoming" },
// //     { id: 2, room: "Meeting Room B", bookedBy: "Sarah Johnson", time: "2:00 PM - 3:30 PM", date: "2025-07-04", status: "Past" },
// //     { id: 3, room: "Board Room", bookedBy: "Mike Davis", time: "9:00 AM - 10:30 AM", date: "2025-07-05", status: "Ongoing" },
// //   ];

// //   return (
// //     <div className="dashboard">
// //       {/* Header */}
// //       <header className="header">
// //         <div className="brand">
// //           <img src="/logo.png" alt="Company Logo" className="logo" />
// //           <h1>Meeting Room Booking System</h1>
// //         </div>
// //         <button className="logout-btn" onClick={handleLogout}>Logout</button>
// //       </header>

// //       {/* Sidebar */}
// //       <aside className="sidebar">
// //         <ul>
// //           <li 
// //             className={activeTab === 'dashboard' ? 'active' : ''}
// //             onClick={() => setActiveTab('dashboard')}
// //           >
// //             Dashboard
// //           </li>
// //           <li 
// //             className={activeTab === 'book' ? 'active' : ''}
// //             onClick={() => setActiveTab('book')}
// //           >
// //             <Link to="/book">Book Meeting Room</Link>
// //           </li>
// //           <li 
// //             className={activeTab === 'edit' ? 'active' : ''}
// //             onClick={() => setActiveTab('edit')}
// //           >
// //             <Link to="/book">Edit Booking</Link>
// //           </li>
// //           <li 
// //             className={activeTab === 'previous' ? 'active' : ''}
// //             onClick={() => setActiveTab('previous')}
// //           >
// //              <Link to="/book">Previous Bookings</Link>
// //           </li>
// //           <li 
// //             className={activeTab === 'profile' ? 'active' : ''}
// //             onClick={() => setActiveTab('profile')}
// //           >
// //            <Link to="/profile">Profile</Link>
// //           </li>
// //         </ul>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="main-content">
// //         {/* Stats Cards */}
// //         <section className="stats">
// //           <div className="card">
// //             <h3>Meeting Invitations</h3>
// //             <p><Link to="/invitaions">View</Link></p>
// //           </div>
// //           <div className="card">
// //             <h3>Meeting Rooms</h3>
// //             <p><Link to="/meetingrooms">List</Link></p>
// //           </div>
// //           <div className="card">
// //             <h3>Locations</h3>
// //             <p><Link to="/locations">List</Link></p>
// //           </div>
// //         </section>

// //         {/* Recent Bookings Section */}
// //         <section className="bookings">
// //           <div className="section-header">
// //             <h2>Recent Meetings</h2>
            
// //           </div>

// //           <table className="bookings-table">
// //             <thead>
// //               <tr>
// //                 <th>Room</th>
// //                 <th>Booked By</th>
// //                 <th>Date</th>
// //                 <th>Time</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bookingdata">
// //               {bookings.map(booking => (
// //                 <tr key={booking.id}>
// //                   <td>{booking.room}</td>
// //                   <td>{booking.bookedBy}</td>
// //                   <td>{booking.date}</td>
// //                   <td>{booking.time}</td>
// //                   <td>
// //                     <span className={`status ${booking.status.toLowerCase()}`}>
// //                       {booking.status}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };
// // export default Dashboard;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./dashboard.css";
// import { Link, useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [bookings, setBookings] = useState([]);
//   const [user, setUser] = useState(null);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   // Fetch user & bookings
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const headers = {
//             Authorization: `Bearer ${token}`,
//         };
//         const response = await axios.get('http://localhost:3001/bookings/my', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         });

//         if (!Array.isArray(response.data)) {
//          console.error("Unexpected response:", response.data);
//           return;
//         }
        

//         // Get user info
//         const userRes = await fetch("http://localhost:3001/users/me", { headers });
//         const userData = await userRes.json();
//         setUser(userData);

//         // Get bookings
//         const bookingsRes = await fetch("http://localhost:3001/bookings/my", { headers });
//         const allBookings = await bookingsRes.json();

//         // Filter to today, yesterday, tomorrow
//         const today = new Date();
//         const yesterday = new Date(today);
//         yesterday.setDate(today.getDate() - 1);
//         const tomorrow = new Date(today);
//         tomorrow.setDate(today.getDate() + 1);

//         const format = (d) => d.toISOString().split("T")[0];
//         const todayStr = format(today);
//         const yesterdayStr = format(yesterday);
//         const tomorrowStr = format(tomorrow);

//         const filtered = allBookings.filter(b => {
//            const dateStr = new Date(b.Start_Time).toISOString().split("T")[0];
//            return [yesterdayStr, todayStr, tomorrowStr].includes(dateStr);
//         });


//         setBookings(filtered);
//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//         localStorage.removeItem("token");
//         navigate("/");
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="dashboard">
//       {/* Header */}
//       <header className="header">
//         <div className="brand">
//           <img src="/logo.png" alt="Company Logo" className="logo" />
//           <h1>Meeting Room Booking System</h1>
//         </div>
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </header>

//       {/* Sidebar */}
//       <aside className="sidebar">
//         <ul>
//           <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
//             Dashboard
//           </li>
//           <li className={activeTab === 'book' ? 'active' : ''} onClick={() => setActiveTab('book')}>
//             <Link to="/book">Book Meeting Room</Link>
//           </li>
//           <li className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>
//             <Link to="/book">Edit Booking</Link>
//           </li>
//           <li className={activeTab === 'previous' ? 'active' : ''} onClick={() => setActiveTab('previous')}>
//             <Link to="/book">Previous Bookings</Link>
//           </li>
//           <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
//             <Link to="/profile">Profile</Link>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Stats Cards */}
//         <section className="stats">
//           <div className="card">
//             <h3>Meeting Invitations</h3>
//             <p><Link to="/invitations">View</Link></p>
//           </div>
//           <div className="card">
//             <h3>Meeting Rooms</h3>
//             <p><Link to="/meetingrooms">List</Link></p>
//           </div>
//           <div className="card">
//             <h3>Locations</h3>
//             <p><Link to="/locations">List</Link></p>
//           </div>
//         </section>

//         {/* Recent Bookings */}
//         <section className="bookings">
//           <div className="section-header">
//             <h2>Recent Meetings (Yesterday, Today, Tomorrow)</h2>
//           </div>

//           <table className="bookings-table">
//             <thead>
//           <tr>
//     <th>Title</th>
//     <th>Room</th>
//     <th>Booked By</th>
//     <th>Date</th>
//     <th>Time</th>
//     <th>Status</th>
//   </tr>
// </thead>
// <tbody className="bookingdata">
//   {bookings.map((booking) => (
//     <tr key={booking.Booking_ID}>
//       <td>{booking.Title}</td>
//       <td>{booking.MeetingRoom?.Name || "Unknown Room"}</td>
//       <td>{booking.User ? `${booking.User.First_Name} ${booking.User.Last_Name}` : "Unknown"}</td>
//       <td>{new Date(booking.Start_Time).toLocaleDateString()}</td>
//       <td>
//         {new Date(booking.Start_Time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//         {" - "}
//         {new Date(booking.End_Time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//       </td>
//       <td>
//         <span className={`status ${booking.Status.toLowerCase()}`}>
//           {booking.Status}
//         </span>
//       </td>
//            </tr>
//              ))}
//            </tbody>
//          </table>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [userRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:3001/users/me", { headers }),
          axios.get("http://localhost:3001/bookings/my", { headers }),
        ]);

        setUser(userRes.data);

        const today = new Date();
        const yesterday = new Date(today);
        const tomorrow = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        tomorrow.setDate(today.getDate() + 1);

        const format = (d) => d.toISOString().split("T")[0];
        const todayStr = format(today);
        const yesterdayStr = format(yesterday);
        const tomorrowStr = format(tomorrow);

        const filtered = bookingsRes.data.filter((b) => {
          const dateStr = new Date(b.Start_Time).toISOString().split("T")[0];
          return [yesterdayStr, todayStr, tomorrowStr].includes(dateStr);
        });

        setBookings(filtered);
      } catch (err) {
        console.error("Error loading dashboard:", err);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="brand">
          <img src="/logo.png" alt="Company Logo" className="logo" />
          <h1>Meeting Room Booking System</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <aside className="sidebar">
        <ul>
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </li>
          <li className={activeTab === 'book' ? 'active' : ''} onClick={() => setActiveTab('book')}>
            <Link to="/book">Book Meeting Room</Link>
          </li>
          <li className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>
            <Link to="/editbook">Edit Booking</Link>
          </li>
          <li className={activeTab === 'previous' ? 'active' : ''} onClick={() => setActiveTab('previous')}>
            <Link to="/previous">Previous Meetings</Link>
          </li>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <section className="stats">
          <div className="card">
            <h3>Meeting Minutes</h3>
            <p><Link to="/minutes">View</Link></p>
          </div>
          <div className="card">
            <h3>Meeting Rooms</h3>
            <p><Link to="/meetingrooms">List</Link></p>
          </div>
          <div className="card">
            <h3>Locations</h3>
            <p><Link to="/locations">List</Link></p>
          </div>
        </section>

        <section className="bookings">
          <div className="section-header">
            <h2>Recent Meetings (Yesterday, Today, Tomorrow)</h2>
          </div>

          <table className="bookings-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Room</th>
                <th>Booked By</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="bookingdata">
              {bookings.map((booking) => (
                <tr key={booking.Booking_ID}>
                  <td>{booking.Title}</td>
                  <td>{booking.MeetingRoom?.Name || "Unknown Room"}</td>
                  <td>{booking.User ? `${booking.User.First_Name} ${booking.User.Last_Name}` : "Unknown"}</td>
                  <td>
                    {new Date(booking.Start_Time).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td>
                    {new Date(booking.Start_Time).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Kolkata",
                    })}
                    {" - "}
                    {new Date(booking.End_Time).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td>
                    <span className={`status ${booking.Status.toLowerCase()}`}>
                      {booking.Status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
