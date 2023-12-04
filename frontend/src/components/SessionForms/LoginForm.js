import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';
import './LoginForm.css'

function LoginForm ({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const [isDemoClicked, setIsDemoClicked] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isDemoClicked) {
      submitDemoCredentials();
    }
  }, [isDemoClicked]);

  const update = (field) => {
    return e => {
      if (field === 'email') {
        setEmail(e.currentTarget.value);
      } else if (field === 'password') {
        setPassword(e.currentTarget.value);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, password })); 
    if (res === "success") onSuccess();
    else return;
  }

  const submitDemoCredentials = async () => {
    const res = await dispatch(login({ email, password }));
    if (res === 'success') {
      onSuccess();
    }
  };

  const handleDemoUser = (e) => {
    setEmail('demo-user@appacademy.io');
    setPassword('password');
    handleSubmit(e);
    setIsDemoClicked(true);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className='login-form-content'>
        <div className='login-form-header'>
          <h2>👋🏼 Welcome back!</h2>
        </div>

        <label>
          <p className='field-label'>Email:</p>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email address"
            className='input-field'
          />
          <span className="errors">{errors?.email}</span>
        </label>

        <label>
          <p className='field-label'>Password:</p>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
            className='input-field'
          />
          <span className="errors">{errors?.password}</span>
        </label>

        <input
          type="submit"
          value="Login"
          disabled={!email || !password}
          className='submit-field'
        />

        <input
          type="submit"
          value="Demo User"
          onClick={handleDemoUser}
          className='submit-field'
        />
      </div>
    </form>
  );
}

export default LoginForm;