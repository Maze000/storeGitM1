import React, { useState, useEffect } from 'react';
import FormContext from './FormContext';

const ParentComponent = ({ children }) => {
  const estadoInicial = {
    imageDescription: '',
    inputName: 'Jhon',
    inputName2: '',
    imageURL: '',
    productoSeleccionado: '',
    inputFamily: 'Hug',
    inputPhone: '027764538',
    inputAddress: 'Sidney 351',
    tipoTarjeta: '',
    numeroTarjeta: '',
    nombreTarjeta: '',
    expiracion: '',
    cvc: '',
    email: '',
    nombre: '',
    precio: 1,
    precioA: '',
    envioPrecio: 6.99,
    cantidadA: '',
    cantidadA2: 0,
    urlRedirect: '',
    LogoutValue: false,
    sumatoria: 0,
    idp: [],
    cantidadE: [],
    idNewP: 0,
    productosO: [],
    productosPrecioT: [],
    nuevosTotales: [],
    sumaTotal: 0,
    pnombre :'',
  };

  if (!localStorage.getItem('formData')) {
    localStorage.setItem('formData', JSON.stringify(estadoInicial));
  }
 
  const [formData, setFormData] = useState(() => JSON.parse(localStorage.getItem('formData')));


  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);
  
  const restablecerAEstadoInicial = (aux) => {
    setFormData({...estadoInicial, LogoutValue: aux}); 
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, restablecerAEstadoInicial }}>
      {children}
    </FormContext.Provider>
  );
}

export default ParentComponent;
