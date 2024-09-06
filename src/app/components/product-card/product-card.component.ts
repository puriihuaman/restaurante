import { Component, Input } from "@angular/core";
import type { Product } from "@models/product";

@Component({
	selector: "app-product-card",
	standalone: true,
	imports: [],
	templateUrl: "./product-card.component.html",
	styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent {
	@Input() product!: Product;

	handleAddOrder(product: Product, action: string) {}
}
