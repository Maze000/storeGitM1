import React, { useContext } from 'react';
import FormContext from './formContext/FormContext';
import Footer from './Footer';
import Winmodal from './modal/Winmodal';
import PhotoGallery from './PhotoGallery';
import { Navigate } from 'react-router-dom';
import './css/fusion.css';
import Header from './Header';
const FormPageTwo = () => {
  const urlSave = '/form-2';
  const { formData } = useContext(FormContext);
  return (
    <div>
      {formData.cantidadE.length > 0 ? (
        <>

          <div>
            <Header urlSave={urlSave} />
            <div className="parentContainer1g">
              <PhotoGallery />
              <Winmodal /></div>
            <Footer />
          </div>

        </>
      ) : (
        <>
          <Navigate to="/form-1" />
        </>
      )}

    </div>
  );
};

export default FormPageTwo;

