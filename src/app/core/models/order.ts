import type { Product } from "./product";

export class Order {
  private _code: string;
  private _products: { product: Product; quantity: number }[];
  private _total: number;

  constructor(
    code: string,
    products: { product: Product; quantity: number }[],
    total: number
  ) {
    this._code = code;
    this._products = products;
    this._total = total;
  }

  get code(): string {
    return this._code;
  }

  get products(): { product: Product; quantity: number }[] {
    return this._products;
  }

  set setProducts(_products: { product: Product; quantity: number }[]) {
    this._products = _products;
  }

  get total(): number {
    return this._total;
  }

  set total(_total: number) {
    this._total = _total;
  }
}
