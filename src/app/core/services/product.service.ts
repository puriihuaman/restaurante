import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { allProducts } from "../../shared/data/list-product";
import type { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  get getAllProducts(): Product[] {
    return allProducts;
  }

  get allBurgers(): Product[] {
    return allProducts.filter((product) => product.category === "hamburguesa");
  }

  get allSalads(): Product[] {
    return allProducts.filter((product) => product.category === "ensalada");
  }

  get allDrinks(): Product[] {
    return allProducts.filter((product) => product.category === "bebida");
  }
}
