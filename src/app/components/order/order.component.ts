import { AsyncPipe, CurrencyPipe, JsonPipe, NgClass } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OrderListComponent } from "@components/order-list/order-list.component";
import { Order } from "@models/order";
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
		NgClass,
		OrderListComponent,
	],
	templateUrl: "./order.component.html",
	styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);
	// public order!: Order | null;
	public total$!: Observable<number>;

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
		const currentOrder: Order = new Order(
			crypto.randomUUID(),
			this.customerName,
			[],
			0
		);
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
		this.orders$ = this.orderService.getAllOrders();
	}
}
