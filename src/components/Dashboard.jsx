import React, { useState,useEffect } from "react";
import "./dashboard.css";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [todayMeetings,setTodayMeetings]=useState([]);
  const now=new Date();

  const hours=now.getHours();
  const minutes=now.getMinutes();
  const seconds=now.getSeconds();
  

  const dayOfMonth=now.getDate();
  const month=now.getMonth()+1;
  const year=now.getFullYear();
  const dayOfWeek=now.getDay();
  // const dayOfWeek="";
  // switch(day)
  // {
  //   case 0:
  //     dayOfWeek="Sunday";
  //     break;
  //   case 1:
  //     dayOfWeek="Monday";
  //     break;
  //   case 1:
  //     dayOfWeek="Monday";
  //     break;
  //   case 1:
  //     dayOfWeek="Monday";
  //     break;
  //   case 1:
  //     dayOfWeek="Monday";
  //     break;  
  // }

  const bookings = [
    { id: 1, room: "Conference Room A", bookedBy: "John Smith", time: "10:00 AM - 11:00 AM", date: "2025-07-04", status: "Upcoming" },
    { id: 2, room: "Meeting Room B", bookedBy: "Sarah Johnson", time: "2:00 PM - 3:30 PM", date: "2025-07-04", status: "Past" },
    { id: 3, room: "Board Room", bookedBy: "Mike Davis", time: "9:00 AM - 10:30 AM", date: "2025-07-05", status: "Ongoing" },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <img src="/logo.png" alt="Company Logo" className="logo" />
          <h1>Meeting Room Booking System</h1>
        </div>
        <button className="logout-btn">Logout</button>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={activeTab === 'book' ? 'active' : ''}
            onClick={() => setActiveTab('book')}
          >
            <Link to="/book">Book Meeting Room</Link>
          </li>
          <li 
            className={activeTab === 'edit' ? 'active' : ''}
            onClick={() => setActiveTab('edit')}
          >
            <Link to="/book">Edit Booking</Link>
          </li>
          <li 
            className={activeTab === 'previous' ? 'active' : ''}
            onClick={() => setActiveTab('previous')}
          >
             <Link to="/book">Previous Bookings</Link>
          </li>
          <li 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
           <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Stats Cards */}
        <section className="stats">
          <div className="card">
            <h3>Meetings Booked</h3>
            <p>47</p>
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

        {/* Recent Bookings Section */}
        <section className="bookings">
          <div className="section-header">
            <h2>Recent Meetings</h2>
            
          </div>

          <table className="bookings-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Booked By</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="bookingdata">
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.room}</td>
                  <td>{booking.bookedBy}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <span className={`status ${booking.status.toLowerCase()}`}>
                      {booking.status}
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