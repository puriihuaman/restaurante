import { inject, Injectable } from "@angular/core";
import {
	addDoc,
	collection,
	collectionData,
	Firestore,
	type CollectionReference,
} from "@angular/fire/firestore";

import { productList } from "@data/list-product";
import type { Product, ProductData } from "@interfaces/product";
import { BehaviorSubject, map, type Observable } from "rxjs";

const PATH = "products";

@Injectable({
	providedIn: "root",
})
export class ProductService {
	private allProducts: BehaviorSubject<Product[]> = new BehaviorSubject<
		Product[]
	>(productList);
	private _firestore: Firestore = inject(Firestore);
	private _collection: CollectionReference = collection(this._firestore, PATH);

	constructor() {}

	getAllProducts(): Observable<Product[]> {
		return this.allProducts.asObservable();
	}

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

	getProducts(): Observable<Product[]> {
		return collectionData(this._collection, { idField: "id" }) as Observable<
			Product[]
		>;
	}

	registerProduct(_productData: ProductData): void {
		console.log(_productData);
		addDoc(this._collection, _productData);
	}
}
