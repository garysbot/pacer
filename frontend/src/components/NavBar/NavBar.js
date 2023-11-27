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

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);

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

  const handleSignUpSuccess = () => {
    closeSignUpModal();
  };

  const handleSignInSuccess = () => {
    closeSignInModal();
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
          <Link to='/'><h1>Pacer</h1></Link>
          <Link to={'/discover'}><h2>Discover</h2></Link>
          <div id="nav-auth">
            {
              loggedIn ? (
                <>
                  <button onClick={logoutUser} className='auth-buttons'>Logout</button>
                </>
              ) : (
                <>
                  <button onClick={openSignUpModal} className="auth-buttons">SIGN UP</button>
                  <button onClick={openSignInModal} className="auth-buttons">LOGIN</button>
                </>
              )
            }
            <Modal isOpen={showSignUpModal} onClose={closeSignUpModal}>
              <SignupForm onSuccess={handleSignUpSuccess} />
            </Modal>

            <Modal isOpen={showSignInModal} onClose={closeSignInModal}>
              <LoginForm onSuccess={handleSignInSuccess} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;