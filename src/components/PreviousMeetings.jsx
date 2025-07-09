import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PreviosMeetings.css";

const PreviousMeetings = () => {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch user info to get current user ID
      const meRes = await axios.get("http://localhost:3001/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userID = meRes.data.User_ID;
      setUserId(userID);

      // Get only past meetings
      const res = await axios.get("http://localhost:3001/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const pastBookings = res.data.filter((booking) => booking.Status === "Past");
      setBookings(pastBookings);
    } catch (err) {
      console.error("Error fetching previous meetings:", err);
      setError("Failed to load previous meetings.");
    }
  };

  const [minutesMap, setMinutesMap] = useState({});
  const [participantsMap, setParticipantsMap] = useState({});

  const fetchMinutesAndParticipants = async (bookingId) => {
  const token = localStorage.getItem("token");
  try {
    const [minutesRes, participantsRes] = await Promise.all([
      axios.get(`http://localhost:3001/bookings/${bookingId}/minutes`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`http://localhost:3001/bookings/${bookingId}/participants`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const participants = participantsRes.data;

    // Fetch full user details for each participant
    const participantDetails = await Promise.all(
      participants.map(async (p) => {
        const res = await axios.get(`http://localhost:3001/users/${p.User_ID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
      })
    );

    setMinutesMap((prev) => ({ ...prev, [bookingId]: minutesRes.data }));
    setParticipantsMap((prev) => ({ ...prev, [bookingId]: participantDetails }));
  } catch (err) {
    console.error(`Error fetching minutes/participants for booking ${bookingId}:`, err);
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    bookings.forEach((b) => fetchMinutesAndParticipants(b.Booking_ID));
  }, [bookings]);

  const handleMinutesChange = (bookingId, field, value) => {
    setMinutesMap((prev) => ({
      ...prev,
      [bookingId]: [{ ...prev[bookingId][0], [field]: value }],
    }));
  };

  const handleSaveMinutes = async (bookingId) => {
    const token = localStorage.getItem("token");
    const minutes = minutesMap[bookingId]?.[0];
    try {
      await axios.put(`http://localhost:3001/bookings/${bookingId}/minutes`, minutes, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Minutes updated.");
    } catch (err) {
      console.error("Failed to update minutes:", err);
      alert("Failed to update.");
    }
  };

  return (
    <div className="PageBackground">
        <header className="head ">
        <div className="brand">
          <img src="/logo.png" alt="Company Logo" className="logo" />
          <h1>Meeting Room Booking System</h1>
        </div>
      </header>
      <div className="BookContents">
        <h2 style={{ textAlign: "center" }}>Previous Meetings</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {bookings.length === 0 ? (
          <p>No past meetings found.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.Booking_ID} className="booking-card">
              <h3>{booking.Title}</h3>
              <p><strong>Room:</strong> {booking.MeetingRoom?.Name}</p>
              <p><strong>Owner:</strong> {booking.User?.First_Name} {booking.User?.Last_Name}</p>
              <p><strong>Start:</strong> {booking.Start_Time_IST}</p>
              <p><strong>End:</strong> {booking.End_Time_IST}</p>

              <h4>Participants</h4>
              <ul>
                  {(participantsMap[booking.Booking_ID] || []).map((participant, idx) => (
                    <li key={idx}>
                  {participant.First_Name} {participant.Last_Name}
                    </li>
                  ))}
                </ul>



              <h4>Meeting Minutes</h4>
              {userId === booking.User_ID ? (
                <>
                  <textarea
                    rows={3}
                    value={minutesMap[booking.Booking_ID]?.[0]?.Notes_Text || ""}
                    onChange={(e) =>
                      handleMinutesChange(booking.Booking_ID, "Notes_Text", e.target.value)
                    }
                    placeholder="Enter minutes..."
                    style={{ width: "100%" }}
                  />
                  <input
                    type="text"
                    value={minutesMap[booking.Booking_ID]?.[0]?.Attachments_Path || ""}
                    onChange={(e) =>
                      handleMinutesChange(booking.Booking_ID, "Attachments_Path", e.target.value)
                    }
                    placeholder="Attachment path"
                    style={{ width: "100%", marginTop: "5px" }}
                  />
                  <button
                    onClick={() => handleSaveMinutes(booking.Booking_ID)}
                    style={{ marginTop: "5px" }}
                  >
                    Save Minutes
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Notes:</strong> {minutesMap[booking.Booking_ID]?.[0]?.Notes_Text || "N/A"}</p>
                  <p><strong>Attachment:</strong> {minutesMap[booking.Booking_ID]?.[0]?.Attachments_Path || "N/A"}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PreviousMeetings;
