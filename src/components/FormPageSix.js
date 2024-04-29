import React, { useContext, useEffect } from 'react';
import FormContext from './formContext/FormContext';
import { Link } from 'react-router-dom';
import Cantidad4 from './Cantidad4';
import './css/six.css';
import { Navigate } from 'react-router-dom';
const FormPageSix = () => {
  const { formData, restablecerAEstadoInicial } = useContext(FormContext);


  const cantidadCero = () => {

    restablecerAEstadoInicial(formData.LogoutValue);
    localStorage.removeItem('formData');
    <Navigate to="/form-1" />

  };

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {

    let isRequestSent = false;//because execute 2 times

    if (!isRequestSent) {

      fetch('/envioConfirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.inputName,
          email: formData.email,
          subject: 'compra en maze store',
          message: 'hola, haz echo una compra de productos'
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Error al enviar el mensaje');
          }
        })
        .then(data => {
          console.log('mensaje de confirmacion enviado');
          isRequestSent = true;

        })
        .catch(error => {
          console.error('Hubo un error al enviar el mensaje', error);
          alert('Error al enviar el mensaje');
        });
    }



    document.body.classList.add('pagina-especifica1');
    return () => {
      document.body.classList.remove('pagina-especifica1');
    };
  }, []);

  return (

    <div>

      {formData.cantidadE.length > 0 ? (
        <><div>

          <div className="agradecimiento-background-05 linea-divisoria-08">
            <div><h1 >Thanks for your purchase</h1>
              <h3 >you will receive an email shortly</h3></div>
          </div>




          <div className="div-general-01">


            <div className="seccion-background-11 linea-divisoria-08">
              <h1 className="titulo-principal-02">Order confirmation</h1>
              <p className="texto-estilo-12">{formData.inputPhone}</p>
              <p className="texto-estilo-12">Email {formData.email}</p>
            </div>

            <div className="seccion-background-11 linea-divisoria-08">
              <h2 className="subtitulo-03">Delivery information</h2>
              <p className="texto-estilo-12">{formData.inputAddress}</p>
              <p className="texto-estilo-12">{`Shipment $${formData.envioPrecio}`}</p>
            </div>

            <div className="seccion-background-11 linea-divisoria-08">
              <h2 className="subtitulo-03">Pay</h2>
              <p className="texto-estilo-12">{formData.numeroTarjeta}</p>
              <p className="texto-estilo-12">{formData.nombreTarjeta}</p>
              <p className="texto-estilo-12">{formData.expiracion}</p>
            </div>

            <div className="seccion-background-11 linea-divisoria-08">
              <h2 className="subtitulo-03">Order summary</h2>
              <Cantidad4 />
              <p >Delivery ${formData.envioPrecio}</p>
              <p className="texto-estilo-12">Total Products ${(formData.envioPrecio + formData.sumaTotal).toFixed(2)}</p>
            </div>

            <Link to="/form-1" className='link'>
              <button className="boton-volver-style-09 boton-volver-hover-10" onClick={cantidadCero}>Home</button>
            </Link>
          </div></div>

        </>
      ) : (
        <>
          <Navigate to="/form-1" />

        </>
      )}

    </div>


  );
}

export default FormPageSix;