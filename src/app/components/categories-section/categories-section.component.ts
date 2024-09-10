import { Component, Input } from "@angular/core";
import { ProductCardComponent } from "@components/product-card/product-card.component";
import type { Product } from "@models/product";

@Component({
	selector: "app-categories-section",
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: "./categories-section.component.html",
	styleUrl: "./categories-section.component.scss",
})
export class CategoriesSectionComponent {
	@Input({ required: true }) categoryName: string = "";
	@Input() products: Product[] = [];

	constructor() {}
}
