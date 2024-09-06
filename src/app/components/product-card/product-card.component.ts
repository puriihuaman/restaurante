import { CurrencyPipe, NgClass } from "@angular/common";
import { Component, inject, Input, type OnInit } from "@angular/core";
import type { Product } from "@models/product";
import { OrderService } from "@services/order.service";
import type { ActionUser } from "@type/action-user";
import type { Observable } from "rxjs";

@Component({
	selector: "app-product-card",
	standalone: true,
	imports: [CurrencyPipe, NgClass],
	templateUrl: "./product-card.component.html",
	styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent implements OnInit {
	@Input() product!: Product;
	private orderService: OrderService = inject(OrderService);
	public total$!: Observable<number>;

	constructor() {}

	ngOnInit(): void {}

	handleAddOrder(product: Product, action: ActionUser): void {
		this.orderService.addOrder(product, 1, action);
		this.orderService.changeTotalToPay = this.orderService.totalToPay;
		// this.total = this.orderService.totalToPay;
		// this.order = this.orderService.allOrder();
	}

	public loadCategory(category: string): string {
		let poster: string = "hamburger";
		if (category) {
			switch (category) {
				case "bebida":
					poster = "drink";
					break;
				case "ensalada":
					poster = "salad";
					break;
				case "hamburgesa":
					poster = "hamburger";
					break;
			}
		}
		return poster;
	}
}
