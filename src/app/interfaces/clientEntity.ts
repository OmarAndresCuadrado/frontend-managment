import { billEntity } from './billEntity';
export class clientEntity {

    id: number;
    name: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    points: number;
    privilages: string;
    createAt: Date;
    bills: billEntity[];
}