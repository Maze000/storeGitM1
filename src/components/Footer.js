import React, { useState, useContext } from 'react';

import FormContext from './formContext/FormContext';
import './css/Footer.css';

function Footer({ urlSave }) {
  const { formData, setFormData } = useContext(FormContext);
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    setEmail('');
    e.preventDefault();

    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'contacto', email, subject: 'contacto', message: 'contacto' }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al enviar el mensaje');
        }
      })
      .then(data => {
        // setEmail('');
        console.log('mensaje entregado');
        alert(data.message);
      })
      .catch(error => {
        console.error('Hubo un error al enviar el mensaje', error);
        alert('error message');
      });
  };




  return (
    <div className="fprincipal">
      <div className="footer-elegant1a2b">
        <div className="footer-email-submit1b2c">
          <form onSubmit={handleSubmit} className="email-form3c4d">
            <div className="email-input4d5e">
              <label>@email</label>
              <input placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="submit-btn5e6f">Send</button>
              <div className="social-icons8k9l">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </form>
        </div>

        <div className="footer-payment6g7h">
          <div className="fa1" > we accept</div>
          <div className="credit-card-icons7h8i">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-discover"></i>
            <i className="fa-brands fa-cc-jcb"></i>
            <i className="fa-brands fa-cc-diners-club"></i>
          </div>
        </div>

        <div className="footer-copyright8i9j">
          <h6> © Copyright mazeaction 2024</h6>
        </div>
      </div>
    </div>


  );
}

export default Footer;