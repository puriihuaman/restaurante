import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import type { Notification } from "@interfaces/notification";
import { NotificationService } from "@services/notification.service";
import type { Observable, Subscription } from "rxjs";

@Component({
	selector: "app-notification",
	standalone: true,
	imports: [AsyncPipe, JsonPipe],
	templateUrl: "./notification.component.html",
	styleUrl: "./notification.component.scss",
})
export class NotificationComponent implements OnInit {
	public notification$!: Observable<Notification>;
	private notificationService = inject(NotificationService);
	private notificationSuscription!: Subscription;
	public currentNotificationMessage: string | null = null;

	ngOnInit(): void {
		this.notification$ = this.notificationService.getNotification();

		this.notificationSuscription = this.notification$.subscribe(
			(notification: Notification): void => {
				if (notification.message) {
					this.notificationService.showTemporaryMessage(notification.message);
					this.currentNotificationMessage = notification.message;
				} else this.currentNotificationMessage = null;
			}
		);
	}

	ngOnDestroy(): void {
		if (this.notificationSuscription) {
			this.notificationSuscription.unsubscribe();
		}
	}
}
