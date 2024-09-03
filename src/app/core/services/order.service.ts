import { Order } from "../models/order";
import { Product } from "./../models/product";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private products: { product: Product; quantity: number }[] = [];
  private allOrders: Order[] = [];
  private total: number = 0;
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

    this.allOrders.push(
      new Order(crypto.randomUUID(), this.products, this.total)
    );

    // this.products = [];
    // this.total = 0;
  }

  get allOrder(): Order[] {
    return this.allOrders;
  }

  get allProducts() {
    return this.products;
  }

  get totalToPay(): number {
    return this.total;
  }
}

type Action = "ADD" | "REMOVE";
