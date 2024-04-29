import React, { useContext, useEffect } from 'react';
import FormContext from './formContext/FormContext';
import { Link } from 'react-router-dom';
import Cantidad2 from './Cantidad2';
import HeadNext from './HeadNext';
import Footer2 from './Footer2';
import './css/cuatro.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const FormPageFour = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FormContext);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, ...{ [e.target.name]: e.target.value } }));
    
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/form-5');
  };
  return (

    <div>
      {formData.cantidadE.length > 0 ? (
        <> <div>
          <HeadNext />
          <div className="alineacion4">

            <div className="main-container1B2">


            <form onSubmit={handleSubmit}>

              <div className="form-wrapper6G7">
                <h1>Your details</h1>
                <div>
                  <label htmlFor="inputName" className="label-a8B3c">First name</label>
                  <input type="text" placeholder='First name' name="inputName" className="input-m2N4o" onChange={handleChange} value={formData.inputName} required/>

                  <label htmlFor="inputFamily" className="label-d4E5f">Last name</label>
                  <input type="text" placeholder='Last name' name="inputFamily" className="input-p5Q7r" onChange={handleChange} value={formData.inputFamily} required/>

                  <label htmlFor="inputPhone" className="label-g6H7i">Phone number</label>
                  <input type="text" placeholder='Phone number' name="inputPhone" className="input-s8T0v" onChange={handleChange} value={formData.inputPhone} required/>

                  <label htmlFor="inputAddress" className="label-j8K9l">Delivery address</label>
                  <input type="text" placeholder='Delivery address' name="inputAddress" className="input-w2X4z" onChange={handleChange} value={formData.inputAddress} required/>

                  <button type="submit" className="button-next5Y6U">Next</button>

                </div>
              </div>
              </form>
              <div className="quantity-wrapper4F5">

                <h1>Order summary</h1>
                <Cantidad2 />
                <div className="ultima4">

                  <p >Subtotal ${(formData.sumaTotal).toFixed(2)}</p>
                  <p >Delivery ${formData.envioPrecio}</p>

                  <p ><span className="totalpay">Total to pay ${(formData.envioPrecio + formData.sumaTotal).toFixed(2)}</span></p>
                  <p ><span className="allprices">All prices include GST</span></p>
                </div>

              </div>


            </div>

          </div>
          <Footer2 />
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

export default FormPageFour;