import { productEntity } from './productEntity';
export class itemsEntity {

    id: number;
    amount: number = 1;
    importe: number;
    product: productEntity;

    public calcularImporte(): number {
        return this.amount * this.product.price;
    }

}