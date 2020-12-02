import { Room } from './room.interface';

export interface HttpRoomsResponse {
    ok: boolean;
    rooms: Room[]
}