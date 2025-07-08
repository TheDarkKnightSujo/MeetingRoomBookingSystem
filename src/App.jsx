
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Book from './components/Book';
import Profile from'./components/Profile';
import MeetingRooms from './components/MeetingRooms';
import Locations from './components/Locations';
import VeiwInvitations from './components/ViewInvitations';
import EditBook from './components/EditBook';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard/>}/> 
      <Route path="/register" element={<Register/>}/>
      <Route path="/book" element={<Book/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/meetingrooms" element={<MeetingRooms/>}/>
      <Route path="/locations" element={<Locations/>}/>
      <Route path="/invitations" element={<VeiwInvitations/>}/>
      <Route path="/editbook" element={<EditBook/>}/>
    </Routes>
  );
}

export default App;
