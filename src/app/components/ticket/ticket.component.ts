import { AsyncPipe, CurrencyPipe, DatePipe, NgClass } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderComponent } from "@components/order/order.component";
import type { Order } from "@interfaces/order";
import { OrderService } from "@services/order.service";

@Component({
	selector: "app-ticket",
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, NgClass, DatePipe, OrderComponent],
	templateUrl: "./ticket.component.html",
	styleUrl: "./ticket.component.scss",
})
export class TicketComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);
	private route: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private orderCode: Order["code"] | null = null;

	public currentOrder!: Order;
	public currentDate!: Date;
	public toPrint: boolean = false;

	ngOnInit(): void {
		this.orderCode = this.route.snapshot.paramMap.get("code");

		if (this.orderCode !== null) {
			const existingOrder: Order | undefined =
				this.orderService.verifyExistenceOfTheOrder(this.orderCode);

			if (existingOrder) {
				this.currentOrder = existingOrder;

				this.currentDate = new Date();
			} else {
				this.returnHome();
			}
		}
	}

	public printTicket(): void {
		this.toPrint = true;

		setTimeout((): void => {
			/**
			 *  TODO: Save to database
			 * función en el servicio que guarde el pedido con el estado completado,
			 * recuperar del localstorage
			 */
			this.completeOrder();

			this.toPrint = false;
			window.print();
		}, 200);
	}

	public returnHome(): void {
		this.router.navigate(["/"]);
	}

	private completeOrder() {
		/**
		 * TODO: Arrojar una alerta de que el pedido fue completado
		 */
		let isChanged: boolean = this.orderService.changeOrderStatus(
			this.currentOrder,
			"completed"
		);
	}
}
