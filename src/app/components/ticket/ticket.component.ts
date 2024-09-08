import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { OrderComponent } from "@components/order/order.component";
import type { Order } from "@models/order";
import { OrderService } from "@services/order.service";

@Component({
	selector: "app-ticket",
	standalone: true,
	imports: [AsyncPipe, JsonPipe, OrderComponent],
	templateUrl: "./ticket.component.html",
	styleUrl: "./ticket.component.scss",
})
export class TicketComponent implements OnInit {
	private storageName: string = "PURI_ORDERS";
	private orderService: OrderService = inject(OrderService);
	public currentOrder!: Order;

	ngOnInit(): void {}
}
