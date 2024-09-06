import { BehaviorSubject, type Observable } from "rxjs";
import { Order } from "../models/order";
import { Product } from "./../models/product";
import { Injectable } from "@angular/core";
import type { ActionUser } from "@type/action-user";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private products: { product: Product; quantity: number }[] = [];
	private calculatedTotal: BehaviorSubject<number> =
		new BehaviorSubject<number>(0);
	private total: number = 0;
	private order: Order = new Order(
		crypto.randomUUID(),
		this.products,
		this.total
	);
	constructor() {}

	addOrder(product: Product, amount: number, action: ActionUser = "ADD"): void {
		const existingProduct = this.products.find(
			(prod) => prod.product.id === product.id
		);

		if (action === "ADD") {
			if (existingProduct) existingProduct.quantity += amount;
			else this.products.push({ product, quantity: amount });
		} else if (action === "REMOVE") {
			if (existingProduct) {
				existingProduct.quantity -= amount;
				if (existingProduct.quantity <= 0) {
					this.products = this.products.filter(
						(prod) => prod.product.id !== product.id
					);
				}
			} else {
				console.warn(`El producto ${product.title} no existe en el pedido.`);
			}
		}

		this.total = this.products.reduce((acc, { product, quantity }) => {
			return acc + product.price * quantity;
		}, 0);

		// this.allOrders.push(
		//   new Order(crypto.randomUUID(), this.products, this.total)
		// );
		this.order.setProducts = [...this.products];
		this.order.total = this.total;

		// localStorage.setItem("ORDER", JSON.stringify(this.order));

		// this.products = [];
		// this.total = 0;
	}

	removeProduct(productId: string) {
		this.order.setProducts = this.order.products.filter(
			({ product }) => product.id !== productId
		);

		this.total = this.order.products.reduce((acc, { product, quantity }) => {
			return acc + product.price * quantity;
		}, 0);
		this.order.total = this.total;

		if (this.order.products.length === 0) {
			this.total = 0;
			this.products = [];
			this.order.setProducts = [];
			this.order.total = 0;
		}
	}

	handleAddOrder(product: Product, action: ActionUser = "ADD") {
		this.addOrder(product, 1, action);
		// this.calculatedTotal.subscribe((total) => {
		// 	console.log({ total });
		// });
		// this.total = this.orderService.totalToPay;
		// this.order = this.orderService.allOrder();
	}

	allOrder(): Order {
		return this.order;
	}

	get allProducts() {
		return this.products;
	}

	get totalToPay(): number {
		return this.total;
	}

	get calculatedTotalToPay(): Observable<number> {
		return this.calculatedTotal.asObservable();
	}

	set changeTotalToPay(newTotal: number) {
		this.calculatedTotal.next(newTotal);
	}
}
