import { AsyncPipe, JsonPipe, NgClass } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { Order } from "@interfaces/order";
import { OrderService } from "@services/order.service";
import { ProductService } from "@services/product.service";
import type { Observable } from "rxjs";

import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { IconSVGComponent } from "@components/icon-svg/icon-svg.component";
import type { Product, ProductData } from "@interfaces/product";
import type { Category } from "@type/category";
import { AlertComponent } from "@components/alert/alert.component";

@Component({
	selector: "app-dashboard",
	standalone: true,
	imports: [
		AsyncPipe,
		FormsModule,
		ReactiveFormsModule,
		JsonPipe,
		NgClass,
		IconSVGComponent,
		AlertComponent,
	],
	templateUrl: "./dashboard.component.html",
	styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
	private orderService = inject(OrderService);
	private productService: ProductService = inject(ProductService);

	public orders$!: Observable<Order[]>;
	public products$!: Observable<Product[]>;
	public allProducts$!: Observable<Product[]>;
	public product$!: Observable<String | null>;
	public _allProducts$!: Observable<Product[]>;

	public productData!: FormGroup;
	public searchValue: string = "";
	public isOrderView: boolean = true;
	public isProductView: boolean = false;
	public showModal: boolean = false;

	ngOnInit(): void {
		this.orders$ = this.orderService.getOrders();
		this.products$ = this.productService.getAllProducts();
		// this.allProducts$ = this.productService.getAllProducts();
		this.products$ = this.productService.getAllProducts();

		this._allProducts$ = this.productService.getAllProducts();

		this.productData = new FormGroup({
			title: new FormControl<string>("", [
				Validators.required,
				Validators.minLength(3),
			]),
			price: new FormControl<number>(1, [
				Validators.required,
				Validators.min(1),
			]),
			category: new FormControl<Category>("hamburguesa", [
				Validators.required,
				Validators.minLength(3),
			]),
			description: new FormControl<string>("", [
				Validators.required,
				Validators.minLength(10),
			]),
		});
	}

	sendData(): void {
		const product: ProductData = this.productData.value;
		this.productService.registerProduct(this.mapToProduct(product));

		this.clearForm();
		this.showModal = !this.showModal;
	}

	deleteProduct(_product: Product): void {
		if (_product) {
			this.productService.deleteProduct(_product.id);
		}
	}

	searchProduct(): void {
		if (this.searchValue.trim().length > 2)
			this.productService.searchProduct(this.searchValue);
		else this.productService.resetSearch();
	}

	private mapToProduct(_productData: ProductData): ProductData {
		return {
			title: _productData.title.toLowerCase(),
			description: _productData.description.toLowerCase(),
			category: _productData.category,
			price: _productData.price,
		};
	}

	handleView(tap: string): void {
		if (tap === "order") {
			this.isOrderView = false;
			this.isProductView = true;
		} else {
			this.isOrderView = true;
			this.isProductView = false;
		}
	}

	handleOpenModal(): void {
		this.showModal = true;
		this.clearForm();
	}

	handleCloseModal(): void {
		this.showModal = !this.showModal;
		this.clearForm();
	}

	clearForm(): void {
		this.productData = new FormGroup({
			title: new FormControl<string>(""),
			category: new FormControl<Category>("hamburguesa"),
			description: new FormControl<string>(""),
			price: new FormControl<number>(0),
		});
	}
}
