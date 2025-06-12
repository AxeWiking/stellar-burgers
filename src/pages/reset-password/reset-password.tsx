import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { performResetPassword, selectError } from '../../slices/sliceUser';

export const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fields, handleChange] = useForm({
    errorText: useAppSelector(selectError),
    password: '',
    token: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(performResetPassword(fields)).then(() => {
      localStorage.removeItem('resetPassword');
      navigate('/login');
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      fields={fields}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
