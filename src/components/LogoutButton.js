import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL;

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, {
        withCredentials: true
      });
      navigate('/');
    } catch (err) {
      console.error('Error during logout:', err);
      if (err.response && err.response.status === 401) {
        navigate('/');
      }
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
  );
};

export default LogoutButton;