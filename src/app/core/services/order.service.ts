import { BehaviorSubject, type Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { environment } from "@environment/environment.development";

import type { ProductOrder } from "@interfaces/product-order";
import type { Product } from "@interfaces/product";
import type { ActionUser } from "@type/action-user";
import { Order } from "@interfaces/order";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private storageName: string = environment.storageName;
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

	private setAllOrders(newOrders: Order[]): void {
		this.ordersSubject.next(newOrders);
	}

	public addOrderToOrders(newOrder: Order): void {
		this.orders.push(newOrder);
		this.setAllOrders(this.orders);
		this.saveOrdersToStorage();
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

	public loadFromStorage(): void {
		const storedOrders: string | null = localStorage.getItem(this.storageName);
		if (storedOrders) {
			const ordersArray: Order[] = JSON.parse(storedOrders);

			this.orders = ordersArray;
			this.ordersSubject.next(this.orders);
		}
	}

	private saveOrdersToStorage(): void {
		localStorage.setItem(this.storageName, JSON.stringify(this.orders));
	}
}
