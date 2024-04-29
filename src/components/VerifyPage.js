import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from './formContext/FormContext';

const VerifyPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {setFormData } = useContext(FormContext);

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    
    fetch('/verify', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token })})
    .then(response => response.json())
    .then(data => {
      if (data.token2) {

        localStorage.setItem('token4', data.token2);
        setMessage('Cuenta verificada con éxito. Redirigiendo...');
        setFormData(prev => ({ ...prev, ...{ LogoutValue: true } }));
        navigate('/form-1');
      } else {
        
        setMessage('No se pudo verificar la cuenta.');
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error durante la verificación:', error);
      setMessage('Error al verificar la cuenta.');
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Cargando...</div>;
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default VerifyPage;