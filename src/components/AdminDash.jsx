
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDash.css";
import { Link, useNavigate } from "react-router-dom";

const AdminDash = () => {
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
          <h1>Meeting Room Booking System  </h1>
          <h4>(Admin)</h4>
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
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            <Link to="/users">Users</Link>
          </li>
          <li className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
            <Link to="/bookings-admin">All Bookings</Link>
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
            <p><Link to="/meetingrooms-admin">List</Link></p>
          </div>
          <div className="card">
            <h3>Locations</h3>
            <p><Link to="/locations-admin">List</Link></p>
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

export default AdminDash;
