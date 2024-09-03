/**
 * Hamburger
 */

import { Product } from "../../core/models/product";

const hamburger1 = new Product(
  crypto.randomUUID(),
  "Hamburguesa Royal",
  "Hamburguesa",
  7,
  "hamburguesa"
);
const hamburger2 = new Product(
  crypto.randomUUID(),
  "Hamburguesa Doble",
  "Hamburguesa",
  7,
  "hamburguesa"
);
const hamburger3 = new Product(
  crypto.randomUUID(),
  "Hamburguesa Queso",
  "",
  20,
  "hamburguesa"
);
const hamburger4 = new Product(
  crypto.randomUUID(),
  "Hamburguesa Pollo",
  "",
  30,
  "hamburguesa"
);
const hamburger5 = new Product(
  crypto.randomUUID(),
  "Hamburguesa Vegana",
  "",
  20,
  "hamburguesa"
);

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

const drink1 = new Product(crypto.randomUUID(), "CocaCola", "", 5, "bebida");
const drink2 = new Product(crypto.randomUUID(), "InkaCola", "", 5, "bebida");
const drink3 = new Product(crypto.randomUUID(), "Agua", "", 4, "bebida");
const drink4 = new Product(crypto.randomUUID(), "Maracuya", "", 7, "bebida");
const drink5 = new Product(
  crypto.randomUUID(),
  "Limonada Helada",
  "",
  12,
  "bebida"
);

const drinks: Product[] = [drink1, drink2, drink3, drink4, drink5];

/**
 * Salads
 */
const salad1 = new Product(
  crypto.randomUUID(),
  "Ensalada Normal",
  "",
  5,
  "ensalada"
);
const salad2 = new Product(
  crypto.randomUUID(),
  "Ensalada Palta",
  "",
  5,
  "ensalada"
);
const salad3 = new Product(
  crypto.randomUUID(),
  "Ensalada Frutas",
  "",
  4,
  "ensalada"
);
const salad4 = new Product(
  crypto.randomUUID(),
  "Ensalada Verduras",
  "",
  7,
  "ensalada"
);
const salad5 = new Product(
  crypto.randomUUID(),
  "Ensalada Mixta",
  "",
  12,
  "ensalada"
);

const salads: Product[] = [salad1, salad2, salad3, salad4, salad5];

export const allProducts: Product[] = [...burgers, ...drinks, ...salads];
