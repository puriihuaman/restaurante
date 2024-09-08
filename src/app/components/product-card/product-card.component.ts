import { CurrencyPipe, NgClass } from "@angular/common";
import { Component, inject, Input, type OnInit } from "@angular/core";
import { IconSVGComponent } from "@components/icon-svg/icon-svg.component";
import type { Product } from "@models/product";
import { OrderService } from "@services/order.service";
import type { ActionUser } from "@type/action-user";
import type { Category } from "@type/category";

@Component({
	selector: "app-product-card",
	standalone: true,
	imports: [CurrencyPipe, NgClass, IconSVGComponent],
	templateUrl: "./product-card.component.html",
	styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent implements OnInit {
	@Input() product!: Product;
	private orderService: OrderService = inject(OrderService);

	constructor() {}

	ngOnInit(): void {}

	handleAddOrder(product: Product, action: ActionUser): void {
		this.orderService.addOrder(product, 1, action);
	}

	public loadCategory(category: Category): string {
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
