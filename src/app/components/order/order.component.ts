import { AsyncPipe, CurrencyPipe, JsonPipe, NgClass } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ErrorMessageComponent } from "@components/error-message/error-message.component";
import { OrderListComponent } from "@components/order-list/order-list.component";
import { Order, type OrderData } from "@interfaces/order";
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
	private router: Router = inject(Router);

	public orders$!: Observable<Order[]>;
	public customerName: string = "";
	public selectedClient!: string;
	public order$!: Observable<Order | null>;
	public message: string = "";
	public hasError: boolean = false;

	ngOnInit(): void {
		this.orders$ = this.orderService.getAllOrders();
		this.order$ = this.orderService.getOrderSubject();
	}

	createNewOrder(): void {
		if (!this.customerName.trim()) {
			this.showErrorMessage("Debe agregar el nombre del cliente");
			return;
		}

		const currentOrder: OrderData = this.createOrder(this.customerName);
		this.orderService.addOrderToOrders(currentOrder);
		this.resetCustomerName();
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
			const response: boolean = window.confirm(
				"¿Estás seguro de que deseas eliminar el pedido?"
			);
			if (response) {
				if (currentOrder.products.length > 0) {
					console.log(
						"No se pudo eliminar. El pedido contiene una lista de productos"
					);
				} else {
					this.orderService.deleteOrder(currentOrder);
				}
			}
		}
	}

	generateTicket(_currentOrder: Order): void {
		const isChanged: boolean = this.orderService.changeOrderStatus(
			_currentOrder,
			"paid"
		);

		if (isChanged) {
			/**
			 *  TODO: Save to database
			 * función en el servicio que guarde el pedido con el estado pendiente,
			 * recuperar del localstorage
			 */
			this.router.navigate(["/boleta", _currentOrder.code]);
		}
	}

	private createOrder(_clientName: string): OrderData {
		return {
			client: _clientName,
			products: [],
			total: 0,
			status: "pending",
		};
	}

	private showErrorMessage(message: string): void {
		this.message = message;
		this.hasError = true;
		setTimeout((): boolean => (this.hasError = false), 2500);
	}

	private resetCustomerName(): void {
		this.customerName = "";
	}
}
