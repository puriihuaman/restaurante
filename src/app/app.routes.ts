import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("@components/home/home.component").then(
				(comp) => comp.HomeComponent
			),
	},
	{
		path: "boleta/:code",

		loadComponent: () =>
			import("@components/ticket/ticket.component").then(
				(comp) => comp.TicketComponent
			),
	},
	{
		path: "admin",
		loadComponent: () =>
			import("@pages/dashboard/dashboard.component").then(
				(comp) => comp.DashboardComponent
			),
		children: [
			{
				path: "products",
				loadComponent: () =>
					import("@pages/products/products.component").then(
						(comp) => comp.ProductsComponent
					),
				pathMatch: "full",
			},
			{
				path: "orders",
				loadComponent: () =>
					import("@pages/orders/orders.component").then(
						(comp) => comp.OrdersComponent
					),
			},
			{
				path: "**",
				redirectTo: "products",
			},
		],
	},
];
