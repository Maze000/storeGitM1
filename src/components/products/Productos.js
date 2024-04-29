import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './productos.css';
function Productos({ formData, setFormData }) {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const urlSave = '/form-1';

  useEffect(() => {

    fetch('/productos')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('La solicitud ha fallado');
      })
      .then(data => {
        console.log('esto es data', data);
        setProductos(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);


  const actualizarFormDataYRedirigir = (nuevoValor, productoId) => {
    setFormData(prev => ({
      ...prev, ...nuevoValor,
      idp: prev.idp.includes(productoId) ? prev.idp : [...prev.idp, productoId], cantidadE: prev.idp.includes(productoId) ? prev.cantidadE : [...prev.cantidadE, 0]
    }));
    navigate('/form-2');
  };

  return (
    <div className="vitrina-productos">
      {productos.map((producto) => (
        <div key={producto.id} className="producton7">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p className="precio">Price ${producto.precio}</p>
          <img src={producto.imageURL[0]} alt={producto.nombre} />
          <button onClick={() => actualizarFormDataYRedirigir({ imageURL: producto.imageURL, precio: producto.precio, imageDescription: producto.descripcion, idNewP: producto.id, productosO: productos, pnombre: producto.nombre }, producto.id)}>Select</button>
        </div>
      ))}
    </div>

  );
}

export default Productos;
