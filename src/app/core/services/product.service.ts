import { inject, Injectable } from "@angular/core";
import type { DocumentData } from "@angular/fire/compat/firestore";
import {
	addDoc,
	collection,
	collectionData,
	doc,
	Firestore,
	getDocs,
	query,
	where,
	type CollectionReference,
	type DocumentReference,
	type Query,
	type QuerySnapshot,
} from "@angular/fire/firestore";

import { productList } from "@data/list-product";
import type { Product, ProductData } from "@interfaces/product";
import { BehaviorSubject, from, map, type Observable } from "rxjs";

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

	private getDocRef(
		_id: string
	): DocumentReference<DocumentData, DocumentData> {
		return doc(this._firestore, PATH, _id);
	}

	getProducts(): Observable<Product[]> {
		return collectionData(this._collection, { idField: "id" }) as Observable<
			Product[]
		>;
	}

	searchProduct(_productTitle: string): Observable<Product[]> {
		const docRef: Query<DocumentData, DocumentData> = query(
			this._collection,
			where("title", "==", _productTitle)
		);

		return from(this.performSearch(docRef));
	}

	private async performSearch(
		_docRef: Query<DocumentData>
	): Promise<Product[]> {
		const snapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(
			_docRef
		);
		const products: Product[] = [];

		if (!snapshot.empty) {
			snapshot.forEach((doc) =>
				products.push({
					id: doc.id,
					title: doc.data()["title"],
					category: doc.data()["category"],
					price: doc.data()["price"],
					description: doc.data()["description"],
				})
			);
			console.log("Se encontro...");
		}
		return products;
	}

	registerProduct(_productData: ProductData): void {
		console.log(_productData);
		addDoc(this._collection, _productData);
	}
}
