import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Face from './Face';
import Goo from './Goo';
import FormContext from './formContext/FormContext';
import './css/signup.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer3 from './Footer3';
const SignupForm = () => {
  const { formData } = useContext(FormContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const urlSave = '/form-1';

  const signup = (email, password) => {
    setEmail('');
    setPassword('');
    
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        
        if (!response.ok) {
          alert('error');
          throw new Error('Error en la solicitud');
        }

        return response.json();
      })
      .then(data => {

        

        if(data.messageError){
          alert(data.messageError);
        }

        else{
        navigate('/');
        }
      })
      .catch(error => {
        console.error('Error en el registro:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    signup(email, password);
  };

  return (<div>
    <Header urlSave={urlSave} sumatoria={formData.sumatoria} />
    <div className="body-signup">
      <h1 className="h1a">SIGN UP</h1>
      <form onSubmit={handleSubmit} className="form-signup">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-signup input-placeholder-signup"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-signup input-placeholder-signup"
        />
        <button type="submit" className="button-signup">Sign Up</button>
        <Link to="/login"><button className="button-signup2" >you have an account</button></Link>
      </form>
      <div className="horizontal-line">

        <Face />

        <Goo /></div>
    </div>

    <Footer3 />
  </div>
  );

};

export default SignupForm;
