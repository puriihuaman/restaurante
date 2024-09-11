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
	private orders: Order[] = [];
	private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<
		Order[]
	>(this.orders);
	private orderSubject: BehaviorSubject<Order | null> =
		new BehaviorSubject<Order | null>(null);

	constructor() {}

	public getAllOrders(): Observable<Order[]> {
		return this.ordersSubject.asObservable();
	}

	private setOrders(newOrders: Order[]): void {
		this.ordersSubject.next(newOrders);
	}

	public addOrderToOrders(newOrder: Order): void {
		this.orders.push(newOrder);
		this.setOrders(this.orders);
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
		}
	}

	removeProductFromOrder(
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
			}
		}
	}

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

	private verifyExistenceOfTheOrder(
		orderCode: Order["_code"]
	): Order | undefined {
		return this.orders.find(
			(order: Order): boolean => order.code === orderCode
		);
	}

	private filterOrders(orderCode: Order["_code"]): void {
		this.orders = this.orders.filter(
			(order: Order): boolean => order.code !== orderCode
		);
		this.setOrders(this.orders);
	}

	private verifyProductExistence(
		currentOrder: Order,
		productId: Product["_id"]
	): ProductOrder | undefined {
		return currentOrder.products.find(
			({ product }: ProductOrder): boolean => product.id === productId
		);
	}

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

	private calculateTotal(products: ProductOrder[]): number {
		const total: number = products.reduce(
			(acc: number, { product, quantity }: ProductOrder): number =>
				acc + product.price * quantity,
			0
		);
		return total;
	}

	private updateTotal(currentOrder: Order): void {
		if (currentOrder) {
			currentOrder.total = this.calculateTotal(currentOrder.products);
			this.calculatedTotal.next(currentOrder.total);
		}
	}

	get calculatedTotalToPay(): Observable<number> {
		return this.calculatedTotal.asObservable();
	}

	set resetTotalCalculated(resetTotal: number) {
		this.calculatedTotal.next(resetTotal);
	}

	// ❌ Revisar
	public loadFromStorage(): void {
		const currentOrders: string | null = localStorage.getItem(this.storageName);
		if (currentOrders) this.orders = JSON.parse(currentOrders);
	}

	// ❌ Revisar
	private saveStorage(): void {
		localStorage.setItem(this.storageName, JSON.stringify(this.orders));
	}

	// ❌ Revisar
	private upgradeStorage(): void {
		const currentOrders: string | null = localStorage.getItem(this.storageName);
		if (currentOrders) {
			localStorage.setItem(this.storageName, JSON.stringify(this.orders));
			// if (currentOrders.products.length === 0) {
			// 	localStorage.clear();
			// }
		}
	}
}
