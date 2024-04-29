import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import FormContext from './formContext/FormContext';
import './css/css1.css';
import HeaderModal from './HeaderModal';


function Header({ urlSave }) {
  const { formData, setFormData } = useContext(FormContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const prodTotalCantidad = formData.cantidadE.reduce((acumulado, actual) => acumulado + actual, 0);


  const handleClick = () => {
    setFormData(prev => ({ ...prev, urlRedirect: urlSave }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button className="menu-btn" onClick={toggleMenu}>
        &#9776;
      </button>
      <nav className="fixed-nav">
        <ul className={isMenuOpen ? 'show' : ''}>
          <li>
            <Link className="lh1" to="/form-1">Products</Link>
          </li>
          <li>
          {!formData.LogoutValue && <Link className="lh1" to="/login" onClick={handleClick}>Sign up</Link>}
          </li>
          <li className="lh12">
            {formData.LogoutValue && <LogoutButton />}
          </li>
          <div className="mi-componente-container">
            <li>
              <Link onClick={() => setModalIsOpen(true)}>{prodTotalCantidad}</Link>
            </li>
            {modalIsOpen && <HeaderModal closeModal={() => setModalIsOpen(false)} />}
          </div>
          <li>
            <Link className="lh1" to="/contact">Contact</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
}

export default Header;




