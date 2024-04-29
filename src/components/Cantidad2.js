import React, { useContext, useEffect } from 'react';
import FormContext from './formContext/FormContext';
import './css/cantidad2.css';


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
        <div>


            {formData.cantidadE.map((a, index) => {
                if (a >= 1 || a === "") {
                    const imagen = formData.productosO[formData.idp[index]].imageURL[0];
                    const nombre = formData.productosO[formData.idp[index]].nombre;
                    const precio = formData.productosO[formData.idp[index]].precio;
                    const descripcion = formData.productosO[formData.idp[index]].descripcion;
                    const total = precio * a;
                    return (

                        <div key={index} className="productos-containera2a4">
                            <div className="p21a">
                                <p className="nombrea2">{nombre}</p>
                                <p className="precioa2">Precio: {precio}</p>
                                <p className="descripciona2">{descripcion}</p>
                                <img src={imagen} alt="Producto" className="imagen-productoa2" /><br />
                                <p>Units {formData.cantidadE[index]}</p>
                                <p className="totala2">Total: {total.toFixed(2)}</p>

                                <label className="cantidad-labela2">
                                    Amount
                                    <input
                                        id={index}
                                        type="number"
                                        value={formData.cantidadE[index]}
                                        onChange={handleCantidadChange}
                                        min="1"
                                        max="15"
                                        className="input-cantidada2"
                                    />
                                </label>
                            </div>
                        </div>);
                }
                return null;
            })}

        </div>
    )
};

export default Cantidad;