import { PageUIPropsBase } from '../common-type';

export type ResetPasswordUIProps = PageUIPropsBase & {
  fields: {
    errorText: string | null;
    password: string;
    token: string;
  };
};
