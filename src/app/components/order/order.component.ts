import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { OrderListComponent } from "@components/order-list/order-list.component";
import type { Order } from "@models/order";
import { OrderService } from "@services/order.service";
import type { Observable } from "rxjs";

@Component({
	selector: "app-order",
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, OrderListComponent],
	templateUrl: "./order.component.html",
	styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);
	public order!: Order | null;
	public total$!: Observable<number>;

	ngOnInit(): void {
		this.order = this.orderService.getCurrentOrder();
		this.total$ = this.orderService.calculatedTotalToPay;
	}

	deleteOrder(): void {
		this.orderService.deleteOrder();
	}
}
