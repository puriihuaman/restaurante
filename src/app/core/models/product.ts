import type { Category } from "@type/category";

// export interface Product {
// 	id: string;
// 	title: string;
// 	description: string;
// 	price: number;
// 	category: Category;
// }

export class Product {
	private id: string;
	private title: string;
	private description: string;
	private price: number;
	private category: Category;

	constructor(
		_id: string,
		_title: string,
		_description: string,
		_price: number,
		_category: Category
	) {
		this.id = _id;
		this.title = _title;
		this.description = _description;
		this.price = _price;
		this.category = _category;
	}

	get getId(): string {
		return this.id;
	}

	get getTitle(): string {
		return this.title;
	}

	get getDescription(): string {
		return this.description;
	}

	get getPrice(): number {
		return this.price;
	}

	get getCategory(): Category {
		return this.category;
	}
}
