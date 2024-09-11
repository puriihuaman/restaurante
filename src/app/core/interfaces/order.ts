import type { ProductOrder } from "@interfaces/product-order";

export interface Order {
	code: string;
	client: string;
	products: ProductOrder[];
	total: number;
}
