import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMinutes = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [minutes, setMinutes] = useState("");
  const [filePath, setFilePath] = useState("");
  const [existingMinute, setExistingMinute] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3001/bookings/mine", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };

    fetchBookings();
  }, [token]);

  const handleBookingSelect = async (booking) => {
    setSelectedBooking(booking);
    try {
      const res = await axios.get(`http://localhost:3001/bookings/${booking.Booking_ID}/minutes`);
      if (res.data.length > 0) {
        setMinutes(res.data[0].Notes_Text || "");
        setFilePath(res.data[0].Attachments_Path || "");
        setExistingMinute(true);
      } else {
        setMinutes("");
        setFilePath("");
        setExistingMinute(false);
      }
    } catch (err) {
      console.error("Error fetching minutes", err);
    }
  };

  const handleSaveMinutes = async () => {
    try {
      if (existingMinute) {
        await axios.put(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}/minutes`, {
          Notes_Text: minutes,
          Attachments_Path: filePath,
        });
        alert("Minutes updated successfully");
      } else {
        await axios.post(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}/minutes`, {
          Notes_Text: minutes,
          Attachments_Path: filePath,
        });
        alert("Minutes added successfully");
      }
    } catch (err) {
      console.error("Error saving minutes", err);
      alert("Failed to save minutes");
    }
  };

  return (
    <div className="PageBackground">
      <div className="BookContents">
        <header className="head">
          <div className="brand">
            <img src="/logo.png" alt="Company Logo" className="logo" />
            <h1>Meeting Room Booking System</h1>
          </div>
        </header>

        <h2>Your Meetings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.Booking_ID}>
              <strong>{booking.Title}</strong> — {new Date(booking.Start_Time).toLocaleString()}
              <button onClick={() => handleBookingSelect(booking)}>View Minutes</button>
            </li>
          ))}
        </ul>

        {selectedBooking && (
          <div>
            <h3>Minutes for: {selectedBooking.Title}</h3>
            <textarea
              rows={6}
              cols={60}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Write meeting minutes here..."
            />
            <br />
            <input
              type="text"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              placeholder="Attachment URL or path (optional)"
            />
            <br />
            <button onClick={handleSaveMinutes}>Save Minutes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMinutes;
