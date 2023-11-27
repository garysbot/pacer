import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./NavBar.css"
import SignupForm from '../SessionForms/SignupForm';
import LoginForm from '../SessionForms/LoginForm';
import { useState } from 'react';
import Modal from '../../context/Modal';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const getLinks = () => {
    const handleSignUpSuccess = () => {
      closeSignUpModal();
    };
  
    const handleSignInSuccess = () => {
      closeSignInModal();
    };

    if (loggedIn) {
      return (
        <nav className='navbar'>
          <Link to='/'><h1>Pacer</h1></Link>
          <Link to={'/discover'}><h2>Discover</h2></Link>
          <span onClick={logoutUser} className="auth-buttons">Logout</span>
        </nav>
      );
    } else {
      return (
        <nav className='navbar'>
          <Link to='/'><h1>Pacer</h1></Link>
          <Link to={'/discover'}><h2>Discover</h2></Link>
          <div id="nav-sign-in-and-sign-up">
            <span onClick={openSignUpModal} className="auth-buttons">Sign Up</span>
            <span>&nbsp;/&nbsp;</span>
            <span onClick={openSignInModal} className="auth-buttons">Log In</span>

            <Modal isOpen={showSignUpModal} onClose={closeSignUpModal}>
              <SignupForm onSuccess={handleSignUpSuccess} />
            </Modal>

            <Modal isOpen={showSignInModal} onClose={closeSignInModal}>
              <LoginForm onSuccess={handleSignInSuccess} />
            </Modal>
          </div>
        </nav>
      );
    }
  }

  return (
    <>
      <div id="nav">
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;