import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN;

    const authUrl = `${cognitoDomain}/oauth2/authorize?client_id=${clientId}&response_type=code&scope=email+openid+profile+aws.cognito.signin.user.admin&redirect_uri=${redirectUri}`;
    
    window.location.href = authUrl;
    console.log(authUrl)
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ height: '30vh' }}>
      <div className="card shadow-sm bg-light text-dark" style={{ width: '18rem' }}>
        <div className="card-body text-center">
          <h5 className="card-title mb-4">Welcome</h5>
          <p className="card-text mb-4">Please login to continue</p>
          <button className="btn btn-outline-dark btn-lg w-100" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>

  );
};

export default LoginButton;