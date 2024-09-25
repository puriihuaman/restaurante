import { inject, Injectable } from "@angular/core";
import type { DocumentData } from "@angular/fire/compat/firestore";
import {
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	Firestore,
	getDocs,
	query,
	where,
	type CollectionReference,
	type DocumentReference,
	type Query,
	type QueryDocumentSnapshot,
	type QuerySnapshot,
} from "@angular/fire/firestore";

import { productList } from "@data/list-product";
import type { Product, ProductData } from "@interfaces/product";
import { BehaviorSubject, from, map, type Observable } from "rxjs";
import { NotificationService } from "./notification.service";
import type { Notification } from "@interfaces/notification";

const PATH = "products";

@Injectable({
	providedIn: "root",
})
export class ProductService {
	private allProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
		Product[]
	>([]);

	private _allProducts: BehaviorSubject<Product[]> = new BehaviorSubject<
		Product[]
	>([]);
	private allProducts: Product[] = [];
	private _firestore: Firestore = inject(Firestore);
	private _collection: CollectionReference = collection(this._firestore, PATH);
	private _notification: NotificationService = inject(NotificationService);

	constructor() {
		this.loadAllProducts();
	}

	get allBurgers(): Observable<Product[]> {
		return this.allProductsSubject.pipe(
			map((products: Product[]): Product[] =>
				products.filter(
					(product: Product): boolean => product.category === "hamburguesa"
				)
			)
		);
	}

	get allSalads(): Observable<Product[]> {
		return this.allProductsSubject.pipe(
			map((products: Product[]): Product[] =>
				products.filter(
					(product: Product): boolean => product.category === "ensalada"
				)
			)
		);
	}

	get allDrinks(): Observable<Product[]> {
		return this.allProductsSubject.pipe(
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

	getAllProducts(): Observable<Product[]> {
		return this._allProducts.asObservable();
	}

	private loadAllProducts(): void {
		const products = collectionData(this._collection, {
			idField: "id",
		}) as Observable<Product[]>;

		products.subscribe((products: Product[]): void => {
			this.allProducts = products;
			this._allProducts.next(products);
		});
	}

	searchProduct(_productTitle: string): void {
		const docRef: Query<DocumentData, DocumentData> = query(
			this._collection,
			where("title", "==", _productTitle)
		);

		this.performSearch(docRef)
			.then((products: Product[]): void => {
				if (products.length === 0) {
					this._notification.addNotification({
						type: "info",
						message: "No hay coincidencias",
					});
					this.resetSearch();
				} else this._allProducts.next(products);
			})
			.catch((error): void => {
				console.error("Error al realizar la búsqueda: ", error);
				this._notification.addNotification({
					type: "error",
					message: "Error al realizar la búsqueda",
				});
			});
	}

	private async performSearch(
		_docRef: Query<DocumentData>
	): Promise<Product[]> {
		const snapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(
			_docRef
		);
		const products: Product[] = [];

		if (!snapshot.empty) {
			snapshot.forEach(
				(doc: QueryDocumentSnapshot<DocumentData, DocumentData>): number =>
					products.push(this.mapToProduct(doc))
			);
			console.log("Se encontro...");
		}
		return products;
	}

	resetSearch(): void {
		this._allProducts.next(this.allProducts);
	}

	registerProduct(_productData: ProductData): void {
		addDoc(this._collection, _productData);
	}

	deleteProduct(_productId: Product["id"]): void {
		const docRef: DocumentReference<DocumentData, DocumentData> =
			this.getDocRef(_productId);

		deleteDoc(docRef)
			.then((): void => {
				console.log("Producto eliminado con exito");

				this._notification.addNotification({
					type: "success",
					message: "Producto eliminado con exito",
				});
			})
			.catch((error): void => console.error(error));
	}

	private mapToProduct(
		_doc: QueryDocumentSnapshot<DocumentData, DocumentData>
	): Product {
		return {
			id: _doc.id,
			title: _doc.data()["title"],
			category: _doc.data()["category"],
			price: _doc.data()["price"],
			description: _doc.data()["description"],
		};
	}
}
