import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderComponent } from "@components/order/order.component";
import type { Order } from "@interfaces/order";
import { OrderService } from "@services/order.service";

@Component({
	selector: "app-ticket",
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, OrderComponent],
	templateUrl: "./ticket.component.html",
	styleUrl: "./ticket.component.scss",
})
export class TicketComponent implements OnInit {
	private orderService: OrderService = inject(OrderService);
	public currentOrder!: Order;
	private route: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private orderCode: Order["code"] | null = null;

	ngOnInit(): void {
		this.orderCode = this.route.snapshot.paramMap.get("code");
		if (this.orderCode !== null) {
			const existingOrder: Order | undefined =
				this.orderService.verifyExistenceOfTheOrder(this.orderCode);

			if (existingOrder) {
				this.currentOrder = existingOrder;
				this.printTicket();
			} else {
				this.router.navigate(["/"]);
			}
		}
	}

	private printTicket(): void {
		setTimeout((): void => {
			window.print();
		}, 100);
	}
}
