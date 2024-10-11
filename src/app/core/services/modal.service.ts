import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ModalService {
	private subjectOpen = new BehaviorSubject(false);
	constructor() {}

	open(value: boolean) {
		this.subjectOpen.next(value);
	}

	close(value: boolean) {
		this.subjectOpen.next(value);
	}

	getState() {
		return this.subjectOpen.asObservable();
	}
}
