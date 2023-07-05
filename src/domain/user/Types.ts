export interface IBodyData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IUserData {
  [key: string]: string;
}

export interface IUserExist {
  password: string;
}
