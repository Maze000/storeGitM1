import React, { useContext, useEffect } from 'react';
import FormContext from './formContext/FormContext';
import Productos from './products/Productos';
import Header from './Header';
import Footer from './Footer';

const FormPageOne = () => {
  const urlSave = '/form-1';
  const { formData, setFormData } = useContext(FormContext);

  useEffect(() => {
    setFormData(prev => ({ ...prev, urlRedirect: urlSave }));
  }, []);

  return (
    <div>
      <Header urlSave={urlSave} sumatoria={formData.sumatoria} />
      <Productos formData={formData} setFormData={setFormData} />
      <Footer />
    </div>
  );
}

export default FormPageOne;
