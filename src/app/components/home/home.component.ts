import { AsyncPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { CategoriesSectionComponent } from "@components/categories-section/categories-section.component";
import { OrderComponent } from "@components/order/order.component";
import type { Product } from "@models/product";
import { ProductService } from "@services/product.service";
import type { Observable } from "rxjs";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [AsyncPipe, CategoriesSectionComponent, OrderComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
	private productService: ProductService = inject(ProductService);

	public allBurgers$!: Observable<Product[]>;
	public allSalads$!: Observable<Product[]>;
	public allDrinks$!: Observable<Product[]>;

	// public allOrderProducts: { product: Product; quantity: number }[] = [];

	ngOnInit(): void {
		this.allBurgers$ = this.productService.allBurgers;
		this.allSalads$ = this.productService.allSalads;
		this.allDrinks$ = this.productService.allSalads;
	}
}
