import React, { useContext, useEffect, useMemo } from 'react';
import FormContext from './formContext/FormContext';
import './css/cantidadModal.css';
//import { Link } from 'react-router-dom';
const Cantidad = () => {
  const { formData, setFormData } = useContext(FormContext);
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

  const agregaEmail = () => {// revisar si esto se ejecuta en alguna parte
    const email = localStorage.getItem('email') || null;
    if (email != null) {
      setFormData(prev => ({ ...prev, ...{ email: email } }));
    }
    else {
      console.log('no se agrego email');
    }
  };

  return (
    <div className="container1a0">
      {formData.cantidadE.map((cantidad, index) => {
        if (cantidad >= 1) {
          const { imageURL, precio, descripcion } = formData.productosO[formData.idp[index]];
          const imagen = imageURL[0];

          return (
            <div key={index} className="cardctm">
              <div className="product-infocm">
                <div>
                  <img src={imagen} alt="Producto" />
                  <p>{descripcion}</p>
                  <p>${precio}</p>


                  <button className="buttona1x" id={index} onClick={eliminar}>Delete</button>

                </div>
              </div>
            </div>
          );
        }
        return null;
      })}



    </div>
  );

}

export default Cantidad;