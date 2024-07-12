import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import LogoutButton from './LogoutButton';
import QuizGenerator from './QuizGenerator';
import CreateProfile from './CreateProfile';
import QuizHistory from './QuizHistory';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/user_details_by_token', {
        withCredentials: true
      });
      
      const userData = response.data.reduce((acc, item) => {
        acc[item.Name] = item.Value;
        return acc;
      }, {});

      setUserInfo(userData);
      await checkProfile();
    } catch (err) {
      console.error('Error fetching user info:', err);
      if (err.response && err.response.status === 401) {
        navigate('/');
      } else {
        setError('Failed to fetch user information. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkProfile = async () => {
    try {
      const profileResponse = await axios.get('http://localhost:8000/api/profile/me', {
        withCredentials: true
      });
      
      if (profileResponse.data) {
        setUserInfo(prevInfo => ({ ...prevInfo, ...profileResponse.data }));
      } else {
        setNeedsProfile(true);
      }
    } catch (err) {
      console.error('Error checking profile:', err);
      setNeedsProfile(true);
    }
  };

  const handleProfileCreated = async (language) => {
    try {
      const createProfileResponse = await axios.post('http://localhost:8000/api/profile/create', 
        { language }, 
        { withCredentials: true }
      );
      setUserInfo(prevInfo => ({ ...prevInfo, ...createProfileResponse.data }));
      setNeedsProfile(false);
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile. Please try again.');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading user information...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <div>
          {!needsProfile && (
            <button className="btn btn-primary me-2" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? 'Generate Quiz' : 'Quiz History'}
            </button>
          )}
          <LogoutButton />
        </div>
      </div>
      <UserInfo userInfo={userInfo} />
      {needsProfile ? (
        <CreateProfile onProfileCreated={handleProfileCreated} />
      ) : showHistory ? (
        <QuizHistory />
      ) : (
        <QuizGenerator />
      )}
    </div>
  );
};

export default Dashboard;