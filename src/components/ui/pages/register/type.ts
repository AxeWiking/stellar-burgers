import { PageUIPropsBase } from '../common-type';

export type RegisterUIProps = PageUIPropsBase & {
  fields: {
    errorText: string | null;
    name: string,
    email: string,
    password: string 
  };
};

