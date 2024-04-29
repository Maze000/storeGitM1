import React, { useContext, useEffect } from 'react';
import FormContext from './formContext/FormContext';
import './css/cantidad3.css';


const Cantidad = () => {

  const { formData, setFormData } = useContext(FormContext);


  useEffect(() => {
    const nuevosTotales = formData.cantidadE.map((cantidad, index) => {
      if (cantidad >= 1) {
        const precio = formData.productosO[formData.idp[index]].precio;
        return precio * cantidad;
      }
      return 0;
    });

    const sumaTotal = nuevosTotales.reduce((acumulado, actual) => acumulado + actual, 0);


    setFormData(prev => ({
      ...prev,
      productosPrecioT: [...nuevosTotales], sumaTotal: sumaTotal
    }));
  }, [formData.cantidadE, formData.productosO, formData.idp]);

  return (
    <div>

      {formData.cantidadE.map((a, index) => {
        if (a >= 1) {
          const imagen = formData.productosO[formData.idp[index]].imageURL[0];
          const nombre = formData.productosO[formData.idp[index]].nombre;
          const precio = formData.productosO[formData.idp[index]].precio;
          const descripcion = formData.productosO[formData.idp[index]].descripcion;
          const total = precio * a;

          return (
            <div key={index} className="producto3">
              <p className="nombre3">{nombre}</p>
              <p className="precio3">${precio}</p>
              <p>Units {formData.cantidadE[index]}</p>
              <img src={imagen} alt="Producto" className="imagenProducto3" /><br />
              <p className="total3">Total ${total.toFixed(2)}</p>
            </div>
          )
        }
        return null;
      })}
    </div>
  );
}

export default Cantidad;