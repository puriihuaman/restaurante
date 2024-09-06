import { Component, inject, Input } from "@angular/core";
import { ProductsComponent } from "@components/products/products.component";
import type { Product } from "@models/product";
import { ProductService } from "@services/product.service";

@Component({
	selector: "app-categories-section",
	standalone: true,
	imports: [ProductsComponent],
	templateUrl: "./categories-section.component.html",
	styleUrl: "./categories-section.component.scss",
})
export class CategoriesSectionComponent {
	@Input({ required: true }) categoryName: string = "";
	@Input() products: Product[] = [];
	// private productService: ProductService = inject(ProductService);

	// public allBurgers: Product[] = [];
	// public allSalads: Product[] = [];
	// public allDrinks: Product[] = [];

	constructor() {
		// this.allBurgers = this.productService.allBurgers;
		// this.allSalads = this.productService.allSalads;
		// this.allDrinks = this.productService.allDrinks;
	}
}
