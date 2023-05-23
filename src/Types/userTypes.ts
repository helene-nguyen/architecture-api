export type User = {
    id?: number;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string | undefined;
    password: string;
    avatar?: string;
    role: string;
};
  
export interface UserSchema {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    avatar: string;
  }