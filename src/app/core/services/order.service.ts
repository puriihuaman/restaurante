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

  addOrder(product: Product, amount: number): void {
    const existingProduct = this.products.find(
      (prod) => prod.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += amount;
    } else {
      this.products.push({ product, quantity: amount });
    }

    this.total = this.products.reduce((acc, { product, quantity }) => {
      return acc + product.price * quantity;
    }, 0);
    console.log(this.total);
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

// {codigo, [  ], total}
