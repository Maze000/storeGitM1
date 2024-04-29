import React, { useContext} from 'react';
import './css/css1.css';
import CantidadModal from './CantidadModal';
import { Link } from 'react-router-dom';
import FormContext from './formContext/FormContext';
function HeaderModal({ closeModal }) {
  const { formData} = useContext(FormContext);

    return (
      <div className="modal-overlay">
        <div className="modal-contenta01">
          <CantidadModal />
          <div className = "total-estimado"><p>Total estimated: ${(formData.sumaTotal).toFixed(2)}</p></div>
          <div className = "base1">  <button onClick={closeModal} className="close-modal-buttona1">Close</button>
          <Link to="/form-4" className="close-modal-buttona1">Buy</Link></div>
        </div>
      </div>
    );
  }

  export default HeaderModal;