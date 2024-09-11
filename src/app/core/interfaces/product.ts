import type { Category } from "@type/category";

export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	category: Category;
}
