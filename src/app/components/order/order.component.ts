import { Component, inject, type OnInit } from "@angular/core";
import { OrderListComponent } from "@components/order-list/order-list.component";
import type { Order } from "@models/order";
import { OrderService } from "@services/order.service";

@Component({
	selector: "app-order",
	standalone: true,
	imports: [OrderListComponent],
	templateUrl: "./order.component.html",
	styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);
	public order!: Order;
	public total: number = 0;

	ngOnInit(): void {
		this.order = this.orderService.allOrder();
		this.total = this.orderService.totalToPay;
	}
}
