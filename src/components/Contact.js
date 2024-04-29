import React, { useState, useContext } from 'react';
import FormContext from './formContext/FormContext';
import './css/contacto.css';
import Header from './Header';
import Footer3 from './Footer3';
function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');


  const urlSave = '/form-1'
  const { formData, setFormData } = useContext(FormContext);

  const handleSubmit = (e) => {

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    e.preventDefault();

    fetch('/send-emailc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al enviar el mensaje');
        }
      })
      .then(data => {
        alert('success message');
      })
      .catch(error => {
        console.error('Hubo un error al enviar el mensaje', error);
        alert('error message');
      });
  };

  return (<div>

    <Header urlSave={urlSave} sumatoria={formData.sumatoria} />
    <div className="container-center">
      <div className="f1a2b3">
        <form onSubmit={handleSubmit}>
          <h2>Contact</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name" />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" />
          </div>
          <div>
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject" />
          </div>
          <div>
            <label>Menssage</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Menssage" />
          </div>
          <div className="boton-contenedor">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
    <Footer3 />
  </div>
  );
}

export default Contact;
