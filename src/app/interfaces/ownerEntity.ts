import { businessEntity } from './businessEntity';
import { roleEntity } from './roleEntity';
export class ownerEntity {

    id: number;
    name: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    enabled: boolean;
    bussiness: businessEntity;
    role: roleEntity[];


}