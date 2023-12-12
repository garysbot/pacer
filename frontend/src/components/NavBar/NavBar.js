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
  const loggedInUser = useSelector(state=>state.session.user)
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
          <div className='nav-logo'>
            <Link to='/'><h1 className='logo'>Pacer</h1></Link>
          </div>
          
          <div className='nav-links'>
            <h3 className='styled-link'><Link to={'/discover'}>Discover</Link></h3>
            <h3 className='styled-link'><Link to={'/about'}>About</Link></h3>
          </div>

          <div id="nav-auth">
            {
              loggedIn ? (
                <>
                  <Link to={`/users/${loggedInUser._id}`}>
                    <button className='auth-buttons'>Profile</button>
                  </Link>
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
          </div>

        </div>
      </div>
      <Modal isOpen={showModal === 'signup'} onClose={closeModal}>
        <SignupForm onSuccess={handleSignUpSuccess} />
      </Modal>

      <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
        <LoginForm onSuccess={handleSignInSuccess} />
      </Modal>
    </>
  );
}

export default NavBar;