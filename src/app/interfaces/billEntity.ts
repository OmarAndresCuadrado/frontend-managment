import { clientEntity } from './clientEntity';
import { itemsEntity } from './itemsEntity';
export class billEntity {

    id: number;
    description: string;
    observation: string;
    createAt: Date;
    total: number;
    items: itemsEntity[] = [];
    client: clientEntity;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: itemsEntity) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}