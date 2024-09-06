import { Component, inject, Input, type OnInit } from "@angular/core";
import type { Order } from "@models/order";
import type { Product } from "@models/product";
import { OrderService } from "@services/order.service";
import type { ActionUser } from "@type/action-user";

@Component({
	selector: "app-order-item",
	standalone: true,
	imports: [],
	templateUrl: "./order-item.component.html",
	styleUrl: "./order-item.component.scss",
})
export class OrderItemComponent implements OnInit {
	@Input() product!: Product;
	@Input() quantity!: number;

	private orderService: OrderService = inject(OrderService);

	ngOnInit(): void {}

	handleAddOrder(product: Product, action: ActionUser): void {
		this.orderService.addOrder(product, 1, action);
		this.orderService.changeTotalToPay = this.orderService.totalToPay;
	}

	handleRemoveProduct(productId: string): void {
		this.orderService.removeProduct(productId);
		this.orderService.changeTotalToPay = this.orderService.totalToPay;
	}
}
