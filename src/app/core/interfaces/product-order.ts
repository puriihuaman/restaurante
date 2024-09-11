import type { Product } from "@interfaces/product";

export interface ProductOrder {
	product: Product;
	quantity: number;
}
