import { AsyncPipe, JsonPipe, NgClass } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import type { Notification } from "@interfaces/notification";
import { NotificationService } from "@services/notification.service";
import type { Observable, Subscription } from "rxjs";

@Component({
	selector: "app-notification",
	standalone: true,
	imports: [AsyncPipe, JsonPipe, NgClass],
	templateUrl: "./notification.component.html",
	styleUrl: "./notification.component.scss",
})
export class NotificationComponent implements OnInit {
	private notificationService = inject(NotificationService);
	private notifications$!: Observable<Notification[]>;
	private notificationSuscription!: Subscription;
	public currentNotifications: Notification[] = [];

	ngOnInit(): void {
		this.notifications$ = this.notificationService.getNotifications();

		this.notificationSuscription = this.notifications$.subscribe(
			(notifications: Notification[]): void => {
				this.currentNotifications = notifications;
			}
		);
	}

	ngOnDestroy(): void {
		if (this.notificationSuscription) {
			this.notificationSuscription.unsubscribe();
		}
	}
}
