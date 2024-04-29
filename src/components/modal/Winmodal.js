import React, { useState, useContext, useEffect } from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import FormContext from '../formContext/FormContext';
import './modal.css';
import '../css/fusion.css';

function Winmodal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formData, setFormData } = useContext(FormContext);

  const [cantidadActual, setCantidadActual] = useState(0);
  const [precio1] = useState(formData.precio);
  const [precioActual, setPrecioActual] = useState(formData.precio);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const openModal = () => {
    actualizarFormDataYRedirigir({ precioA: precioActual, cantidadA: cantidadActual })
    setIsModalOpen(true);
  };

  const actualizarFormDataYRedirigir = (nuevoValor) => {
    actualizarFormData(nuevoValor);
  };

  const actualizarFormData = (nuevoValor) => {
    setFormData(prev => ({ ...prev, ...nuevoValor }));
  };

  useEffect(() => {

    setFormData(prev => ({ ...prev, sumatoria: formData.cantidadA2, precioA: precioActual }));//esto no lo estoy usando, haora si para actualzar precio actual
  }, [precioActual]);

  const closeModal = () => setIsModalOpen(false);

  console.log('esto es sumatoria', formData.sumatoria);

  const handleNext = () => {
    if (cantidadActual >= 15) {
      return;
    }
    const nuevaCantidad = cantidadActual + 1;
    setCantidadActual(nuevaCantidad);
    setPrecioActual(nuevaCantidad * precio1);// cambio deprecio por precio1
    setFormData(prev => ({
      ...prev, ...{ cantidadA2: formData.sumatoria + nuevaCantidad }, cantidadE: formData.cantidadE.map((item, index) =>
        index === formData.idp.indexOf(formData.idNewP) ? item + 1 : item

      )
    }));

  };

  const handleBack = () => {
    if (cantidadActual === 1) {
      return;
    }
    const nuevaCantidad = cantidadActual - 1;
    setCantidadActual(nuevaCantidad);
    setPrecioActual(nuevaCantidad * precio1);
    setFormData(prev => ({
      ...prev, ...{ cantidadA2: formData.sumatoria + nuevaCantidad }, cantidadE: formData.cantidadE.map((item, index) =>
        index === formData.idp.indexOf(formData.idNewP) ? item - 1 : item
      )
    }));
  };

  const option = formData.productosO.find(item => item.id !== formData.idNewP);
  const { imageURL, precio, descripcion } = option ?? {};



  return (
    <div>
      <div className="info-container">
        <p>{formData.imageDescription}</p>
        <h1> ${formData.productosO[formData.idNewP].precio}</h1>
        <p>Subtotal ${(
          formData.cantidadE[formData.idp.indexOf(formData.idNewP)] >= 1 ? formData.precioA : 0.00).toFixed(2)
        }</p>
        <p>Delivey ${formData.envioPrecio}</p>
        <p><span className="total1a3">
          Total Products ${(
            formData.cantidadE[formData.idp.indexOf(formData.idNewP)] >= 1 ? formData.precioA + formData.envioPrecio : 0.00
          ).toFixed(2)}
        </span></p>

        <div className="buttons-container">
          <button onClick={handleBack}>-</button>
          <button onClick={openModal}>{formData.cantidadE[formData.idp.indexOf(formData.idNewP)]} add</button>
          <button onClick={handleNext}>+</button>
        </div>
      </div>

      {isModalOpen && (
        <Modal>
          <div >
            <h2 className="modalTitle">Item added to cart</h2>
            <p >You may also like</p>
            <div className="imgOption">
              <img className="option" src={imageURL[0]} />
              <div className="columna"><div>{descripcion}</div><h1>${precio}</h1></div>
            </div>
            <div className='split'>
              <Link className="modal-linkm1a" to="/form-3" onClick={closeModal} >
                GO TO CART
              </Link>

              <button className="btn1m" onClick={closeModal}>CONTINUE SHOPPING</button>

            </div>

          </div>
        </Modal>
      )}
    </div>
  );
}

export default Winmodal;


