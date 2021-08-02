import { productEntity } from './productEntity';
import { clientEntity } from './clientEntity';
export class businessEntity {

    id: number;
    name: string;
    address: string;
    phone: string;
    createAt: Date;
    products: productEntity[];
    clients: clientEntity[];

}