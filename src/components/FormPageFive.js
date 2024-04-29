import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, IbanElement, IdealBankElement, FpxBankElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import React, { useContext } from 'react';
import FormContext from './formContext/FormContext';
import { useNavigate } from 'react-router-dom';
import Cantidad3 from './Cantidad3';
import './css/cinco.css';
import { Navigate } from 'react-router-dom';
import HeadNext from './HeadNext';
import Footer2 from './Footer2';
const stripePromise = loadStripe(process.env.LOADSTRIPE_PUBLIC);

function CheckoutForm() {

  const { formData, setFormData } = useContext(FormContext);
  const stripe = useStripe();
  console.log(formData.inputName);
  console.log(formData.email);
  const navigate = useNavigate();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#424770",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "18px",
        fontWeight: "500",
        "::placeholder": {
          color: "#9BACC8",
        },
        ":-webkit-autofill": {
          color: "#fce883",
        },
      },
      invalid: {
        color: "#FF5A5F",
        iconColor: "#FF5A5F",
      },
    },
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,

      });

      if (error) {
        console.error(error.message);
        alert('Hubo un problema con tu solicitud de pago.');
      } else {

        const last4 = paymentMethod.card.last4;
        const expMonth = paymentMethod.card.exp_month;
        const expYear = paymentMethod.card.exp_year;

        setFormData(prev => ({ ...prev, numeroTarjeta: `**** **** ${last4}`, expiracion: `${expMonth}/${expYear}` }));

        const response = await fetch('/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: 2000 }),
        });

        const data = await response.json();

        if (data.success) {
          console.log('Pago exitoso');
          navigate('/form-6 ');
        } else {
          alert('Hubo un problema con tu pago. Por favor, intenta de nuevo.');
        }
      }
    } catch (err) {

      alert('Hubo un error al procesar tu pago. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div>

      {formData.cantidadE.length > 0 ? (
        <>
          <div>
            <HeadNext />
            <div className="contenedora4">

              <div className="seccion-derecha">

                <p className="direccion-entrega">Delivery address <span className="delivery">{formData.inputAddress}</span></p>
                <div className="backgroundP">
                  <form onSubmit={handleSubmit} className="stripe-form">

                    <div className="form-row">

                      <h1>Make a payment</h1>
                      <label htmlFor="card-element">We accept</label>
                      <div className="credit-card-icons">
                        <i className="fa-brands fa-cc-visa"></i>
                        <i className="fa-brands fa-cc-mastercard"></i>
                        <i className="fa-brands fa-cc-discover"></i>
                        <i className="fa-brands fa-cc-jcb"></i>
                        <i className="fa-brands fa-cc-diners-club"></i>
                      </div>
                    </div>

                    <div className="form-row">
                      <label>Name on card</label>
                      <h3>test data : visa</h3>
                      <input type="text" value={formData.nombreTarjeta || ''} onChange={(e) => setFormData(prev => ({ ...prev, nombreTarjeta: e.target.value }))} placeholder="Name of card" className="nameCard" />
                    </div>

                    <div className="form-row">
                      <label>Card Number</label>
                      <h3>test data : 4242424242424242</h3>
                      <CardNumberElement options={cardStyle} />
                    </div>

                    <div className="form-row">
                      <label>Expiry</label>
                      <h3>test data : 04/24</h3>
                      <CardExpiryElement options={cardStyle} />
                    </div>

                    <div className="form-row">
                      <label>CVC</label>
                      <h3>test data : 424</h3>
                      <div className="cvc-input-icon-wrapper">
                        <CardCvcElement options={cardStyle} />
                        <i className="fas fa-credit-card cvc-icon"></i>
                      </div>
                    </div>

                    <button className="btsa1" type="submit" disabled={!stripe}>
                      CONFIRM AND PAY
                    </button>
                    <div className="legalTerm"><p>The MazeAction is committed to respecting your privacy. By continuing you are accepting our
                      Terms and Conditions, Privacy Policy and Security & Payment.</p></div>
                  </form>
                </div>




              </div>
              <div className="linea"></div>


              <div className="seccion-izquierda2">
                <h1 className="ordenFinal">Order summary ready</h1>
                <Cantidad3 />
                <div className="precioFinal">


                  <p >Subtotal ${(formData.sumaTotal).toFixed(2)}</p>
                  <p >Delivery ${formData.envioPrecio}</p>

                  <p ><span className="totalpay">Total to pay ${(formData.envioPrecio + formData.sumaTotal).toFixed(2)}</span></p>
                  <p ><span className="allprices">All prices include GST</span></p>

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
}

function FormPageFive() {
  return (

    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>

  );
}

export default FormPageFive;

