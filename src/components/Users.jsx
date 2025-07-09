import React, { useState, useEffect } from "react";
import axios from "axios";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Role: "",
  });

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users", { headers });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchById = async () => {
    if (!selectedUserId) return;
    try {
      const res = await axios.get(`http://localhost:3001/users/${selectedUserId}`, { headers });
      setSelectedUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error fetching user by ID:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3001/users/${id}`, { headers });
      alert("User deleted");
      setUsers(users.filter((u) => u.User_ID !== id));
      if (selectedUser?.User_ID === id) setSelectedUser(null);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setForm({
      First_Name: user.First_Name,
      Last_Name: user.Last_Name,
      Email: user.Email,
      Role: user.Role,
    });
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${selectedUser.User_ID}`, form, { headers });
      alert("User updated");
      setEditMode(false);
      setSelectedUser(null);

      // Refresh user list
      const res = await axios.get("http://localhost:3001/users", { headers });
      setUsers(res.data);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="PageBackground">
      <div className="BookContents">
        <header className="head">
          <div className="brand">
            <img src="/logo.png" alt="Company Logo" className="logo" />
            <h1>All Users (Admin Panel)</h1>
          </div>
        </header>

        <div>
          <h3>Search User by ID</h3>
          <input
            type="number"
            placeholder="Enter User ID"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          />
          <button onClick={handleSearchById}>Search</button>
        </div>

        {selectedUser && !editMode && (
          <div>
            <h3>User Details (ID: {selectedUser.User_ID})</h3>
            <p>Name: {selectedUser.First_Name} {selectedUser.Last_Name}</p>
            <p>Email: {selectedUser.Email}</p>
            <p>Role: {selectedUser.Role}</p>
            <button onClick={() => handleEdit(selectedUser)}>Edit</button>
            <button onClick={() => handleDelete(selectedUser.User_ID)} style={{ color: "red", marginLeft: "10px" }}>
              Delete
            </button>
          </div>
        )}

        {editMode && (
          <div>
            <h3>Edit User</h3>
            <label>First Name:</label>
            <input value={form.First_Name} onChange={(e) => setForm({ ...form, First_Name: e.target.value })} />

            <label>Last Name:</label>
            <input value={form.Last_Name} onChange={(e) => setForm({ ...form, Last_Name: e.target.value })} />

            <label>Email:</label>
            <input value={form.Email} onChange={(e) => setForm({ ...form, Email: e.target.value })} />

            <label>Role:</label>
            <select value={form.Role} onChange={(e) => setForm({ ...form, Role: e.target.value })}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>

            <button onClick={handleUpdate}>Update</button>
          </div>
        )}

        <div>
          <h3>All Registered Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.User_ID} style={{ marginBottom: "10px" }}>
                <strong>{user.First_Name} {user.Last_Name}</strong> — {user.Email} ({user.Role})
                <button onClick={() => handleEdit(user)} style={{ marginLeft: "10px" }}>Edit</button>
                <button onClick={() => handleDelete(user.User_ID)} style={{ color: "red", marginLeft: "10px" }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
