import { Order } from "../models/order";
import { Product } from "./../models/product";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	private products: { product: Product; quantity: number }[] = [];
	private total: number = 0;
	private order: Order = new Order(
		crypto.randomUUID(),
		this.products,
		this.total
	);
	constructor() {}

	addOrder(product: Product, amount: number, action: Action = "ADD"): void {
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

	allOrder(): Order {
		return this.order;
	}

	get allProducts() {
		return this.products;
	}

	get totalToPay(): number {
		return this.total;
	}
}

type Action = "ADD" | "REMOVE";
