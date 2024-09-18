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
	},
];
