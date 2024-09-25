import { Injectable } from "@angular/core";
import type { Notification } from "@interfaces/notification";
import { BehaviorSubject, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	private notification: BehaviorSubject<Notification> =
		new BehaviorSubject<Notification>({ type: "info", message: "" });

	constructor() {}

	private setNotification(_newNotification: Notification): void {
		this.notification.next(_newNotification);
	}

	public getNotification(): Observable<Notification> {
		return this.notification.asObservable();
	}

	public successMessage(_message: string): void {
		console.log("SUCCESS");
		this.setNotification({ type: "success", message: _message });
	}

	public errorMessage(_message: string): void {
		console.log("ERROR");
		this.setNotification({ type: "error", message: _message });
	}

	public informationMessage(_message: string): void {
		console.log("INFORMATION");
		this.setNotification({ type: "info", message: _message });
	}

	public warningMessage(_message: string): void {
		console.log("WARNING");
		this.setNotification({ type: "warning", message: _message });
	}
	public clearNotification(): void {
		this.setNotification({ type: "info", message: "" });
	}

	public showTemporaryMessage(_message: string, duration: number = 3000): void {
		console.log("TEMPORAL");
		// this.setNotification({ type: "info", message: _message });
		setTimeout((): void => {
			this.clearNotification();
		}, duration);
	}
}
