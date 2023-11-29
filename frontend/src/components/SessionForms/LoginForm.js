import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearSessionErrors } from '../../store/session';
import './LoginForm.css'

function LoginForm ({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
    onSuccess();
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className='login-form-header'>
        <h2>👋🏼 Welcome back!</h2>
      </div>

      <label>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email address"
          className='input-field'
        />
        <div className="errors">{errors?.email}</div>
      </label>

      <label>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
          className='input-field'
        />
        <div className="errors">{errors?.password}</div>
      </label>

      <input
        type="submit"
        value="Login"
        disabled={!email || !password}
        className='submit-field'
      />

    </form>
  );
}

export default LoginForm;