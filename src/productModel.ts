import type { Product } from "./product.js";
import { randomUUID } from 'crypto';

export class ProductModel {
    public productBase: Product[] = [];

    getProducts(): Product[] {
        return this.productBase;
    }

    getProductById(id: string): Product | undefined {
        return this.productBase.find((product: Product) => {
            return product.id === id;
        })
    }

    addProduct(product: Product): Product {
        if (!product.id) {
            product.id = randomUUID();
        }
        this.productBase.push(product);
        return product;
    }

    updateProduct(id: string, product: Product): boolean {
        const oldProduct: Product | undefined = this.getProductById(id);
        if (!oldProduct) {
            return false;
        }

        const {id:_, ...toCopy} = product;
        Object.assign(oldProduct, toCopy);

        return true;
    }

    deleteProduct(id: string): boolean {
        const product: Product | undefined = this.getProductById(id);
        if (!product) {
            return false;
        }

        const index = this.productBase.indexOf(product);
        if (index > -1) {
            this.productBase.splice(index, 1);
            return true;
        }

        return false;
    }
}