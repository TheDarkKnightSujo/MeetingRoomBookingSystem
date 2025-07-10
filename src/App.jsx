
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
import ViewMinutes from './components/ViewMinutes';
import EditBook from './components/EditBook';
import PreviousMeetings from './components/PreviousMeetings';
import AdminDash from './components/AdminDash';
import MeetingRoomsAdmin from './components/meetingrooms-admin';
import LocationsAdmin from './components/locations-admin';
import Users from './components/Users';
import Bookings from './components/Bookings';
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
      <Route path="/minutes" element={<ViewMinutes/>}/>
      <Route path="/editbook" element={<EditBook/>}/>
      <Route path="/previous" element={<PreviousMeetings/>}/>
      <Route path="/admin" element={<AdminDash/>}/>
      <Route path="/meetingrooms-admin" element={<MeetingRoomsAdmin/>}/>
      <Route path="/locations-admin" element={<LocationsAdmin/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/bookings-admin" element={<Bookings/>}/>
    </Routes>
  );
}

export default App;
