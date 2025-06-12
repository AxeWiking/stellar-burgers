import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { performLoginUser, selectError } from '../../slices/sliceUser';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [fields, handleChange] = useForm({
    errorText: useAppSelector(selectError),
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(performLoginUser(fields));
  };

  return (
    <LoginUI
      fields={fields}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
