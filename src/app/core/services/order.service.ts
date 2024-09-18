import { BehaviorSubject, filter, map, type Observable } from "rxjs";

import { inject, Injectable } from "@angular/core";
import { environment } from "@environment/environment.development";

import type { ProductOrder } from "@interfaces/product-order";
import type { Product } from "@interfaces/product";
import type { ActionUser } from "@type/action-user";
import { Order, type OrderData } from "@interfaces/order";
import {
	addDoc,
	collection,
	collectionData,
	doc,
	Firestore,
	getDoc,
	updateDoc,
	type CollectionReference,
	type DocumentReference,
	type DocumentSnapshot,
} from "@angular/fire/firestore";
import type { OrderStatus } from "@type/order-status";
import type { DocumentData } from "@angular/fire/compat/firestore";

const PATH = "orders";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private storageName: string = environment.STORAGE_NAME;
	private orders: Order[] = [];
	private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<
		Order[]
	>(this.orders);
	private orderSubject: BehaviorSubject<Order | null> =
		new BehaviorSubject<Order | null>(null);

	private _firestore: Firestore = inject(Firestore);
	private _collection: CollectionReference<DocumentData, DocumentData> =
		collection(this._firestore, PATH);

	constructor() {
		this.loadFromStorage();
	}

	public getAllOrders(): Observable<Order[]> {
		// return collectionData(this._collection) as Observable<Order[]>;
		return this.ordersSubject.asObservable();
	}

	private setAllOrders(newOrders: Order[]): void {
		this.ordersSubject.next(newOrders);
	}

	addOrderToOrders(_newOrder: OrderData): void {
		// 1: Registrar en la db
		this.registerOrder(_newOrder);

		// 2: Recuperar de la db
		// 3: Guardar en el localstorage
		// 4: Mostrar lo del localstorage
		//
		console.log("Agregar al db");
		// this.orders.push(_newOrder);
		// this.setAllOrders(this.orders);
		// this.saveOrdersToStorage();
	}

	deleteOrder(currentOrder: Order): void {
		const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
			currentOrder.code
		);

		if (existingOrder) {
			this.filterOrders(currentOrder.code);
			this.orderSubject.next(null);
			this.saveOrdersToStorage();
		}
	}

	getOrderByCode(orderCode: Order["code"]): Order | undefined {
		return this.orders.find(
			(order: Order): boolean => order.code === orderCode
		);
	}

	changeOrderStatus(_currentOrder: Order, _status: OrderStatus): boolean {
		let isChanged: boolean = false;
		const existingOrder: Order | undefined = this.getOrderByCode(
			_currentOrder.code
		);

		if (existingOrder) {
			existingOrder.status = _status;

			if (_status === "completed") {
				this.deleteOrder(_currentOrder);
				console.log("Borrado con exito");
			}
			this.updateOrder(_currentOrder);
			isChanged = true;
			this.saveOrdersToStorage();
		}

		return isChanged;
	}

	public getOrderSubject(): Observable<Order | null> {
		return this.orderSubject.asObservable();
	}

	public setOrderSubject(newOrder: Order): void {
		this.orderSubject.next(newOrder);
	}

	addProductToOrder(
		_currentOrder: Order,
		_currentProduct: Product,
		_amount: number,
		_action: ActionUser = "ADD"
	): void {
		if (_action === "ADD" || _action === "INCREASE") {
			const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
				_currentOrder.code
			);

			if (existingOrder) {
				const existingProduct: ProductOrder | undefined =
					this.verifyProductExistence(existingOrder, _currentProduct.id);

				if (existingProduct) existingProduct.quantity += _amount;
				else
					existingOrder.products.push({
						product: _currentProduct,
						quantity: _amount,
					});

				this.updateTotal(existingOrder);
				this.saveOrdersToStorage();
			}
		}
	}

	removeProductFromOrder(
		_currentOrder: Order,
		_productId: string,
		_amount: number = 1,
		_action: ActionUser
	): void {
		const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
			_currentOrder.code
		);
		if (existingOrder) {
			if (_action === "DECREASE") {
				this.decreaseProductQuantity(existingOrder, _productId);
			} else if (_action === "REMOVE") {
				this.deleteProductFromOrder(_currentOrder, _productId);
			}
			this.saveOrdersToStorage();
		}
	}

	private decreaseProductQuantity(
		_currentOrder: Order,
		_productId: Product["id"],
		_amount: number = 1
	): void {
		const existingProduct: ProductOrder | undefined =
			this.verifyProductExistence(_currentOrder, _productId);

		if (existingProduct) {
			existingProduct.quantity -= _amount;
			if (existingProduct.quantity <= 0) {
				_currentOrder.products = this.filterProducts(_currentOrder, _productId);
			}
			this.updateTotal(_currentOrder);
		}
	}

	private deleteProductFromOrder(
		_currentOrder: Order,
		_productId: Product["id"]
	): void {
		_currentOrder.products = this.filterProducts(_currentOrder, _productId);
		this.updateTotal(_currentOrder);
	}

	public verifyExistenceOfTheOrder(
		_orderCode: Order["code"]
	): Order | undefined {
		return this.orders.find(
			(order: Order): boolean => order.code === _orderCode
		);
	}

	private filterOrders(_orderCode: Order["code"]): void {
		this.orders = this.orders.filter(
			(order: Order): boolean => order.code !== _orderCode
		);
		this.setAllOrders(this.orders);
	}

	private verifyProductExistence(
		_currentOrder: Order,
		_productId: Product["id"]
	): ProductOrder | undefined {
		return _currentOrder.products.find(
			({ product }: ProductOrder): boolean => product.id === _productId
		);
	}

	private filterProducts(
		_currentOrder: Order,
		_productId: Product["id"]
	): ProductOrder[] {
		return (
			_currentOrder.products.filter(
				({ product }: ProductOrder): boolean => product.id !== _productId
			) || []
		);
	}

	private calculateTotal(_products: ProductOrder[]): number {
		const total: number =
			_products.reduce(
				(acc: number, { product, quantity }: ProductOrder): number =>
					acc + product.price * quantity,
				0
			) || 0;
		return total;
	}

	private updateTotal(_currentOrder: Order): void {
		if (_currentOrder) {
			_currentOrder.total = this.calculateTotal(_currentOrder.products);
		}
	}

	private getFromStorage(): Order[] {
		const storedOrders: string | null = localStorage.getItem(this.storageName);
		if (storedOrders) return JSON.parse(storedOrders) as Order[];
		return [];
	}

	private loadFromStorage(): void {
		this.orders = this.getFromStorage();
		this.ordersSubject.next(this.orders);
	}

	private saveOrdersToStorage(): void {
		console.log("METODO SAVE_STORAGE");
		localStorage.setItem(this.storageName, JSON.stringify(this.orders));
	}

	private combineOrders(_databaseOrders: Order[], _localOrders: Order[]) {
		// Puedes usar un Set para evitar duplicados basados en el código del pedido
		const allOrders = [..._databaseOrders, ..._localOrders];
		const uniqueOrders = Array.from(
			new Map(allOrders.map((order) => [order.code, order])).values()
		);
		return uniqueOrders;
	}

	/**
	 * INFO: Working with firestore
	 */

	private getDocRef(
		_id: string
	): DocumentReference<DocumentData, DocumentData> {
		return doc(this._firestore, PATH, _id);
	}

	public getOrders(): Observable<Order[]> {
		return collectionData(this._collection, { idField: "code" }) as Observable<
			Order[]
		>;
	}

	private filterOrdersByStatus(
		_status: OrderStatus = "pending"
	): Observable<Order[]> {
		return this.getOrders().pipe(
			map((documents: Order[]): Order[] =>
				documents.filter((doc: Order): boolean => doc.status === _status)
			)
		);
	}

	private async getOrderById(_id: Order["code"]): Promise<Order | null> {
		const docRef: DocumentReference<DocumentData, DocumentData> =
			this.getDocRef(_id);
		const snapshot: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(
			docRef
		);

		if (snapshot.exists()) {
			const data: DocumentData = snapshot.data();

			const order: Order = {
				code: _id,
				client: data["client"],
				products: data["products"],
				status: data["status"],
				total: data["total"],
			};
			return order;
		} else {
			return null;
		}
	}

	private registerOrder(_order: OrderData) {
		console.log("METODO REGISTER_ORDER");
		addDoc(this._collection, _order)
			.then(async (docRef) => {
				const order: Order | null = await this.getOrderById(docRef.id);

				if (order) {
					this.orders.push(order);
					this.setAllOrders(this.orders);
					this.saveOrdersToStorage();
				} else {
					console.log("No se encontró el documento.");
				}
			})
			.catch((error) => console.error(error));
	}

	private updateOrder(_order: Order) {
		console.log("METODO UPDATE_ORDER");
		const docRef: DocumentReference<DocumentData, DocumentData> =
			this.getDocRef(_order.code);
		updateDoc(docRef, { ..._order });
	}
}
