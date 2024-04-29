import React, { useContext } from 'react';
import FormContext from './formContext/FormContext';
import Header from './Header';
import Cantidad from './Cantidad';
import Footer from './Footer';
import { Navigate } from 'react-router-dom';
const FormPageThree = () => {
  const urlSave = '/form-3';
  const { formData } = useContext(FormContext);

  return (
    <div>

      {formData.cantidadE.length > 0 ? (
        <>
          <Header urlSave={urlSave} />
          <Cantidad />
          <Footer />
        </>
      ) : (
        <>
          <Navigate to="/form-1" />
        </>
      )}
    </div>
  );
}

export default FormPageThree;

