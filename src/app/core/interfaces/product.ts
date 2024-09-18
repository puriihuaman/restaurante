import type { Category } from "@type/category";

export interface ProductData {
	title: string;
	description: string;
	price: number;
	category: Category;
}

export interface Product extends ProductData {
	id: string;
}
