// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EditBook.css';

// const EditBook = () => {
//   const [myBookings, setMyBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [title, setTitle] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [participantEmails, setParticipantEmails] = useState('');
//   const [participants, setParticipants] = useState([]);

//   const headers = {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   };

//   // Fetch user's bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const userRes = await axios.get('http://localhost:3001/users/me', { headers });
//         const userId = userRes.data.User_ID;

//         const bookingsRes = await axios.get('http://localhost:3001/bookings/my', { headers });
//         const owned = bookingsRes.data.filter(b => b.User_ID === userId);
//         setMyBookings(owned);
//       } catch (err) {
//         console.error('Error fetching bookings:', err);
//       }
//     };

//     fetchBookings();
//   }, []);

//   // Fetch participants of a selected booking
//   const fetchParticipants = async (bookingId) => {
//     try {
//       const res = await axios.get(`http://localhost:3001/bookings/${bookingId}/participants`, { headers });

//       // Fetch each participant's email
//       const detailedParticipants = await Promise.all(
//         res.data.map(async (p) => {
//           try {
//             const userRes = await axios.get(`http://localhost:3001/users/${p.User_ID}`, { headers });
//             return { ...p, email: userRes.data.Email };
//           } catch {
//             return { ...p, email: 'Unknown' };
//           }
//         })
//       );

//       setParticipants(detailedParticipants);
//     } catch (err) {
//       console.error('Error fetching participants:', err);
//     }
//   };

//   // Select a booking to edit
//   const handleEdit = (booking) => {
//     setSelectedBooking(booking);
//     setTitle(booking.Title);
//     setStartTime(new Date(booking.Start_Time).toISOString().substring(11, 16)); // "HH:MM"
//     setEndTime(new Date(booking.End_Time).toISOString().substring(11, 16));
//     fetchParticipants(booking.Booking_ID);
//   };

//   // Submit update
//   const handleUpdate = async () => {
//     try {
//       const bookingDate = new Date(selectedBooking.Start_Time).toISOString().substring(0, 10); // YYYY-MM-DD
//       const fullStart = `${bookingDate}T${startTime}:00`;
//       const fullEnd = `${bookingDate}T${endTime}:00`;

//       await axios.put(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}`, {
//         Title: title,
//         Start_Time: fullStart,
//         End_Time: fullEnd,
//         User_ID: selectedBooking.User_ID,
//       }, { headers });

//       alert('Booking updated!');
//       setSelectedBooking(null);
//       window.location.reload();
//     } catch (err) {
//       console.error('Update error:', err);
//       alert('Failed to update booking.');
//     }
//   };

//   // Add participants
//   const handleAddParticipants = async () => {
//     const emails = participantEmails.split(',').map(e => e.trim()).filter(e => e);
//     try {
//       await axios.post(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}/participants`, {
//         email: emails.join(','),
//       }, { headers });

//       fetchParticipants(selectedBooking.Booking_ID);
//       setParticipantEmails('');
//     } catch (err) {
//       console.error('Error adding participants:', err);
//     }
//   };

//   // Remove a participant
//   const handleRemoveParticipant = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}/participants/${userId}`, { headers });
//       fetchParticipants(selectedBooking.Booking_ID);
//     } catch (err) {
//       console.error('Error removing participant:', err);
//     }
//   };

//   // Delete booking
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;

//     try {
//       await axios.delete(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}`, { headers });
//       alert('Booking deleted');
//       setSelectedBooking(null);
//       window.location.reload();
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Failed to delete booking.');
//     }
//   };

//   return (
//     <div className="edit-bookings-page">
//       <h2>Your Bookings</h2>
//       <ul>
//         {myBookings.map(booking => (
//           <li key={booking.Booking_ID}>
//             <strong>{booking.Title}</strong> — {new Date(booking.Start_Time).toLocaleString("en-IN", {
//   timeZone: "Asia/Kolkata"
// })}
//             <button onClick={() => handleEdit(booking)}>Edit</button>
//           </li>
//         ))}
//       </ul>

//       {selectedBooking && (
//         <div className="edit-form">
//           <h3>Edit Booking: {selectedBooking.Title}</h3>
//           <label>Title:</label>
//           <input value={title} onChange={(e) => setTitle(e.target.value)} />

//           <label>Start Time:</label>
//           <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

//           <label>End Time:</label>
//           <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

//           <button onClick={handleUpdate}>Update</button>
//           <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>Delete</button>

//           <h4>Participants</h4>
//           <ul>
//             {participants.map(p => (
//               <li key={p.User_ID}>
//                 {p.email || `User ${p.User_ID}`}
//                 <button onClick={() => handleRemoveParticipant(p.User_ID)} style={{ marginLeft: '10px' }}>Remove</button>
//               </li>
//             ))}
//           </ul>

//           <input
//             type="text"
//             placeholder="Add participants (comma-separated emails)"
//             value={participantEmails}
//             onChange={(e) => setParticipantEmails(e.target.value)}
//           />
//           <button onClick={handleAddParticipants}>Add Participants</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditBook;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditBook.css';

const EditBook = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participantEmails, setParticipantEmails] = useState('');
  const [participants, setParticipants] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userRes = await axios.get('http://localhost:3001/users/me', { headers });
        const userId = userRes.data.User_ID;

        // const bookingsRes = await axios.get('http://localhost:3001/bookings/my', { headers });
        // const owned = bookingsRes.data.filter(b => b.User_ID === userId);
        // setMyBookings(owned);
        const bookingsRes = await axios.get('http://localhost:3001/bookings/my', { headers });
        setMyBookings(bookingsRes.data);

        // console.log("My Bookings:", owned);

      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  const fetchParticipants = async (bookingId) => {
    try {
      const res = await axios.get(`http://localhost:3001/bookings/${bookingId}/participants`, { headers });

      const detailed = await Promise.all(
        res.data.map(async (p) => {
          try {
            const userRes = await axios.get(`http://localhost:3001/users/${p.User_ID}`, { headers });
            return { ...p, email: userRes.data.Email };
          } catch {
            return { ...p, email: 'Unknown' };
          }
        })
      );

      setParticipants(detailed);
    } catch (err) {
      console.error('Error fetching participants:', err);
    }
  };

  const convertToISTTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata"
    });
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setTitle(booking.Title);
    setStartTime(convertToISTTime(booking.Start_Time));
    setEndTime(convertToISTTime(booking.End_Time));
    fetchParticipants(booking.Booking_ID);
  };

  const buildISTDateTimeToUTC = (dateStr, timeStr) => {
    const [year, month, day] = dateStr.split("-");
    const [hours, minutes] = timeStr.split(":");
    const istDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    // Convert back from Asia/Kolkata offset (-5:30) to UTC
    istDate.setMinutes(istDate.getMinutes() - 330);
    return istDate.toISOString();
  };

  const handleUpdate = async () => {
    try {
      const dateStr = new Date(selectedBooking.Start_Time).toISOString().split("T")[0];
      const fullStart = buildISTDateTimeToUTC(dateStr, startTime);
      const fullEnd = buildISTDateTimeToUTC(dateStr, endTime);

      await axios.put(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}`, {
        Title: title,
        Start_Time: fullStart,
        End_Time: fullEnd,
        User_ID: selectedBooking.User_ID,
      }, { headers });

      alert('Booking updated!');
      setSelectedBooking(null);
      window.location.reload();
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update booking.');
    }
  };

  const handleAddParticipants = async () => {
    const emails = participantEmails.split(',').map(e => e.trim()).filter(e => e);
    try {
      console.log("Sending emails:", emails); // Should log an array like ["a@example.com", "b@example.com"]

      await axios.post(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}/participants`,
        {emails}, { headers });

      fetchParticipants(selectedBooking.Booking_ID);
      setParticipantEmails('');
    } catch (err) {
      console.error('Error adding participants:', err);
    }
  };

  const handleRemoveParticipant = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}/participants/${userId}`, { headers });
      fetchParticipants(selectedBooking.Booking_ID);
    } catch (err) {
      console.error('Error removing participant:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(`http://localhost:3001/bookings/${selectedBooking.Booking_ID}`, { headers });
      alert('Booking deleted');
      setSelectedBooking(null);
      window.location.reload();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete booking.');
    }
  };

  return (
    <div className="edit-bookings-page">
      <h2>Your Bookings</h2>
      <ul>
        {myBookings.map(booking => (
          <li key={booking.Booking_ID}>
            <strong>{booking.Title}</strong> —{" "}
            {new Date(booking.Start_Time).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata"
            })}
            <button onClick={() => handleEdit(booking)}>Edit</button>
          </li>
        ))}
      </ul>

      {selectedBooking && (
        <div className="edit-form">
          <h3>Edit Booking: {selectedBooking.Title}</h3>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Start Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

          <label>End Time:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>Delete</button>

          <h4>Participants</h4>
          <ul>
            {participants.map(p => (
              <li key={p.User_ID}>
                {p.email || `User ${p.User_ID}`}
                <button onClick={() => handleRemoveParticipant(p.User_ID)} style={{ marginLeft: '10px' }}>Remove</button>
              </li>
            ))}
          </ul>

          <input
            type="text"
            placeholder="Add participants (comma-separated emails)"
            value={participantEmails}
            onChange={(e) => setParticipantEmails(e.target.value)}
          />
          <button onClick={handleAddParticipants}>Add Participants</button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
