import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from './formContext/FormContext';
import { jwtDecode } from 'jwt-decode';
const VerifyPage2 = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  useEffect(() => {

    fetch('/get-token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token4', data.token);
          const decodedToken = jwtDecode(data.token);
          setMessage('Cuenta verificada con éxito. Redirigiendo...');
          setFormData(prev => ({ ...prev, email: decodedToken.email, LogoutValue: true }));
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

export default VerifyPage2;