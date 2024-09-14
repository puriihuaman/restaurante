import type { ProductOrder } from "@interfaces/product-order";
import type { OrderStatus } from "@type/order-status";

export interface Order {
	code: string;
	client: string;
	products: ProductOrder[];
	total: number;
	status: OrderStatus;
}
