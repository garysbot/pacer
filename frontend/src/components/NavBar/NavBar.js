import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../../store/session';
import SignupForm from '../SessionForms/SignupForm';
import LoginForm from '../SessionForms/LoginForm';
import Modal from '../../context/Modal';
import "./NavBar.css"

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const [showModal, setShowModal] = useState(null); // Use null for no modal, 'signup' for signup, 'signin' for signin
  const [navOpacity, setNavOpacity] = useState(1);

  const openModal = (modalType) => {
    setShowModal(modalType);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleSignUpSuccess = () => {
    closeModal();
  };

  const handleSignInSuccess = () => {
    closeModal();
  };

  const handleScroll = () => {
    const newOpacity = Math.max(0.75 - window.scrollY / window.innerHeight, 0);
    setNavOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <>
      <div className='nav-container'>
        <div className='navbar' style={{ backgroundColor: `rgba(233, 88, 95, ${navOpacity})` }}>
          {/* Pacer Logo Home Link */}
          <Link to='/'><h1 className='logo'>Pacer</h1></Link>
          <Link to={'/discover'}><h3>Discover</h3></Link>
          <div id="nav-auth">
            {
              loggedIn ? (
                <>
                  <button onClick={logoutUser} className='auth-buttons'>Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => openModal('signup')} className="auth-buttons">
                    Sign Up
                  </button>
                  <button onClick={() => openModal('signin')} className="auth-buttons">
                    Login
                  </button>
                </>
              )
            }
            <Modal isOpen={showModal === 'signup'} onClose={closeModal}>
              <SignupForm onSuccess={handleSignUpSuccess} />
            </Modal>

            <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
              <LoginForm onSuccess={handleSignInSuccess} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;