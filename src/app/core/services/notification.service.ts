import { Injectable } from "@angular/core";
import type { Notification } from "@interfaces/notification";
import { BehaviorSubject, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	private notifications: Notification[] = [];
	private notificationsSubject: BehaviorSubject<Notification[]> =
		new BehaviorSubject<Notification[]>(this.notifications);

	constructor() {}

	private setNotifications(_newNotification: Notification): void {
		this.notifications.push(_newNotification);
		this.notificationsSubject.next(this.notifications);
	}

	public getNotifications(): Observable<Notification[]> {
		return this.notificationsSubject.asObservable();
	}

	public addNotification(_notification: Notification): void {
		this.setNotifications(_notification);
		this.showTemporaryMessage(_notification);
	}

	private removeNotification(_notification: Notification): void {
		this.notifications = this.notifications.filter(
			(notif: Notification): boolean => notif !== _notification
		);
		this.notificationsSubject.next(this.notifications);
	}

	private showTemporaryMessage(
		_notification: Notification,
		duration: number = 3000
	): void {
		console.log("TEMPORAL");
		setTimeout((): void => {
			this.removeNotification(_notification);
		}, duration);
	}
}
