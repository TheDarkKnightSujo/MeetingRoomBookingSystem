import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/users/forgot-password', { email });
      setMessage('Reset link sent to your email!');
      console.log(response);
    } catch (error) {
      setMessage('Failed to send reset link. Please try again.',error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logincontents">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="a">
        <div className="login_page_text">
          <h2>Meeting Room Booking System</h2>
          <form className="form_imp" onSubmit={handleSubmit}>
            <div className="Username">
              <label>
                <h3 style={{ color: 'white' }}>Forgot Password</h3>
              </label>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login_button">
              <button type="submit" className="login_button" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
          {message && <p style={{ color: 'white' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
