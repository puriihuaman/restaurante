import { AsyncPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { OrderListComponent } from "@components/order-list/order-list.component";
import type { Order } from "@models/order";
import { OrderService } from "@services/order.service";
import type { Observable } from "rxjs";

@Component({
	selector: "app-order",
	standalone: true,
	imports: [AsyncPipe, OrderListComponent],
	templateUrl: "./order.component.html",
	styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);
	public order!: Order;
	public total$!: Observable<number>;

	ngOnInit(): void {
		this.order = this.orderService.allOrder();
		// this.total = this.orderService.totalToPay;
		this.total$ = this.orderService.calculatedTotalToPay;
	}
}
