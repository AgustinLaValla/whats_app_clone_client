import { IUser } from './user.interface'

export interface Room {
    name: string;
    ownerId: number | IUser;
    users: IUser[];
    id?: string;
    createdAt: string;
    roomPicture: any;
}