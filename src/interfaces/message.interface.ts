import { IUser } from './user.interface';

export interface IMessage {
    id?:number;
    message: string;
    roomId: string;
    sender: IUser;
    createdAt:string;
}