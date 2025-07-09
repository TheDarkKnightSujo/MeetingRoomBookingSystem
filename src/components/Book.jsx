// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import "./Book.css";
// import axios from 'axios';

// const Book = () => {
//   const [rooms, setRooms] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedRoomID, setSelectedRoomID] = useState("");
//   const [availability, setAvailability] = useState([]);
//   const [participantEmails, setParticipantEmails] = useState("");
//   const [title, setTitle] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMeetingRooms = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/meeting-rooms");
//         setRooms(response.data);
//       } catch (error) {
//         console.error("Error fetching meeting rooms:", error);
//       }
//     };
//     fetchMeetingRooms();
//   }, []);

//   const handleRoomClick = async (roomID) => {
//     setSelectedRoomID(roomID);
//     try {
//       const response = await axios.get(`http://localhost:3001/meeting-rooms/${roomID}/availability?date=${selectedDate}`,{withCredentials:true});
//       setAvailability(response.data);
//     } catch (error) {
//       console.error("Error fetching availability:", error);
//     }
//   };

//   const handleBooking = async () => {
//   if (title.trim() === "" || !startTime || !endTime || !selectedRoomID || !selectedDate) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   const buildISTDateTime = (dateStr, timeStr) => {
//     const [year, month, day] = dateStr.split("-");
//     const [hours, minutes] = timeStr.split(":");
//     const localDate = new Date(year, month - 1, day, hours, minutes);
//     return localDate.toISOString(); // Still UTC format, but represents local IST time if inserted as-is
//   };

//   const start = buildISTDateTime(selectedDate, startTime);
//   const end = buildISTDateTime(selectedDate, endTime);

//   console.log("Booking Payload", {
//     title,
//     startTime: start,
//     endTime: end,
//     participants: participantEmails.split(",").map(email => email.trim()),
//   });

//   try {
//     await axios.post(`http://localhost:3001/meeting-rooms/${selectedRoomID}/bookings`, {
//       title,
//       startTime: start,
//       endTime: end,
//       participants: participantEmails.split(",").map(email => email.trim()),
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       },
//       withCredentials: true 
//     });

//     alert("Booking successful!");
//     setTitle("");
//     setStartTime("");
//     setEndTime("");
//     setAvailability([]);
//   } catch (error) {
//     alert(error.response?.data?.error || "Booking failed");
//   }
// };


//   return (
//     <div className="PageBackground">
//     <div className="BookContents">
//       <header className="head ">
//         <div className="brand">
//           <img src="/logo.png" alt="Company Logo" className="logo" />
//           <h1>Meeting Room Booking System</h1>
//         </div>
//         <button className="logout-btn">Logout</button>
//       </header>
//       <div>
//         <label>Select Date</label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => {
//             setSelectedDate(e.target.value);
//             setSelectedRoomID("");
//             setAvailability([]);
//           }}
//         />
//       </div>

//       {selectedDate && (
//         <div>
//           <label>Select a Room:</label>
//           {rooms.map((room) => (
//             <li key={room.Room_ID} className="meetingRoomCards">
//               <h4>{room.Name}</h4>
//               <p>{room.Description}</p>
//               <p>Capacity: {room.Capacity}</p>
//               <button onClick={() => handleRoomClick(room.Room_ID)}>Check Availability</button>
//             </li>
//           ))}
//         </div>
//       )}

//       {availability.length > 0 && (
//         <div className="availabilitySection">
//           <h3>Available Slots</h3>
//           {availability.map((slot, index) => (
//             <div
//               key={index}
//               className={`slot ${slot.isBooked ? "booked" : "available"}`}
//               onClick={() => {
//               if (!slot.isBooked) {
//                  const convertTo24 = (time12) => {
//                   const [time, modifier] = time12.split(" ");
//                   let [hours, minutes] = time.split(":");
//                   if (modifier === "PM" && hours !== "12") hours = parseInt(hours) + 12;
//                   if (modifier === "AM" && hours === "12") hours = "00";
//                 return `${String(hours).padStart(2, '0')}:${minutes}`;
//               };
//               setStartTime(convertTo24(slot.startTime));
//                 setEndTime(convertTo24(slot.endTime));
//               }
//             }}
//             >
//               {slot.startTime} – {slot.endTime} : {slot.isBooked ? "Booked" : "Available"}
//             </div>
//           ))}

//           <div className="bookingForm">
//                {selectedRoomID && (
//                      <div className="selected-room-name">
//                              <strong>Room:</strong>{" "}
//                               {rooms.find((room) => room.Room_ID === selectedRoomID)?.Name || "Unknown"}
//                      </div>
//                 )}

//             <input
//               type="text"
//               placeholder="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//             />
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//             />
//             <input
//               type="text"
//                placeholder="Participants (comma-separated emails)"
//               value={participantEmails}
//                 onChange={(e) => setParticipantEmails(e.target.value)}
//               />
//             <button onClick={handleBooking}>Book</button>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default Book;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Book.css";
import axios from 'axios';

const Book = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoomID, setSelectedRoomID] = useState("");
  const [availability, setAvailability] = useState([]);
  const [participantEmails, setParticipantEmails] = useState("");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/meeting-rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching meeting rooms:", error);
      }
    };
    fetchMeetingRooms();
  }, []);

  const handleRoomClick = async (roomID) => {
    setSelectedRoomID(roomID);
    try {
      const response = await axios.get(
        `http://localhost:3001/meeting-rooms/${roomID}/availability?date=${selectedDate}`,
        { withCredentials: true }
      );
      setAvailability(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const handleBooking = async () => {
    if (title.trim() === "" || !startTime || !endTime || !selectedRoomID || !selectedDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const buildISTDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split("-");
      const [hours, minutes] = timeStr.split(":");
      const localDate = new Date(year, month - 1, day, hours, minutes);
      return localDate.toISOString(); // UTC format for backend
    };

    const start = buildISTDateTime(selectedDate, startTime);
    const end = buildISTDateTime(selectedDate, endTime);

    try {
      await axios.post(
        `http://localhost:3001/meeting-rooms/${selectedRoomID}/bookings`,
        {
          title,
          startTime: start,
          endTime: end,
          participants: participantEmails.split(",").map(email => email.trim()).filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          withCredentials: true
        }
      );

      alert("Booking successful!");
      setTitle("");
      setStartTime("");
      setEndTime("");
      setParticipantEmails("");
      setAvailability([]);
    } catch (error) {
      alert(error.response?.data?.error || "Booking failed");
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

        <div>
          <label>Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedRoomID("");
              setAvailability([]);
            }}
          />
        </div>

        {selectedDate && (
          <div>
            <label>Select a Room:</label>
            {rooms.map((room) => (
              <li key={room.Room_ID} className="meetingRoomCards">
                <h4>{room.Name}</h4>
                <p>{room.Description}</p>
                <p>Capacity: {room.Capacity}</p>
                <button onClick={() => handleRoomClick(room.Room_ID)}>Check Availability</button>
              </li>
            ))}
          </div>
        )}

        {availability.length > 0 && (
          <div className="availabilitySection">
            <h3>Available Slots (24-hr IST)</h3>
            {availability.map((slot, index) => (
              <div
                key={index}
                className={`slot ${slot.isBooked ? "booked" : "available"}`}
                onClick={() => {
                  if (!slot.isBooked) {
                    setStartTime(slot.startTime);
                    setEndTime(slot.endTime);
                  }
                }}
              >
                {slot.startTime} – {slot.endTime} IST : {slot.isBooked ? "Booked" : "Available"}
              </div>
            ))}

            <div className="bookingForm">
              {selectedRoomID && (
                <div className="selected-room-name">
                  <strong>Room:</strong>{" "}
                  {rooms.find((room) => room.Room_ID === selectedRoomID)?.Name || "Unknown"}
                </div>
              )}

              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              <input
                type="text"
                placeholder="Participants (comma-separated emails)"
                value={participantEmails}
                onChange={(e) => setParticipantEmails(e.target.value)}
              />
              <button onClick={handleBooking}>Book</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;

