import type { Product } from "@models/product";

export interface ProductOrder {
	product: Product;
	quantity: number;
}
