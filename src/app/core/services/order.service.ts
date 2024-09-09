import { BehaviorSubject, type Observable } from "rxjs";

import { Injectable } from "@angular/core";
import type { ActionUser } from "@type/action-user";
import type { ProductOrder } from "@interfaces/product-order";
import { environment } from "@environment/environment.development";
import { Order } from "@models/order";
import type { Product } from "@models/product";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private storageName: string = environment.storageName;
	private calculatedTotal: BehaviorSubject<number> =
		new BehaviorSubject<number>(0);
	private currentOrder: Order = new Order(crypto.randomUUID(), "Puri", [], 0);

	private orders: Order[] = [];
	private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<
		Order[]
	>(this.orders);
	private orderSubject: BehaviorSubject<Order | null> =
		new BehaviorSubject<Order | null>(null);

	constructor() {
		// this.loadFromStorage();
	}

	public getAllOrders(): Observable<Order[]> {
		return this.ordersSubject.asObservable();
	}

	private setOrders(newOrders: Order[]) {
		this.ordersSubject.next(newOrders);
	}

	// ✅
	public addOrderToOrders(newOrder: Order): void {
		this.orders.push(newOrder);
		// this.ordersSubject.next(this.orders);
		this.setOrders(this.orders);
	}

	// ✅
	public getOrderSubject(): Observable<Order | null> {
		return this.orderSubject.asObservable();
	}

	// ✅
	public setOrderSubject(newOrder: Order): void {
		this.orderSubject.next(newOrder);
	}

	// // ✅
	// addOrder(product: Product, amount: number, action: ActionUser = "ADD"): void {
	addProductToOrder(
		currentOrder: Order,
		currentProduct: Product,
		amount: number,
		action: ActionUser = "ADD"
	): void {
		if (action === "ADD" || action === "INCREASE") {
			const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
				currentOrder.code
			);

			if (existingOrder) {
				const existingProduct: ProductOrder | undefined =
					this.verifyProductExistence(currentOrder, currentProduct.id);

				if (existingProduct) existingProduct.quantity += amount;
				else
					currentOrder.products.push({
						product: currentProduct,
						quantity: amount,
					});

				this.updateTotal(currentOrder);
			}
			console.log(currentOrder);
			console.log(this.orders);

			// 	const existingProduct: ProductOrder | undefined = this.verifyExistence(
			// 		product.id
			// 	);

			// 	if (existingProduct) existingProduct.quantity += amount;
			// 	else this.currentOrder.products.push({ product, quantity: amount });

			// 	this.updateTotal();
			// 	// this.saveStorage(this.currentOrder);
		}

		// console.log(this.currentOrder);
	}

	removeProduct(
		currentOrder: Order,
		productId: string,
		amount: number = 1,
		action: ActionUser
	): void {
		const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
			currentOrder.code
		);
		if (existingOrder) {
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
				// this.upgradeStorage();
			}
		}
		// const existingProduct: ProductOrder | undefined =
		// 	this.verifyExistence(productId);
		// if (existingProduct) {
		// 	if (action === "DECREASE") {
		// 		existingProduct.quantity -= amount;
		// 		if (existingProduct.quantity <= 0) {
		// 			this.currentOrder.setProducts = this.filterProducts(productId);
		// 		}
		// 	} else if (action === "REMOVE") {
		// 		this.currentOrder.setProducts = this.filterProducts(productId);
		// 	}
		// 	this.updateTotal();
		// 	// this.upgradeStorage();
		// }
	}

	// ✅
	deleteOrder(currentOrder: Order): void {
		const existingOrder: Order | undefined = this.verifyExistenceOfTheOrder(
			currentOrder.code
		);

		if (existingOrder) {
			this.filterOrders(currentOrder.code);
			this.orderSubject.next(null);
		}
	}

	getOrderByCode(orderCode: Order["_code"]): Order | undefined {
		return this.orders.find(
			(order: Order): boolean => order.code === orderCode
		);
	}

	// ✅
	private verifyExistenceOfTheOrder(
		orderCode: Order["_code"]
	): Order | undefined {
		return this.orders.find(
			(order: Order): boolean => order.code === orderCode
		);
	}

	// ✅
	private filterOrders(orderCode: Order["_code"]): void {
		this.orders = this.orders.filter(
			(order: Order): boolean => order.code !== orderCode
		);
		this.setOrders(this.orders);
	}

	// ✅
	private verifyProductExistence(
		currentOrder: Order,
		productId: Product["_id"]
	): ProductOrder | undefined {
		return currentOrder.products.find(
			({ product }: ProductOrder): boolean => product.id === productId
		);
	}

	// ✅ -> Revisar
	private filterProducts(
		currentOrder: Order,
		productId: Product["_id"]
	): ProductOrder[] {
		return (
			currentOrder?.products.filter(
				({ product }: ProductOrder): boolean => product.id !== productId
			) || []
		);
	}

	// ✅
	private calculateTotal(products: ProductOrder[]): number {
		const total: number = products.reduce(
			(acc: number, { product, quantity }: ProductOrder): number =>
				acc + product.price * quantity,
			0
		);
		return total;
	}

	// ✅
	private updateTotal(currentOrder: Order): void {
		if (currentOrder) {
			currentOrder.total = this.calculateTotal(currentOrder.products);
			this.calculatedTotal.next(currentOrder.total);
		}
	}

	// ✅
	get calculatedTotalToPay(): Observable<number> {
		return this.calculatedTotal.asObservable();
	}

	// ✅
	set resetTotalCalculated(resetTotal: number) {
		this.calculatedTotal.next(resetTotal);
	}

	public loadFromStorage(): void {
		const currentOrder: string | null = localStorage.getItem(this.storageName);
		if (currentOrder) this.currentOrder = { ...JSON.parse(currentOrder) };
	}

	private saveStorage(currentOrder: Order): void {
		localStorage.setItem(this.storageName, JSON.stringify(currentOrder));
	}

	private upgradeStorage(): void {
		const currentOrder: string | null = localStorage.getItem(this.storageName);
		if (currentOrder) {
			localStorage.setItem(this.storageName, JSON.stringify(this.currentOrder));
			if (this.currentOrder.products.length === 0) {
				localStorage.clear();
			}
		}
	}
}
