import React from 'react';
import './css/face.css';
const FacebookLoginButton = () => {
  const handleLogin = () => {

    window.location.href = '/auth/facebook';
  };

  return (
    <button onClick={handleLogin} className="facebook-login-button">
      Login with Facebook
    </button>
  );
};

export default FacebookLoginButton;