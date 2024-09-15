import type { ProductOrder } from "@interfaces/product-order";
import type { OrderStatus } from "@type/order-status";

export interface OrderData {
	client: string;
	products: ProductOrder[];
	total: number;
	status: OrderStatus;
}

export interface Order extends OrderData {
	code: string;
}
