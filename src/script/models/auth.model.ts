export interface ISignInFormValues {
  email: string;
  password: string;
}

export interface ISignUpFormValues extends ISignInFormValues {
  repeat_password: string;
  prefix: string;
  phone: string;
  name: string;
}

export type TAuthState = {
  userId: string;
};

export type TUserData = {
  userId: string;
  email: string;
  name: string;
  phone: string;
};

export type TNewUserData = {
  [key: string]: string;
};
