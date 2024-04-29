import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import VerifyPage from './components/VerifyPage';
import VerifyPage2 from './components/VerifyPage2';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ParentComponent from './components/formContext/ParentComponent';
import PrivateRoute from '../auth/PrivateRoute';
import FormPageOne from './components/FormPageOne';
import FormPageTwo from './components/FormPageTwo';
import FormPageThree from './components/FormPageThree';
import FormPageFour from './components/FormPageFour';
import FormPageFive from './components/FormPageFive';
import FormPageSix from './components/FormPageSix';
import Contact from './components/Contact';
const App = () => {
  return (
    <div>

      <Router>
        <ParentComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify2" element={<VerifyPage2 />} />
            <Route path="/verify1" element={<VerifyPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/form-1" element={<FormPageOne />} />
            <Route path="/form-2" element={<FormPageTwo />} />
            <Route path="/form-3" element={<FormPageThree />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/form-4" element={<PrivateRoute><FormPageFour /></PrivateRoute>} />
            <Route path="/form-5" element={<PrivateRoute><FormPageFive /></PrivateRoute>} />
            <Route path="/form-6" element={<PrivateRoute><FormPageSix /></PrivateRoute>} />
          </Routes>
        </ParentComponent>
      </Router>
    </div>
  );
};

export default App;





