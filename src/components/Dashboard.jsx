import React ,{useState} from "react";
import "./dashboard.css";
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <>
    <div>
        <header>
            <div class="brand">
                <h1>Meeting Room Booker</h1>
            </div>
            <button class="logout-btn">Logout</button>
        </header>

    <aside class="sidebar">
        <ul>
        <li class="active">Dashboard</li>
        <li><Link>Book Meeting</Link></li>
        <li>Edit Booking</li>
        <li>Previous Meetings</li>
        {/* <li>Messages</li> */}
        </ul>
    </aside>

    <div>
    <section class="stats">
      <div class="card"><h3>Total Meeting</h3><p>120</p></div>
      <div class="card"><h3>Internships Posted</h3><p>15</p></div>
      <div class="card"><h3>Applications</h3><p>89</p></div>
      <div class="card"><h3>Messages</h3><p>12</p></div>
    </section>

    <section class="students">
      <div class="section-header">
        <h2>Student Applications</h2>
        <button class="post-btn">+ Post Internship</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Sneha Brahmane</td><td>sneha@example.com</td><td>Computer Engineering</td><td>Shortlisted</td></tr>
          <tr><td>Shravani Borji</td><td>shravani@example.com</td><td>IT</td><td>Applied</td></tr>
          <tr><td>Tanvi Kharade</td><td>tanvi@example.com</td><td>EXTC</td><td>Hired</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</div>
    </>
  );
};

export default Dashboard;
