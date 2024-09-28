import { AsyncPipe, JsonPipe, NgClass } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { AlertComponent } from "@components/alert/alert.component";
import { IconSVGComponent } from "@components/icon-svg/icon-svg.component";
import type { Product, ProductData } from "@interfaces/product";
import { NotificationService } from "@services/notification.service";
import { ProductService } from "@services/product.service";
import type { Category } from "@type/category";
import type { Observable } from "rxjs";

@Component({
	selector: "app-products",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		AsyncPipe,
		NgClass,
		JsonPipe,
		IconSVGComponent,
		AlertComponent,
	],
	templateUrl: "./products.component.html",
	styleUrl: "./products.component.scss",
})
export class ProductsComponent implements OnInit {
	private productService: ProductService = inject(ProductService);
	private _notification: NotificationService = inject(NotificationService);
	public _allProducts$!: Observable<Product[]>;
	public productData!: FormGroup;
	public searchValue: string = "";
	public showModal: boolean = false;

	ngOnInit(): void {
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
		this._notification.addNotification({
			type: "error",
			message: "El valor de búsqueda debe tener mínimo 3 caracteres",
		});
	}

	clearForm(): void {
		this.productData = new FormGroup({
			title: new FormControl<string>(""),
			category: new FormControl<Category>("hamburguesa"),
			description: new FormControl<string>(""),
			price: new FormControl<number>(0),
		});
	}

	private mapToProduct(_productData: ProductData): ProductData {
		return {
			title: _productData.title.toLowerCase(),
			description: _productData.description.toLowerCase(),
			category: _productData.category,
			price: _productData.price,
		};
	}
	handleOpenModal(): void {
		this.showModal = true;
		this.clearForm();
	}

	handleCloseModal(): void {
		this.showModal = !this.showModal;
		this.clearForm();
	}
}
