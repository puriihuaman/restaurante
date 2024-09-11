import { AsyncPipe } from "@angular/common";
import { Component, inject, Input, type OnInit } from "@angular/core";
import { IconSVGComponent } from "@components/icon-svg/icon-svg.component";
import type { Order } from "@models/order";
import type { Product } from "@models/product";
import { OrderService } from "@services/order.service";
import type { ActionUser } from "@type/action-user";
import type { Observable } from "rxjs";

@Component({
	selector: "app-order-item",
	standalone: true,
	imports: [AsyncPipe, IconSVGComponent],
	templateUrl: "./order-item.component.html",
	styleUrl: "./order-item.component.scss",
})
export class OrderItemComponent implements OnInit {
	@Input() product!: Product;
	@Input() quantity!: number;

	private orderService: OrderService = inject(OrderService);
	public order$!: Observable<Order | null>;

	ngOnInit(): void {
		this.order$ = this.orderService.getOrderSubject();
	}

	handleAddOrder(
		currentOrder: Order,
		product: Product,
		action: ActionUser
	): void {
		this.orderService.addProductToOrder(currentOrder, product, 1, action);
	}

	handleRemoveProduct(
		currentOrder: Order,
		productId: string,
		action: ActionUser
	): void {
		this.orderService.removeProductFromOrder(
			currentOrder,
			productId,
			1,
			action
		);
	}
}
