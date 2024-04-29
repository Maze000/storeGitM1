import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormContext from './formContext/FormContext';
import Header from './Header';
import './css/login.css';
import Footer3 from './Footer3';
const LoginForm = () => {
  const { formData, setFormData , restablecerAEstadoInicial } = useContext(FormContext);
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = (email, password) => {
  setUsername('');
  setPassword('');
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {

        if (!response.ok) {
          alert("not valid");
          throw new Error('Error response.ok es !');

        }
        return response.json();
      })
      .then(data => {

        if(data.messageError){
          alert(data.messageError);
        }
       else{
        localStorage.setItem('token4', data.token);
        setFormData(prev => ({ ...prev, LogoutValue: true }));
        navigate(formData.urlRedirect);
       }

      })
      .catch(error => {

        console.error('Error en el inicio de sesión:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    console.log('correo guardado en local storage')
    login(email, password);
  };

  return (<div>
    <Header sumatoria={formData.sumatoria} />
    <div className="login-container">
      <h1 className="title">Login</h1>
      <h3 className="title">test data Email : m@m ; password : 123</h3>
      <form onSubmit={handleSubmit} className="form-login">
        <input
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="input-login"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-login"
        />
        <button type="submit" className="button-login">Login</button>
        <Link to="/signup">
          <button className="button-signup-link">You do not have an account</button>
        </Link>
      </form>
    </div>
    <Footer3 />
  </div>
  );

};

export default LoginForm;
