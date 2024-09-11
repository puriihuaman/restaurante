import { AsyncPipe, CurrencyPipe, JsonPipe, NgClass } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ErrorMessageComponent } from "@components/error-message/error-message.component";
import { OrderListComponent } from "@components/order-list/order-list.component";
import { Order } from "@interfaces/order";
import { OrderService } from "@services/order.service";
import type { Observable } from "rxjs";

@Component({
	selector: "app-order",
	standalone: true,
	imports: [
		FormsModule,
		AsyncPipe,
		JsonPipe,
		CurrencyPipe,
		RouterLink,
		NgClass,
		OrderListComponent,
		ErrorMessageComponent,
	],
	templateUrl: "./order.component.html",
	styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);

	public orders$!: Observable<Order[]>;
	public customerName: string = "";
	public selectedClient!: string;
	public order$!: Observable<Order | null>;
	public isSelected: boolean = false;

	ngOnInit(): void {
		this.orders$ = this.orderService.getAllOrders();
		this.order$ = this.orderService.getOrderSubject();
	}

	createNewOrder(): void {
		if (this.customerName.trim().length === 0) {
			console.log("Complete los campos");
			return;
		}

		const currentOrder: Order = {
			code: crypto.randomUUID(),
			client: this.customerName,
			products: [],
			total: 0,
		};
		this.orderService.addOrderToOrders(currentOrder);
		this.customerName = "";
	}

	selectOrder(orderCode: string): void {
		const selectedOrder: Order | undefined =
			this.orderService.getOrderByCode(orderCode);

		if (selectedOrder) {
			this.orderService.setOrderSubject(selectedOrder);
		}
	}

	deleteOrder(currentOrder: Order): void {
		if (currentOrder) {
			this.orderService.deleteOrder(currentOrder);
		}
	}
}
