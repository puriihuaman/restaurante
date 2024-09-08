import { Component, inject, Input, type OnInit } from "@angular/core";
import { IconSVGComponent } from "@components/icon-svg/icon-svg.component";
import type { Product } from "@models/product";
import { OrderService } from "@services/order.service";
import type { ActionUser } from "@type/action-user";

@Component({
	selector: "app-order-item",
	standalone: true,
	imports: [IconSVGComponent],
	templateUrl: "./order-item.component.html",
	styleUrl: "./order-item.component.scss",
})
export class OrderItemComponent implements OnInit {
	@Input() product!: Product;
	@Input() quantity!: number;

	private orderService: OrderService = inject(OrderService);

	ngOnInit(): void {}

	handleAddOrder(product: Product, action: ActionUser): void {
		this.orderService.addOrder(product, 1, action);
	}

	handleRemoveProduct(productId: string, action: ActionUser): void {
		this.orderService.removeProduct(productId, 1, action);
	}
}
