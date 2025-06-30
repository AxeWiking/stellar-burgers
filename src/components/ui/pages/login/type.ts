import { PageUIPropsBase } from '../common-type';

export type LoginUIProps = PageUIPropsBase & {
  fields: {
    errorText: string | null;
    email: string;
    password: string;
  };
};
