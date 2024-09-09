import type { ProductOrder } from "@interfaces/product-order";

export class Order {
	private _code: string;
	private _client: string;
	private _products: ProductOrder[];
	private _total: number;

	constructor(
		code: string,
		client: string,
		products: ProductOrder[],
		total: number
	) {
		this._code = code;
		this._client = client;
		this._products = products;
		this._total = total;
	}

	get code(): string {
		return this._code;
	}

	get client(): string {
		return this._client;
	}

	get products(): ProductOrder[] {
		return this._products;
	}

	set setProducts(_products: ProductOrder[]) {
		this._products = _products;
	}

	get total(): number {
		return this._total;
	}

	set total(_total: number) {
		this._total = _total;
	}
}
