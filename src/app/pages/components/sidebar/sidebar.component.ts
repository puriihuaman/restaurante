import { NgClass } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
	selector: "aside[app-sidebar]",
	standalone: true,
	imports: [RouterLink, NgClass],
	templateUrl: "./sidebar.component.html",
	styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
	public menuList: Menu[] = [
		{ id: 1, path: "products", title: "Productos", active: true },
		{ id: 2, path: "orders", title: "Pedidos", active: false },
	];

	public activateMenu: boolean = true;
	@Output() menuEmitt: EventEmitter<boolean> = new EventEmitter<boolean>(
		this.activateMenu
	);

	handleActiveMenu(selectedMenu: Menu): void {
		this.menuList.forEach((menu: Menu): boolean => (menu.active = false));
		selectedMenu.active = true;
		this.menuEmitt.emit(selectedMenu.active);
	}
}

interface Menu {
	id: number;
	path: string;
	title: string;
	active: boolean;
}
