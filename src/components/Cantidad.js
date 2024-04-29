import React, { useContext, useEffect, useMemo } from 'react';
import FormContext from './formContext/FormContext';
import './css/cantidad.css';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Cantidad = () => {

  const urlSave = '/form-3';
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const { nuevosTotales, sumaTotal } = useMemo(() => {
    const nuevosTotales = formData.cantidadE.map((cantidad, index) => {
      if (cantidad >= 1) {
        const precio = formData.productosO[formData.idp[index]].precio;
        return precio * cantidad;
      }
      return 0;
    });

    const sumaTotal = nuevosTotales.reduce((acumulado, actual) => acumulado + actual, 0);
    return { nuevosTotales, sumaTotal };
  }, [formData.cantidadE, formData.productosO, formData.idp]);


  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      productosPrecioT: nuevosTotales,
      sumaTotal
    }));
  }, [setFormData, nuevosTotales, sumaTotal]);

  const eliminar = (e) => {
    const indexButton = parseInt(e.target.id, 10);
    setFormData(prev => {
      const newCantidadE = [...prev.cantidadE];
      newCantidadE[indexButton] = 0;
      return { ...prev, cantidadE: newCantidadE };
    });
  };

  const agregaEmail = () => {




    setFormData(prev => ({ ...prev, urlRedirect: urlSave }));
    const email = localStorage.getItem('email') || null;
    if (email != null) {
      setFormData(prev => ({ ...prev, ...{ email: email } }));
      navigate('/form-4');
    }
    else {
      console.log('no se agrego email');
      navigate('/login');
    }
  };


  const handleCantidadChange = (e) => {
    const indexTarget = parseInt(e.target.id, 10);

    const nuevaCantidad = Number(e.target.value) || "";

    setFormData(prev => ({
      ...prev,
      cantidadE: formData.cantidadE.map((item, index) => {


        return index === indexTarget ? nuevaCantidad : item
      })
    }));

  };

  return (
    <div className="container3a3">
      {formData.cantidadE.map((cantidad, index) => {
        if (cantidad >= 1 || cantidad === "") {
          const { imageURL, nombre, precio, descripcion } = formData.productosO[formData.idp[index]];
          const imagen = imageURL[0];
          const total = precio * cantidad;

          return (
            <div key={index} className="card">


              <div className="product-info3a3">

                <div className="shadow1">
                  <div className="columna1awz">
                    <p>{nombre}</p>
                    <p>${precio}</p>
                    <img src={imagen} alt="Producto" />
                    <p>Units {formData.cantidadE[index]}</p>
                    <p>Total ${total.toFixed(2)}</p>
                    <button className="buttona1" id={index} onClick={eliminar}>Delete</button>
                  </div>
                </div>


                <label className="label21z">
                  Amount
                  <input
                    id={index}
                    type="number"
                    value={formData.cantidadE[index]}
                    onChange={handleCantidadChange}
                    min="1"
                    max="15"
                    className="input21z"
                  />
                </label>


                <div className="centrar">
                  <p>{descripcion}</p>
                </div>




              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="box31a">
        <p>Delivery ${formData.envioPrecio}</p>
        <p>Subtotal ${sumaTotal.toFixed(2)}</p>
        <span className="total1a3">
          Total Products ${(
            formData.cantidadE.some(cantidad => cantidad >= 1) ? formData.envioPrecio + sumaTotal : 0.00
          ).toFixed(2)}
        </span>
        <button className="buttona21" onClick={agregaEmail}>Buy</button></div>
    </div>
  );

};

export default Cantidad;

