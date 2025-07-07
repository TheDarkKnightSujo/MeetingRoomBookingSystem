import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Locations.css";
import axios from 'axios';

const Locations = () => {
    const [rooms, setRooms] = useState([]);
    const [locations,setLocations]=useState([]);
    const [selectedLocationID,setSelectedLocationID]=useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:3001/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations :", error);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationClick = async (locationID) => {
    setSelectedLocationID(locationID);
    try {
      const response = await axios.get(`http://localhost:3001/locations/${locationID}/rooms`);
      setRooms(response.data);
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
          <label>Select a Location:</label>
          <ul>
          {locations.map((location) => (
            <li key={location.Location_ID} className="meetingRoomCards">
              <h4>{location.Name}</h4>
              <p>{location.Address}</p>
              <p>{location.City}</p>
              <p>{location.Postal_Code}</p>
              <button onClick={() => handleLocationClick(location.Location_ID)}>Check Rooms in this Location</button>
            </li>
          ))}
          </ul>
        </div>
          {rooms.length > 0 && (
          <div className="room-features">
            <h3>Rooms for Location ID: {selectedLocationID}</h3>
            <ul>
              {rooms.map((room) => (
                <li key={room.Room_ID}>
                  <h4>{room.Name}</h4>
                  <p>Description: {room.Description}</p>
                  <p>Capacity: {room.Capacity}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
    </div>
  );
};

export default Locations;
