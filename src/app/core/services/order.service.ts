import { BehaviorSubject, type Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { environment } from "@environment/environment.development";

import type { ProductOrder } from "@interfaces/product-order";
import type { Product } from "@models/product";
import type { ActionUser } from "@type/action-user";
import { Order } from "@models/order";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private storageName: string = environment.storageName;
	// private calculatedTotal: BehaviorSubject<number> =
	// 	new BehaviorSubject<number>(0);
	private orders: Order[] = [];
	private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<
		Order[]
	>(this.orders);
	private orderSubject: BehaviorSubject<Order | null> =
		new BehaviorSubject<Order | null>(null);

	constructor() {
		this.loadFromStorage();
	}

	public getAllOrders(): Observable<Order[]> {
		return this.ordersSubject.asObservable();
	}

	private setOrders(newOrders: Order[]): void {
		this.ordersSubject.next(newOrders);
	}

	public addOrderToOrders(newOrder: Order): void {
		this.orders.push(newOrder);
		this.setOrders(this.orders);
		console.log("Guardar");
		this.saveOrdersToStorage();
	}

	deleteOrder(currentOrder: Order): void {
		const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
			currentOrder.getCode
		);

		if (existingOrder) {
			this.filterOrders(currentOrder.getCode);
			this.orderSubject.next(null);
			this.saveOrdersToStorage();
		}
	}

	getOrderByCode(orderCode: Order["code"]): Order | undefined {
		return this.orders.find(
			(order: Order): boolean => order.getCode === orderCode
		);
	}

	public getOrderSubject(): Observable<Order | null> {
		return this.orderSubject.asObservable();
	}

	public setOrderSubject(newOrder: Order): void {
		this.orderSubject.next(newOrder);
	}

	addProductToOrder(
		currentOrder: Order,
		currentProduct: Product,
		amount: number,
		action: ActionUser = "ADD"
	): void {
		if (action === "ADD" || action === "INCREASE") {
			const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
				currentOrder.getCode
			);

			if (existingOrder) {
				existingOrder.addProduct(currentProduct, amount);
				// const existingProduct: ProductOrder | undefined =
				// 	this.verifyProductExistence(currentOrder, currentProduct.getId);

				// if (existingProduct) existingProduct.quantity += amount;
				// else existingOrder.addProduct(currentProduct, amount);
				// currentOrder.products.push({
				// 	product: currentProduct,
				// 	quantity: amount,
				// });

				// this.updateTotal(currentOrder);
				this.saveOrdersToStorage();
			}
		}
	}

	removeProductFromOrder(
		currentOrder: Order,
		productId: string,
		amount: number = 1,
		action: ActionUser
	): void {
		const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
			currentOrder.getCode
		);
		if (existingOrder) {
			if (action === "DECREASE") {
				existingOrder.decrease(productId, amount);
			} else if (action === "REMOVE") {
				existingOrder.removeProduct(productId);
			}
			this.saveOrdersToStorage();

			/*
			const existingProduct: ProductOrder | undefined =
				this.verifyProductExistence(currentOrder, productId);
			if (existingProduct) {
				if (action === "DECREASE") {
					existingProduct.quantity -= amount;
					if (existingProduct.quantity <= 0) {
						currentOrder.setProducts = this.filterProducts(
							currentOrder,
							productId
						);
					}
				} else if (action === "REMOVE") {
					currentOrder.setProducts = this.filterProducts(
						currentOrder,
						productId
					);
				}
				this.updateTotal(currentOrder);
				this.saveOrdersToStorage();
				this.upgradeStorage(existingOrder.getCode, currentOrder, productId);
			}
			*/
		}
	}

	private verifyExistenceOfTheOrder(
		orderCode: Order["code"]
	): Order | undefined {
		return this.orders.find(
			(order: Order): boolean => order.getCode === orderCode
		);
	}

	private filterOrders(orderCode: Order["code"]): void {
		this.orders = this.orders.filter(
			(order: Order): boolean => order.getCode !== orderCode
		);
		this.setOrders(this.orders);
	}

	/*
	private verifyProductExistence(
		currentOrder: Order,
		productId: Product["id"]
	): ProductOrder | undefined {
		return currentOrder.getProducts.find(
			({ product }: ProductOrder): boolean => product.getId === productId
		);
	}
	*/

	/* private filterProducts(
		currentOrder: Order,
		productId: Product["id"]
	): ProductOrder[] {
		return (
			currentOrder.getProducts.filter(
				({ product }: ProductOrder): boolean => product.getId !== productId
			) || []
		);
	} */

	/* private calculateTotal(products: ProductOrder[]): number {
		const total: number = products.reduce(
			(acc: number, { product, quantity }: ProductOrder): number =>
				acc + product.getPrice * quantity,
			0
		);
		return total;
	} */

	/*
	private updateTotal(currentOrder: Order): void {
		if (currentOrder) {
			currentOrder.setTotal = this.calculateTotal(currentOrder.getProducts);
			this.calculatedTotal.next(currentOrder.getTotal);
		}
	}*/

	/* get calculatedTotalToPay(): Observable<number> {
		return this.calculatedTotal.asObservable();
	} */

	/* set resetTotalCalculated(resetTotal: number) {
		this.calculatedTotal.next(resetTotal);
	} */

	public loadFromStorage(): void {
		const storedOrders: string | null = localStorage.getItem(this.storageName);
		if (storedOrders) {
			const ordersArray: {
				code: string;
				client: string;
				products: ProductOrder[];
				total: number;
			}[] = JSON.parse(storedOrders);
			console.log(ordersArray);
			this.orders = ordersArray.map(
				(orderData) =>
					new Order(
						orderData.code,
						orderData.client,
						orderData.products,
						orderData.total
					)
			);
			this.ordersSubject.next(this.orders);
		}
	}

	private saveOrdersToStorage(): void {
		localStorage.setItem(this.storageName, JSON.stringify(this.orders));
	}

	// ❌ Revisar
	private upgradeStorage(
		orderCode: Order["code"],
		currentOrder: Order,
		productId: Product["id"]
	): void {
		const storedOrders: string | null = localStorage.getItem(this.storageName);
		if (storedOrders) {
			const existingOrder: Order | undefined =
				this.verifyExistenceOfTheOrder(orderCode);

			if (existingOrder) {
				const existingProduct: ProductOrder | undefined =
					existingOrder.verifyProductExistence(productId);
				if (existingOrder) {
					console.log("Si existe el producto");
				}
			}

			// localStorage.setItem(this.storageName, JSON.stringify(this.orders));
			// // if (currentOrders.products.length === 0) {
			// // 	localStorage.clear();
			// // }
		}
	}
}
