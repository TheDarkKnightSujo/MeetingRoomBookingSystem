// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import "./MeetingRooms.css";
// import axios from 'axios';

// const MeetingRoomsAdmin = () => {
//   const [rooms, setRooms] = useState([]);
//   const [features,setFeatures]=useState([]);
//   const [selectedRoomID,setSelectedRoomID]=useState([]);
//   const [selectedRoomName,setSelectedRoomName]=useState([]);
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
//       const response = await axios.get(`http://localhost:3001/meeting-rooms/${roomID}/features`);
//       const responseRoom =await axios.get(`http://localhost:3001/meeting-rooms/${roomID}`);
//       setSelectedRoomName(responseRoom.data.Name);
//       setFeatures(response.data);
//     } catch (error) {
//       console.error("Error fetching availability:", error);
//     }
//   };



//   return (
//     <div className="PageBackground">
//     <div className="BookContents">
//       <header className="head ">
//         <div className="brand">
//           <img src="/logo.png" alt="Company Logo" className="logo" />
//           <h1>Meeting Room Booking System</h1>
//           <h4>(Admin)</h4>
//         </div>
//       </header>
//         <div>
//           <label>List of Meeting Rooms:</label>
//           {rooms.map((room) => (
//             <li key={room.Room_ID} className="meetingRoomCards">
//               <h4>{room.Name}</h4>
//               <p>{room.Description}</p>
//               <p>Capacity: {room.Capacity}</p>
//               <button onClick={() => handleRoomClick(room.Room_ID)}>Check Features</button>
//             </li>
//           ))}
//         </div>
//           {features.length > 0 && (
//           <div className="room-features">
//             <h3>Features of a Room : {selectedRoomName}</h3>
//             <ul>
//               {features.map((feature) => (
//                 <li key={feature.Feature_ID}>
//                   {feature.Name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//     </div>
//     </div>
//   );
// };

// export default MeetingRoomsAdmin;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MeetingRooms.css";

const MeetingRoomsAdmin = () => {
  const [rooms, setRooms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedRoomID, setSelectedRoomID] = useState(null);
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [editRoom, setEditRoom] = useState(null);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [selectedFeatureToMap, setSelectedFeatureToMap] = useState('');

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch all rooms and features
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [roomsRes, featuresRes] = await Promise.all([
          axios.get("http://localhost:3001/meeting-rooms", { headers }),
          axios.get("http://localhost:3001/room-features", { headers }),
        ]);
        setRooms(roomsRes.data);
        setFeatures(featuresRes.data);
      } catch (error) {
        console.error("Error loading rooms or features:", error);
      }
    };
    fetchAll();
  }, []);

  const fetchRoomDetails = async (roomID) => {
    try {
      const [featuresRes, roomRes] = await Promise.all([
        axios.get(`http://localhost:3001/meeting-rooms/${roomID}/features`, { headers }),
        axios.get(`http://localhost:3001/meeting-rooms/${roomID}`, { headers }),
      ]);
      setSelectedRoomID(roomID);
      setSelectedRoomName(roomRes.data.Name);
      setRoomFeatures(featuresRes.data);
      setEditRoom(roomRes.data);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const handleUpdateRoom = async () => {
    try {
      await axios.put(`http://localhost:3001/meeting-rooms/${selectedRoomID}`, editRoom, { headers });
      alert("Room updated!");
      window.location.reload();
    } catch (err) {
      console.error("Error updating room:", err);
      alert("Failed to update room.");
    }
  };

  const handleDeleteRoom = async (roomID) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await axios.delete(`http://localhost:3001/meeting-rooms/${roomID}`, { headers });
      alert("Room deleted.");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting room:", err);
      alert("Failed to delete room.");
    }
  };

  const handleAddFeature = async () => {
    if (!newFeatureName) return;
    try {
      await axios.post("http://localhost:3001/room-features", { Name: newFeatureName }, { headers });
      alert("Feature added!");
      setNewFeatureName('');
      const res = await axios.get("http://localhost:3001/room-features", { headers });
      setFeatures(res.data);
    } catch (err) {
      console.error("Error adding feature:", err);
    }
  };

  const handleDeleteFeature = async (featureID) => {
    if (!window.confirm("Delete this feature?")) return;
    try {
      await axios.delete(`http://localhost:3001/features/${featureID}`, { headers });
      alert("Feature deleted.");
      const res = await axios.get("http://localhost:3001/room-features", { headers });
      setFeatures(res.data);
    } catch (err) {
      console.error("Error deleting feature:", err);
    }
  };

  const handleMapFeature = async () => {
    if (!selectedFeatureToMap) return;
    try {
      await axios.post(
        `http://localhost:3001/meeting-rooms/${selectedRoomID}/features/map`,
        { Feature_ID: parseInt(selectedFeatureToMap) },
        { headers }
      );
      alert("Feature mapped!");
      fetchRoomDetails(selectedRoomID);
    } catch (err) {
      console.error("Error mapping feature:", err);
    }
  };

  const handleUnmapFeature = async (featureID) => {
    try {
      await axios.delete(
        `http://localhost:3001/meeting-rooms/${selectedRoomID}/features/${featureID}`,
        { headers }
      );
      alert("Feature unmapped.");
      fetchRoomDetails(selectedRoomID);
    } catch (err) {
      console.error("Error unmapping feature:", err);
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

        <h2>Meeting Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.Room_ID} className="meetingRoomCards">
              <h4>{room.Name}</h4>
              <p>{room.Description}</p>
              <p>Capacity: {room.Capacity}</p>
              <button onClick={() => fetchRoomDetails(room.Room_ID)}>Edit / Manage Features</button>
              <button onClick={() => handleDeleteRoom(room.Room_ID)} style={{ color: "red", marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        {editRoom && (
          <div className="edit-room-form">
            <h3>Edit Room: {selectedRoomName}</h3>
            <label>Name:</label>
            <input value={editRoom.Name} onChange={(e) => setEditRoom({ ...editRoom, Name: e.target.value })} />
            <label>Description:</label>
            <input value={editRoom.Description} onChange={(e) => setEditRoom({ ...editRoom, Description: e.target.value })} />
            <label>Capacity:</label>
            <input type="number" value={editRoom.Capacity} onChange={(e) => setEditRoom({ ...editRoom, Capacity: parseInt(e.target.value) })} />
            <button onClick={handleUpdateRoom}>Update Room</button>

            <h4>Mapped Features</h4>
            <ul>
              {roomFeatures.map((f) => (
                <li key={f.Feature_ID}>
                  {f.Name}
                  <button onClick={() => handleUnmapFeature(f.Feature_ID)} style={{ marginLeft: "10px" }}>
                    Unmap
                  </button>
                </li>
              ))}
            </ul>

            <label>Map a New Feature:</label>
            <select onChange={(e) => setSelectedFeatureToMap(e.target.value)} value={selectedFeatureToMap}>
              <option value="">--Select Feature--</option>
              {features.map((f) => (
                <option key={f.Feature_ID} value={f.Feature_ID}>
                  {f.Name}
                </option>
              ))}
            </select>
            <button onClick={handleMapFeature}>Map Feature</button>
          </div>
        )}

        <div style={{ marginTop: "30px" }}>
          <h3>Add New Feature</h3>
          <input
            type="text"
            placeholder="Feature name"
            value={newFeatureName}
            onChange={(e) => setNewFeatureName(e.target.value)}
          />
          <button onClick={handleAddFeature}>Add Feature</button>

          <h4>All Features</h4>
          <ul>
            {features.map((f) => (
              <li key={f.Feature_ID}>
                {f.Name}
                <button onClick={() => handleDeleteFeature(f.Feature_ID)} style={{ marginLeft: "10px", color: "red" }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomsAdmin;
