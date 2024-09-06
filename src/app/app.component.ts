import { Component, inject, type OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { CategoriesSectionComponent } from "@components/categories-section/categories-section.component";
import { OrderListComponent } from "@components/order-list/order-list.component";
import type { Order } from "./core/models/order";
import type { Product } from "./core/models/product";
import { OrderService } from "./core/services/order.service";
import { ProductService } from "./core/services/product.service";
import { OrderComponent } from "@components/order/order.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		CategoriesSectionComponent,
		OrderListComponent,
		OrderComponent,
		RouterOutlet,
		FormsModule,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
	private productService: ProductService = inject(ProductService);
	private orderService: OrderService = inject(OrderService);
	public allProduct: Product[] = [];

	public allBurgers: Product[] = [];
	public allSalads: Product[] = [];
	public allDrinks: Product[] = [];

	public allOrderProducts: { product: Product; quantity: number }[] = [];
	public order!: Order;
	public total: number = 0;

	ngOnInit(): void {
		this.allProduct = this.productService.getAllProducts;
		this.allBurgers = this.productService.allBurgers;
		this.allSalads = this.productService.allSalads;
		this.allDrinks = this.productService.allDrinks;

		// this.allOrderProducts = this.orderService.allProducts;
		this.order = this.orderService.allOrder();
	}

	handleAddOrder(product: Product, action: Action = "ADD") {
		this.orderService.addOrder(product, 1, action);
		this.total = this.orderService.totalToPay;
		// this.allOrderProducts = this.orderService.allProducts;
		this.order = this.orderService.allOrder();
	}

	handleRemoveProduct(productId: string) {
		this.orderService.removeProduct(productId);
		this.total = this.orderService.totalToPay;
	}
}

type Action = "ADD" | "REMOVE";
