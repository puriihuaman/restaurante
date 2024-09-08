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
	private currentOrder: Order = new Order(crypto.randomUUID(), [], 0);

	constructor() {
		this.loadFromStorage();
	}

	addOrder(product: Product, amount: number, action: ActionUser = "ADD"): void {
		if (action === "ADD" || action === "INCREASE") {
			const existingProduct: ProductOrder | undefined = this.verifyExistence(
				product.id
			);

			if (existingProduct) existingProduct.quantity += amount;
			else this.currentOrder.products.push({ product, quantity: amount });

			this.updateTotal();
			this.saveStorage(this.currentOrder);
		}

		console.log(this.currentOrder);
	}

	removeProduct(
		productId: string,
		amount: number = 1,
		action: ActionUser
	): void {
		if (this.currentOrder) {
			const existingProduct: ProductOrder | undefined =
				this.verifyExistence(productId);

			if (existingProduct) {
				if (action === "DECREASE") {
					existingProduct.quantity -= amount;
					if (existingProduct.quantity <= 0) {
						this.currentOrder.setProducts = this.filterProducts(productId);
					}
				} else if (action === "REMOVE") {
					this.currentOrder.setProducts = this.filterProducts(productId);
				}
				this.updateTotal();
				this.upgradeStorage();
			}
		}
	}

	deleteOrder(): void {
		console.log(this.currentOrder);
	}

	getCurrentOrder(): Order {
		return this.currentOrder;
	}

	private verifyExistence(productId: Product["_id"]): ProductOrder | undefined {
		return this.currentOrder?.products.find(
			({ product }: ProductOrder): boolean => product.id === productId
		);
	}

	private filterProducts(productId: Product["_id"]): ProductOrder[] {
		return (
			this.currentOrder?.products.filter(
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

	private updateTotal(): void {
		if (this.currentOrder) {
			this.currentOrder.total = this.calculateTotal(this.currentOrder.products);
			this.calculatedTotal.next(this.currentOrder.total);
		}
	}

	get calculatedTotalToPay(): Observable<number> {
		return this.calculatedTotal.asObservable();
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
