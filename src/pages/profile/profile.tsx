import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { selectUser, performUpdateUser } from '../../slices/sliceUser';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TRegisterData } from '../../utils/burger-api';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)!;

  const [formValue, setFormValue] = useState<Partial<TRegisterData>>(user);

  useEffect(() => {
    setFormValue((prevState) => ({ ...prevState, ...user }));
  }, [user]);

  const isFormChanged =
    (formValue?.name !== undefined && formValue?.name !== user?.name) ||
    (formValue?.email !== undefined && formValue?.email !== user?.email) ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(performUpdateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: undefined
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.length > 0 ? e.target.value : undefined
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
