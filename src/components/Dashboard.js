import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import LogoutButton from './LogoutButton';
import QuizGenerator from './QuizGenerator';
import CreateProfile from './CreateProfile';
import QuizHistory from './QuizHistory';
import QnABoard from './QnABoard';


const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const [showQnABoard, setShowQnABoard] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/user_details_by_token`, {
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
      const profileResponse = await axios.get(`${API_URL}/api/profile/me`, {
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
      const createProfileResponse = await axios.post(`${API_URL}/api/profile/create`, 
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

  const handleShowDashboard = () => {
    setShowHistory(false);
    setShowQnABoard(false);
    setShowUserInfo(true);
  };
  
  const handleShowHistory = () => {
    setShowHistory(true);
    setShowQnABoard(false);
    setShowUserInfo(false);
  };
  
  const handleShowQnABoard = () => {
    setShowHistory(false);
    setShowQnABoard(true);
    setShowUserInfo(false);
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
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-md-3 col-lg-2 bg-dark min-vh-100">
          <div className="p-3">
            <div className="nav flex-column">
              <button className="btn btn-outline-light mb-2 text-start" onClick={handleShowDashboard}>
                <i className="bi bi-house-door me-2"></i> Dashboard
              </button>
              {!needsProfile && (
                <>
                  <button className="btn btn-outline-light mb-2 text-start" onClick={showHistory ? handleShowDashboard : handleShowHistory}>
                    <i className="bi bi-clock-history me-2"></i> {showHistory ? 'Back to Dashboard' : 'Quiz History'}
                  </button>
                  <button className="btn btn-outline-light mb-2 text-start" onClick={showQnABoard ? handleShowDashboard : handleShowQnABoard}>
                    <i className="bi bi-chat-dots me-2"></i> {showQnABoard ? 'Back to Dashboard' : 'Q&A Board'}
                  </button>
                </>
              )}
              <LogoutButton className="btn btn-outline-danger text-start" />
            </div>
          </div>
        </div>
        <div className="col-md-9 col-lg-10 p-4">
          {showUserInfo && <UserInfo userInfo={userInfo} />}
          {needsProfile ? (
            <CreateProfile onProfileCreated={handleProfileCreated} />
          ) : (
            <>
              {showQnABoard ? (
                <Suspense fallback={<div>Loading Q&A Board...</div>}>
                  <QnABoard />
                </Suspense>
              ) : (
                showHistory ? <QuizHistory /> : <QuizGenerator />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;