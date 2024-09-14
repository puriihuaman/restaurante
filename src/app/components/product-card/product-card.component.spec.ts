import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductCardComponent } from "./product-card.component";
import type { Category } from "@type/category";

describe("ProductCardComponent", () => {
	let component: ProductCardComponent;
	let fixture: ComponentFixture<ProductCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProductCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ProductCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("#addPoster debería retornar `salad` para la categoría `ensalada`", (): void => {
		const category: Category = "ensalada";
		const poster = component.addPoster(category);
		expect(poster).toEqual("salad");
	});

	it("#addPoster deberíá retornar `drink` para la categoría `bebida`", (): void => {
		const category: Category = "bebida";
		expect(component.addPoster(category)).toEqual("drink");
	});

	it("#addPoster deberíá retornar `hamburger`para la categoría `hamburguesa`", () => {
		const category: Category = "hamburguesa";
		expect(component.addPoster(category)).toEqual("hamburger");
	});
});
