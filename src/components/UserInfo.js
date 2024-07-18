import React from 'react';

const UserInfo = ({ userInfo }) => (
  <div className="card mb-4 shadow-sm bg-light text-dark">
    <div className="card-header">
      <h2 className="mb-0">User Profile</h2>
    </div>
    <div className="card-body">
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          <div className="bg-light rounded-circle p-3 mb-3 mb-md-0">
            <span className="h1 text-primary">{userInfo.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        <div className="col">
          <h3 className="card-title">Welcome, {userInfo.name}!</h3>
        </div>
      </div>
      <div className="row g-2">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                Email
              </h5>
              <p className="card-text">{userInfo.email}</p>
            </div>
          </div>
        </div>
        {userInfo.language && (
          <div className="col-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-translate me-2 text-primary"></i>
                  Preferred Language
                </h5>
                <p className="card-text">{userInfo.language}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default UserInfo;