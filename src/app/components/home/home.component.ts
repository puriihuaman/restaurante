import { AsyncPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { CategoriesSectionComponent } from "@components/categories-section/categories-section.component";
import { OrderComponent } from "@components/order/order.component";
import type { Product } from "@interfaces/product";
import { ProductService } from "@services/product.service";
import { catchError, type Observable } from "rxjs";

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
	public hasError: boolean = false;
	public isLoading: boolean = true;

	ngOnInit(): void {
		this.allBurgers$ = this.productService.allBurgers.pipe(
			catchError((error) => {
				console.error(error);
				this.hasError = true;
				throw new Error(error);
			})
		);
		this.allSalads$ = this.productService.allSalads;
		this.allDrinks$ = this.productService.allDrinks;
		this.isLoading = false;
	}
}
