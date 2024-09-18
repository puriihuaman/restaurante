import { Order } from "@interfaces/order";
import { OrderService } from "@services/order.service";
import { Component, inject, type OnInit } from "@angular/core";
import type { Observable } from "rxjs";
import { AsyncPipe, JsonPipe, NgClass } from "@angular/common";
import { ProductService } from "@services/product.service";
import type { Product } from "@interfaces/product";

@Component({
	selector: "app-dashboard",
	standalone: true,
	imports: [AsyncPipe, JsonPipe, NgClass],
	templateUrl: "./dashboard.component.html",
	styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
	private orderService = inject(OrderService);
	private productService: ProductService = inject(ProductService);
	public isOrderView: boolean = true;
	public isProductView: boolean = false;

	public orders$!: Observable<Order[]>;
	public allProducts$!: Observable<Product[]>;

	ngOnInit(): void {
		this.orders$ = this.orderService.getOrders();
		this.allProducts$ = this.productService.getAllProducts();
	}

	handleView(tap: string): void {
		if (tap === "order") {
			this.isOrderView = true;
			this.isProductView = false;
		} else {
			this.isOrderView = false;
			this.isProductView = true;
		}
	}
}
