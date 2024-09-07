import { Injectable } from "@angular/core";

import { productList } from "@data/list-product";
import type { Product } from "@models/product";
import { BehaviorSubject, map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ProductService {
	private allProducts: BehaviorSubject<Product[]> = new BehaviorSubject<
		Product[]
	>(productList);

	constructor() {}

	get allBurgers(): Observable<Product[]> {
		return this.allProducts.pipe(
			map((products: Product[]): Product[] =>
				products.filter(
					(product: Product): boolean => product.category === "hamburguesa"
				)
			)
		);
	}

	get allSalads(): Observable<Product[]> {
		return this.allProducts.pipe(
			map((products: Product[]): Product[] =>
				products.filter(
					(product: Product): boolean => product.category === "ensalada"
				)
			)
		);
	}

	get allDrinks(): Observable<Product[]> {
		return this.allProducts.pipe(
			map((products: Product[]): Product[] =>
				products.filter(
					(product: Product): boolean => product.category === "bebida"
				)
			)
		);
	}
}
