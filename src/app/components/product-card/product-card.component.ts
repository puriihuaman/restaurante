import { AsyncPipe, CurrencyPipe, NgClass } from "@angular/common";
import { Component, inject, Input, type OnInit } from "@angular/core";
import { IconSVGComponent } from "@components/icon-svg/icon-svg.component";
import type { Order } from "@models/order";
import type { Product } from "@models/product";
import { OrderService } from "@services/order.service";
import type { ActionUser } from "@type/action-user";
import type { Category } from "@type/category";
import type { Observable } from "rxjs";

@Component({
	selector: "app-product-card",
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, NgClass, IconSVGComponent],
	templateUrl: "./product-card.component.html",
	styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent implements OnInit {
	@Input() product!: Product;
	private orderService: OrderService = inject(OrderService);
	public order$!: Observable<Order | null>;

	constructor() {}

	ngOnInit(): void {
		this.order$ = this.orderService.getOrderSubject();
	}

	handleAddOrder(
		order: Order | null,
		product: Product,
		action: ActionUser
	): void {
		if (order === null) {
			alert("Debe seleccionar un pedido.");
			return;
		}

		this.orderService.addProductToOrder(order, product, 1, action);
	}

	public addPoster(category: Category): string {
		let poster: string = "hamburguesa";
		if (category) {
			switch (category) {
				case "bebida":
					poster = "drink";
					break;
				case "ensalada":
					poster = "salad";
					break;
				case "hamburguesa":
					poster = "hamburger";
					break;
			}
		}
		return poster;
	}
}
