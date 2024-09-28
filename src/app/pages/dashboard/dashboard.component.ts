import { NgClass } from "@angular/common";
import { Component, type OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NotificationComponent } from "@components/notification/notification.component";
import { SidebarComponent } from "@pages/components/sidebar/sidebar.component";

@Component({
	selector: "app-dashboard",
	standalone: true,
	imports: [NgClass, SidebarComponent, NotificationComponent, RouterOutlet],
	templateUrl: "./dashboard.component.html",
	styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
	ngOnInit(): void {}
}
