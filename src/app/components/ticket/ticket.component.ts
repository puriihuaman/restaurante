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
		console.log(this.toPrint);
		setTimeout((): void => {
			window.print();
			this.toPrint = false;
		}, 200);
	}

	public returnHome(): void {
		this.router.navigate(["/"]);
	}
}
