import { AsyncPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { OrderComponent } from "@components/order/order.component";
import type { Order } from "@models/order";
import { OrderService } from "@services/order.service";
import type { Observable } from "rxjs";

@Component({
	selector: "app-ticket",
	standalone: true,
	imports: [AsyncPipe, OrderComponent],
	templateUrl: "./ticket.component.html",
	styleUrl: "./ticket.component.scss",
})
export class TicketComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);
	public order!: Order;
	public total$!: Observable<number>;

	ngOnInit(): void {
		this.order = this.orderService.allOrder();
		this.total$ = this.orderService.calculatedTotalToPay;

		window.print();
	}
}
