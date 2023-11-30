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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ email, password })); 
    if (res === "success") onSuccess();
    else return;
  }

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
      </div>
    </form>
  );
}

export default LoginForm;