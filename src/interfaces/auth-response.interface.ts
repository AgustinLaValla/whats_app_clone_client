import { IUser } from './user.interface';

export interface AuthResponse {
  user:IUser;
  token:string;
}