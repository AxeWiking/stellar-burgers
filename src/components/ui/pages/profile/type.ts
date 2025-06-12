import { ChangeEvent, SyntheticEvent } from 'react';

export type ProfileUIProps = {
  formValue: Partial<{
    name: string;
    email: string;
    password: string;
  }>;
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
};
