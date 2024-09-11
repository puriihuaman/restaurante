/**
 * Hamburger
 */

import { Product } from "@interfaces/product";

const hamburger1: Product = {
	id: crypto.randomUUID(),
	title: "Hamburguesa Royal",
	description: "Hamburguesa",
	price: 7,
	category: "hamburguesa",
};
const hamburger2: Product = {
	id: crypto.randomUUID(),
	title: "Hamburguesa Doble",
	description: "Hamburguesa",
	price: 7,
	category: "hamburguesa",
};
const hamburger3: Product = {
	id: crypto.randomUUID(),
	title: "Hamburguesa Queso",
	description: "",
	price: 20,
	category: "hamburguesa",
};
const hamburger4: Product = {
	id: crypto.randomUUID(),
	title: "Hamburguesa Pollo",
	description: "",
	price: 30,
	category: "hamburguesa",
};
const hamburger5: Product = {
	id: crypto.randomUUID(),
	title: "Hamburguesa Vegana",
	description: "",
	price: 20,
	category: "hamburguesa",
};

const burgers: Product[] = [
	hamburger1,
	hamburger2,
	hamburger3,
	hamburger4,
	hamburger5,
];

/**
 * Drinks
 */

const drink1: Product = {
	id: crypto.randomUUID(),
	title: "CocaCola",
	description: "",
	price: 5,
	category: "bebida",
};
const drink2: Product = {
	id: crypto.randomUUID(),
	title: "InkaCola",
	description: "",
	price: 5,
	category: "bebida",
};
const drink3: Product = {
	id: crypto.randomUUID(),
	title: "Agua",
	description: "",
	price: 4,
	category: "bebida",
};
const drink4: Product = {
	id: crypto.randomUUID(),
	title: "Maracuya",
	description: "",
	price: 7,
	category: "bebida",
};
const drink5: Product = {
	id: crypto.randomUUID(),
	title: "Limonada Helada",
	description: "",
	price: 12,
	category: "bebida",
};

const drinks: Product[] = [drink1, drink2, drink3, drink4, drink5];

/**
 * Salads
 */
const salad1: Product = {
	id: crypto.randomUUID(),
	title: "Ensalada Normal",
	description: "",
	price: 5,
	category: "ensalada",
};
const salad2: Product = {
	id: crypto.randomUUID(),
	title: "Ensalada Palta",
	description: "",
	price: 5,
	category: "ensalada",
};
const salad3: Product = {
	id: crypto.randomUUID(),
	title: "Ensalada Frutas",
	description: "",
	price: 4,
	category: "ensalada",
};
const salad4: Product = {
	id: crypto.randomUUID(),
	title: "Ensalada Verduras",
	description: "",
	price: 7,
	category: "ensalada",
};
const salad5: Product = {
	id: crypto.randomUUID(),
	title: "Ensalada Mixta",
	description: "",
	price: 12,
	category: "ensalada",
};

const salads: Product[] = [salad1, salad2, salad3, salad4, salad5];

export const productList: Product[] = [...burgers, ...drinks, ...salads];
