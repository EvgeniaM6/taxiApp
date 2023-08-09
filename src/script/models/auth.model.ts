export interface ISignInFormValues {
  e_mail: string;
  password: string;
}

export interface ISignUpFormValues extends ISignInFormValues {
  repeat_password: string;
}

export type TAuthState = {
  authToken: string;
};
