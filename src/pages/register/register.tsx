import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from 'react-redux';
import {
  performRegisterUser,
  selectIsAuthorited,
  selectError
} from '../../slices/sliceUser';
import { AppDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authorithed = useSelector(selectIsAuthorited);
  const error = useSelector(selectError) || '';
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      performRegisterUser({
        email: email,
        name: userName,
        password: password
      })
    );
  };

  useEffect(() => {
    if (authorithed) {
      navigate('/');
    }
  }, [authorithed]);

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
