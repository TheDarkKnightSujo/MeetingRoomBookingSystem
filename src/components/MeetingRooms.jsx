import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./MeetingRooms.css";
import axios from 'axios';

const MeetingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [features,setFeatures]=useState([]);
  const [selectedRoomID,setSelectedRoomID]=useState([]);
  const [selectedRoomName,setSelectedRoomName]=useState([]);
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
      const response = await axios.get(`http://localhost:3001/meeting-rooms/${roomID}/features`);
      const responseRoom =await axios.get(`http://localhost:3001/meeting-rooms/${roomID}`);
      setSelectedRoomName(responseRoom.data.Name);
      setFeatures(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };



  return (
    <div className="PageBackground">
    <div className="BookContents">
      <header className="head ">
        <div className="brand">
          <img src="/logo.png" alt="Company Logo" className="logo" />
          <h1>Meeting Room Booking System</h1>
        </div>
      </header>
        <div>
          <label>Select a Room:</label>
          {rooms.map((room) => (
            <li key={room.Room_ID} className="meetingRoomCards">
              <h4>{room.Name}</h4>
              <p>{room.Description}</p>
              <p>Capacity: {room.Capacity}</p>
              <button onClick={() => handleRoomClick(room.Room_ID)}>Check Features</button>
            </li>
          ))}
        </div>
          {features.length > 0 && (
          <div className="room-features">
            <h3>Features for Room : {selectedRoomName}</h3>
            <ul>
              {features.map((feature) => (
                <li key={feature.Feature_ID}>
                  {feature.Name}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
    </div>
  );
};

export default MeetingRooms;
