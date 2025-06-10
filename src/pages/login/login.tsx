import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from 'react-redux';
import {
  performLoginUser,
  selectIsAuthorited,
  selectError
} from '../../slices/sliceUser';
import { AppDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authorithed = useSelector(selectIsAuthorited);
  const error = useSelector(selectError) || '';
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      performLoginUser({
        email: email,
        password: password
      })
    );
  };

  useEffect(() => {
    if (authorithed) {
      navigate(-1);
    }
  }, [authorithed]);

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
