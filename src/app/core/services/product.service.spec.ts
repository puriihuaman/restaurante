import { TestBed } from "@angular/core/testing";

import { ProductService } from "./product.service";
import type { Product } from "@interfaces/product";

describe("ProductService", () => {
	let service: ProductService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ProductService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("#allBurgers should return a list burgers", (): void => {
		service.allBurgers.subscribe((burgers: Product[]): void => {
			expect(
				burgers.filter((hamburger) => hamburger.category === "hamburguesa")
			).toBeTruthy();
		});
	});
});
