import { AsyncPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CategoriesSectionComponent } from "@components/categories-section/categories-section.component";
import { OrderListComponent } from "@components/order-list/order-list.component";
import { OrderComponent } from "@components/order/order.component";
import type { Order } from "@models/order";
import type { Product } from "@models/product";
import { OrderService } from "@services/order.service";
import { ProductService } from "@services/product.service";
import type { Observable } from "rxjs";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		AsyncPipe,
		CategoriesSectionComponent,
		OrderListComponent,
		OrderComponent,
		RouterOutlet,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
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
