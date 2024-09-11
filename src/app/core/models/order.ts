import type { ProductOrder } from "@interfaces/product-order";
import type { Product } from "./product";

// export interface Order {
// 	code: string;
// 	client: string;
// 	products: ProductOrder[];
// 	total: number;
// }

export class Order {
	private code: string;
	private client: string;
	private products: ProductOrder[];
	private total: number;

	constructor(
		code: string,
		client: string,
		products: ProductOrder[],
		total: number
	) {
		this.code = code;
		this.client = client;
		this.products = products;
		this.total = total;
	}

	public addProduct(_product: Product, _amount: number): void {
		const existingProduct: ProductOrder | undefined =
			this.verifyProductExistence(_product.getId);
		if (existingProduct) {
			existingProduct.quantity += _amount;
		} else {
			this.products.push({ product: _product, quantity: _amount });
		}
		this.updateTotal();
	}

	public decrease(_productId: Product["id"], _amount: number = 1): void {
		const existingProduct: ProductOrder | undefined =
			this.verifyProductExistence(_productId);

		if (existingProduct) {
			existingProduct.quantity -= _amount;
			if (existingProduct.quantity <= 0) {
				this.setProducts = this.filterProducts(_productId);
			}
		}
		this.updateTotal();
	}

	public removeProduct(_productId: Product["id"]): void {
		this.setProducts = this.filterProducts(_productId);
		this.updateTotal();
	}

	public verifyProductExistence(
		_productId: Product["id"]
	): ProductOrder | undefined {
		return this.getProducts.find(
			({ product }: ProductOrder): boolean => product.getId === _productId
		);
	}

	public filterProducts(_productId: Product["id"]): ProductOrder[] {
		return (
			this.getProducts.filter(
				({ product }: ProductOrder): boolean => product.getId !== _productId
			) || []
		);
	}

	private updateTotal(): void {
		this.setTotal = this.getProducts.reduce(
			(acc: number, { product, quantity }: ProductOrder): number =>
				acc + product.getPrice * quantity,
			0
		);
	}

	get getCode(): string {
		return this.code;
	}

	get getClient(): string {
		return this.client;
	}

	set setClient(_client: string) {
		this.client = _client;
	}

	get getProducts(): ProductOrder[] {
		return this.products;
	}

	set setProducts(_products: ProductOrder[]) {
		this.products = _products;
	}

	get getTotal(): number {
		return this.total;
	}

	set setTotal(_total: number) {
		this.total = _total;
	}
}
