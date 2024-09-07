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
		console.log("-------------------------------------------------");
		console.log(this.order);
		if (this.order) {
			console.log("Existte", this.order);
		} else {
			console.log("NO existe", this.order);
		}
		console.log("-------------------------------------------------");

		// const existingProduct = this.order.products.find(
		// 	(prod) => prod.product.id === product.id
		// );
		const existingProduct: ProductOrder | undefined = this.verifyExistence(
			product.id
		);

		if (action === "ADD" || action === "INCREASE") {
			if (existingProduct) existingProduct.quantity += amount;
			else this.order.products.push({ product, quantity: amount });
		} else if (action === "DECREASE") {
			if (existingProduct) {
				existingProduct.quantity -= amount;
				if (existingProduct.quantity <= 0) {
					this.order.setProducts = this.order.products.filter(
						(prod) => prod.product.id !== product.id
					);
				}
			} else {
				console.warn(`El producto ${product.title} no existe en el pedido.`);
			}
		}

		// calculate total
		// this.total = this.products.reduce((acc, { product, quantity }) => {
		// 	return acc + product.price * quantity;
		// }, 0);

		// this.allOrders.push(
		//   new Order(crypto.randomUUID(), this.products, this.total)
		// );
		// this.order.setProducts = this.products;
		this.order.total = this.calculateTotal(this.order.products);

		// localStorage.setItem("ORDER", JSON.stringify(this.order));

		// this.products = [];
		// this.total = 0;
	}

	removeProduct(productId: string): void {
		// const existingProduct = this.order.products.find(
		// 	({ product }: { product: Product; quantity: number }): boolean =>
		// 		product.id === productId
		// );
		const existingProduct: ProductOrder | undefined =
			this.verifyExistence(productId);

		if (existingProduct) {
			console.log("si existe: ", existingProduct);
			this.order.setProducts = this.order.products.filter(
				({ product }: ProductOrder): boolean => product.id !== productId
			);
			this.order.total = this.calculateTotal(this.order.products);
		} else {
			console.log("No existe: ", existingProduct);
		}
	}

	private verifyExistence(productId: Product["_id"]): ProductOrder | undefined {
		return this.order.products.find(
			({ product }: ProductOrder): boolean => product.id === productId
		);
	}

	allOrder(): Order {
		return this.order;
	}

	private calculateTotal(products: ProductOrder[]): number {
		const total: number = products.reduce(
			(acc: number, { product, quantity }: ProductOrder): number =>
				acc + product.price * quantity,
			0
		);
		return total;
	}

	get totalToPay(): number {
		// return this.total;
		return this.order.total;
	}

	get calculatedTotalToPay(): Observable<number> {
		return this.calculatedTotal.asObservable();
	}

	set changeTotalToPay(newTotal: number) {
		this.calculatedTotal.next(newTotal);
	}
}

interface ProductOrder {
	product: Product;
	quantity: number;
}
