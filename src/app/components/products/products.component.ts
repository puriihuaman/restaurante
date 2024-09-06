import { Component, Input } from "@angular/core";
import { ProductCardComponent } from "@components/product-card/product-card.component";
import type { Product } from "@models/product";

@Component({
	selector: "app-products",
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: "./products.component.html",
	styleUrl: "./products.component.scss",
})
export class ProductsComponent {
	@Input() allProducts: Product[] = [];
}
