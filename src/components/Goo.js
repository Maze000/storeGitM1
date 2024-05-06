import React from 'react';
import './css/goo.css';
const GoogleLoginButton = () => {
  const handleLogin = () => {
    
    window.location.href = '/auth/google';

  };

  return (
    <button onClick={handleLogin} className="google-login-button">
      Sign in with Google
    </button>

  );
};

export default GoogleLoginButton;
