import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContext from './formContext/FormContext';
import './css/logout.css';
function LogoutButton() {
    const { restablecerAEstadoInicial } = useContext(FormContext);

    const navigate = useNavigate();
    const handleLogout = () => {

        fetch('/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response =>

                response.json())
            .then(data => {
                if (data.message) {

                    console.log('has salido', data.message);
                    localStorage.removeItem('formData');
                    localStorage.removeItem('token4');
                    console.log('se ha removido fomrData');
                    restablecerAEstadoInicial(false);

                    navigate('/form-1');

                } else {

                    throw new Error('Falló el cierre de sesión');
                }
            })
            .catch(error => {
                console.error('Error al intentar cerrar sesión:', error);
                alert('Error al intentar cerrar sesión');
            });
    };

    return (
        <button className="logout-button" onClick={handleLogout}>Sign off</button>

    );
}

export default LogoutButton;