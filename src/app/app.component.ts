import { Component, inject, type OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ProductService } from "./core/services/product.service";
import type { Product } from "./core/models/product";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "restaurante";
  private productService: ProductService = inject(ProductService);

  public allProduct: Product[] = [];

  public allBurgers: Product[] = [];
  public allSalads: Product[] = [];
  public allDrinks: Product[] = [];

  ngOnInit(): void {
    this.allProduct = this.productService.getAllProducts;
    this.allBurgers = this.productService.allBurgers;
    this.allSalads = this.productService.allSalads;
    this.allDrinks = this.productService.allDrinks;
  }
}
