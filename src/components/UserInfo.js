import React from 'react';

const UserInfo = ({ userInfo }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h2 className="card-title">Welcome, {userInfo.name}!</h2>
      <p className="card-text">Email: {userInfo.email}</p>
      {userInfo.language && (
        <p className="card-text">Preferred Language: {userInfo.language}</p>
      )}
    </div>
  </div>
);

export default UserInfo;