import { AsyncPipe } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ModalService } from "@services/modal.service";
import type { Observable } from "rxjs";
import { ModalComponent } from "./components/modal/modal.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, AsyncPipe, ModalComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
	public isModalOpen$!: Observable<boolean>;
	private modalService: ModalService = inject(ModalService);

	constructor() {}

	ngOnInit(): void {
		this.isModalOpen$ = this.modalService.getState();
	}

	openModal() {
		this.modalService.open(true);
	}
}
