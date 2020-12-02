export interface IUser {
    username: string;
    email: string;
    password: string;
    id?: number;
    createdAt: string;
    roomsOwned: any;
    roomsSubscribed: any;
    profilePic: any;
}