import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  performRegisterUser,
  selectIsAuthorited,
  selectError
} from '../../slices/sliceUser';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const authorithed = useAppSelector(selectIsAuthorited);
  const [fields, handleChange] = useForm({
    errorText: useAppSelector(selectError),
    email: '',
    name: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(performRegisterUser(fields));
  };

  useEffect(() => {
    if (authorithed) {
      navigate('/');
    }
  }, [authorithed]);

  return (
    <RegisterUI
      fields={fields}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
