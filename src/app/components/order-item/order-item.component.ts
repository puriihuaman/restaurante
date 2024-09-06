import { Component, Input, type OnInit } from "@angular/core";
import type { Order } from "@models/order";
import type { Product } from "@models/product";

@Component({
	selector: "app-order-item",
	standalone: true,
	imports: [],
	templateUrl: "./order-item.component.html",
	styleUrl: "./order-item.component.scss",
})
export class OrderItemComponent implements OnInit {
	@Input() product!: Product;
	@Input() quantity!: number;

	ngOnInit(): void {}

	handleAddOrder(product: Product, action: string) {}

	handleRemoveProduct(productId: string) {}
}
