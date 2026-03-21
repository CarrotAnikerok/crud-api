import type { Product } from "./product.js";

export class ProductModel {
    public productBase: Product[] = [];

    getProducts(): Product[] {
        return this.productBase;
    }

    getProductById(id: string): Product | undefined {
        return this.productBase.find((product: Product) => {
            product.id === id;
        })
    }

    addProduct(product: Product) {
        this.productBase.push(product);
    }
}