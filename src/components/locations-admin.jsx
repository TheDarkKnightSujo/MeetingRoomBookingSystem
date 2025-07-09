
// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "./Locations.css";

// const LocationsAdmin = () => {
//   const [locations, setLocations] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [selectedLocationID, setSelectedLocationID] = useState(null);
//   const [selectedLocationName, setSelectedLocationName] = useState("");
//   const [editingLocation, setEditingLocation] = useState(null);
//   const [newLocation, setNewLocation] = useState({
//     Name: "",
//     Address: "",
//     City: "",
//     Postal_Code: ""
//   });
//   const [newRoom, setNewRoom] = useState({
//     Name: "",
//     Description: "",
//     Capacity: ""
//   });

//   const headers = {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   };

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const fetchLocations = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/locations", { headers });
//       setLocations(response.data);
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//     }
//   };

//   const handleLocationClick = async (locationID, locationName) => {
//     setSelectedLocationID(locationID);
//     setSelectedLocationName(locationName);
//     try {
//       const response = await axios.get(`http://localhost:3001/locations/${locationID}/rooms`, { headers });
//       setRooms(response.data);
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//     }
//   };

//   const handleUpdateLocation = async () => {
//     try {
//       await axios.put(`http://localhost:3001/locations/${editingLocation.Location_ID}`, editingLocation, { headers });
//       alert("Location updated successfully");
//       setEditingLocation(null);
//       fetchLocations();
//     } catch (error) {
//       console.error("Update error:", error);
//     }
//   };

//   const handleDeleteLocation = async (locationID) => {
//     if (!window.confirm("Are you sure you want to delete this location?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/locations/${locationID}`, { headers });
//       alert("Location deleted successfully");
//       fetchLocations();
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   const handleAddLocation = async () => {
//     try {
//       await axios.post("http://localhost:3001/locations", newLocation, { headers });
//       alert("Location added successfully");
//       setNewLocation({ Name: "", Address: "", City: "", Postal_Code: "" });
//       fetchLocations();
//     } catch (error) {
//       console.error("Add location error:", error);
//     }
//   };

//   const handleAddMeetingRoom = async () => {
//     if (!selectedLocationID) {
//       alert("Select a location first.");
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:3001/locations/${selectedLocationID}/rooms`, {
//         ...newRoom,
//         Location_ID: selectedLocationID
//       }, { headers });
//       alert("Meeting room added");
//       setNewRoom({ Name: "", Description: "", Capacity: "" });
//       handleLocationClick(selectedLocationID, selectedLocationName);
//     } catch (error) {
//       console.error("Add room error:", error);
//     }
//   };

//   return (
//     <div className="PageBackground">
//       <div className="BookContents">
//         <header className="head">
//           <div className="brand">
//             <img src="/logo.png" alt="Company Logo" className="logo" />
//             <h1>Meeting Room Booking System</h1>
//             <h4>(Admin - Locations)</h4>
//           </div>
//         </header>

//         <h2>All Locations</h2>
//         <ul>
//           {locations.map((location) => (
//             <li key={location.Location_ID} className="meetingRoomCards">
//               {editingLocation && editingLocation.Location_ID === location.Location_ID ? (
//                 <>
//                   <input value={editingLocation.Name} onChange={(e) => setEditingLocation({ ...editingLocation, Name: e.target.value })} />
//                   <input value={editingLocation.Address} onChange={(e) => setEditingLocation({ ...editingLocation, Address: e.target.value })} />
//                   <input value={editingLocation.City} onChange={(e) => setEditingLocation({ ...editingLocation, City: e.target.value })} />
//                   <input value={editingLocation.Postal_Code} onChange={(e) => setEditingLocation({ ...editingLocation, Postal_Code: e.target.value })} />
//                   <button onClick={handleUpdateLocation}>Save</button>
//                   <button onClick={() => setEditingLocation(null)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <h4>{location.Name}</h4>
//                   <p>{location.Address}, {location.City} - {location.Postal_Code}</p>
//                   <button onClick={() => handleLocationClick(location.Location_ID, location.Name)}>View Rooms</button>
//                   <button onClick={() => setEditingLocation(location)}>Edit</button>
//                   <button style={{ color: "red" }} onClick={() => handleDeleteLocation(location.Location_ID)}>Delete</button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>

//         <h3>Add New Location</h3>
//         <input placeholder="Name" value={newLocation.Name} onChange={(e) => setNewLocation({ ...newLocation, Name: e.target.value })} />
//         <input placeholder="Address" value={newLocation.Address} onChange={(e) => setNewLocation({ ...newLocation, Address: e.target.value })} />
//         <input placeholder="City" value={newLocation.City} onChange={(e) => setNewLocation({ ...newLocation, City: e.target.value })} />
//         <input placeholder="Postal Code" value={newLocation.Postal_Code} onChange={(e) => setNewLocation({ ...newLocation, Postal_Code: e.target.value })} />
//         <button onClick={handleAddLocation}>Add Location</button>

//         {selectedLocationID && (
//           <div className="room-features">
//             <h3>Meeting Rooms at: {selectedLocationName}</h3>
//             <ul>
//               {rooms.map((room) => (
//                 <li key={room.Room_ID}>
//                   <h4>{room.Name}</h4>
//                   <p>{room.Description}</p>
//                   <p>Capacity: {room.Capacity}</p>
//                 </li>
//               ))}
//             </ul>

//             <h4>Add New Room</h4>
//             <input placeholder="Name" value={newRoom.Name} onChange={(e) => setNewRoom({ ...newRoom, Name: e.target.value })} />
//             <input placeholder="Description" value={newRoom.Description} onChange={(e) => setNewRoom({ ...newRoom, Description: e.target.value })} />
//             <input type="number" placeholder="Capacity" value={newRoom.Capacity} onChange={(e) => setNewRoom({ ...newRoom, Capacity: e.target.value })} />
//             <button onClick={handleAddMeetingRoom}>Add Room</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LocationsAdmin;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Locations.css";

const LocationsAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedLocationID, setSelectedLocationID] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocation, setNewLocation] = useState({
    Name: "",
    Address: "",
    City: "",
    Postal_Code: ""
  });
  const [newRoom, setNewRoom] = useState({
    Name: "",
    Description: "",
    Capacity: ""
  });

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/locations", { headers });
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleLocationClick = async (locationID, locationName) => {
    setSelectedLocationID(locationID);
    setSelectedLocationName(locationName);
    try {
      const response = await axios.get(`http://localhost:3001/locations/${locationID}/rooms`, { headers });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleUpdateLocation = async () => {
    try {
      await axios.put(`http://localhost:3001/locations/${editingLocation.Location_ID}`, editingLocation, { headers });
      alert("Location updated successfully");
      setEditingLocation(null);
      fetchLocations();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDeleteLocation = async (locationID) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    try {
      await axios.delete(`http://localhost:3001/locations/${locationID}`, { headers });
      alert("Location deleted successfully");
      fetchLocations();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleAddLocation = async () => {
    try {
      await axios.post("http://localhost:3001/locations", newLocation, { headers });
      alert("Location added successfully");
      setNewLocation({ Name: "", Address: "", City: "", Postal_Code: "" });
      fetchLocations();
    } catch (error) {
      console.error("Add location error:", error);
    }
  };

  const handleAddMeetingRoom = async () => {
    if (!selectedLocationID) {
      alert("Select a location first.");
      return;
    }
    try {
      await axios.post(`http://localhost:3001/locations/${selectedLocationID}/rooms`, {
        ...newRoom,
        Location_ID: selectedLocationID
      }, { headers });
      alert("Meeting room added");
      setNewRoom({ Name: "", Description: "", Capacity: "" });
      handleLocationClick(selectedLocationID, selectedLocationName);
    } catch (error) {
      console.error("Add room error:", error);
    }
  };

  return (
    <div className="PageBackground">
      <div className="BookContents">
        <header className="head">
          <div className="brand">
            <img src="/logo.png" alt="Company Logo" className="logo" />
            <h1>Meeting Room Booking System</h1>
            <h4>(Admin)</h4>
          </div>
        </header>

        <h2>All Locations</h2>
        <ul>
          {locations.map((location) => (
            <li key={location.Location_ID} className="meetingRoomCards">
              {editingLocation && editingLocation.Location_ID === location.Location_ID ? (
                <>
                  <input value={editingLocation.Name} onChange={(e) => setEditingLocation({ ...editingLocation, Name: e.target.value })} />
                  <input value={editingLocation.Address} onChange={(e) => setEditingLocation({ ...editingLocation, Address: e.target.value })} />
                  <input value={editingLocation.City} onChange={(e) => setEditingLocation({ ...editingLocation, City: e.target.value })} />
                  <input value={editingLocation.Postal_Code} onChange={(e) => setEditingLocation({ ...editingLocation, Postal_Code: e.target.value })} />
                  <button onClick={handleUpdateLocation}>Save</button>
                  <button onClick={() => setEditingLocation(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h4>{location.Name}</h4>
                  <p>{location.Address}, {location.City} - {location.Postal_Code}</p>
                  <button onClick={() => handleLocationClick(location.Location_ID, location.Name)}>View Rooms</button>
                  <button onClick={() => setEditingLocation(location)}>Edit</button>
                  <button style={{ color: "red" }} onClick={() => handleDeleteLocation(location.Location_ID)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>

        <h3>Add New Location</h3>
        <input placeholder="Name" value={newLocation.Name} onChange={(e) => setNewLocation({ ...newLocation, Name: e.target.value })} />
        <input placeholder="Address" value={newLocation.Address} onChange={(e) => setNewLocation({ ...newLocation, Address: e.target.value })} />
        <input placeholder="City" value={newLocation.City} onChange={(e) => setNewLocation({ ...newLocation, City: e.target.value })} />
        <input placeholder="Postal Code" value={newLocation.Postal_Code} onChange={(e) => setNewLocation({ ...newLocation, Postal_Code: e.target.value })} />
        <button onClick={handleAddLocation}>Add Location</button>

        {selectedLocationID && (
          <div className="room-features">
            <h3>Meeting Rooms at: {selectedLocationName}</h3>
            <ul>
              {rooms.map((room) => (
                <li key={room.Room_ID}>
                  <h4>{room.Name}</h4>
                  <p>{room.Description}</p>
                  <p>Capacity: {room.Capacity}</p>
                </li>
              ))}
            </ul>

            <h4>Add New Room</h4>
            <input placeholder="Name" value={newRoom.Name} onChange={(e) => setNewRoom({ ...newRoom, Name: e.target.value })} />
            <input placeholder="Description" value={newRoom.Description} onChange={(e) => setNewRoom({ ...newRoom, Description: e.target.value })} />
            <input type="number" placeholder="Capacity" value={newRoom.Capacity} onChange={(e) => setNewRoom({ ...newRoom, Capacity: e.target.value })} />
            <button onClick={handleAddMeetingRoom}>Add Room</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsAdmin;
