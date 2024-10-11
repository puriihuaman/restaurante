import { AsyncPipe, NgClass } from "@angular/common";
import { Component, HostListener, inject, type OnInit } from "@angular/core";
import { ModalService } from "@services/modal.service";
import { Observable } from "rxjs";

@Component({
	selector: "app-modal",
	standalone: true,
	imports: [NgClass, AsyncPipe],
	templateUrl: "./modal.component.html",
	styleUrl: "./modal.component.scss",
})
export class ModalComponent implements OnInit {
	private modalService = inject(ModalService);
	public isOpen$!: Observable<boolean>;
	handleContentClick = (ev: MouseEvent): void => {
		ev.stopPropagation();
	};

	ngOnInit(): void {
		this.isOpen$ = this.modalService.getState();
	}

	closeModal() {
		this.modalService.close(false);
	}

	@HostListener("document:keydown", ["$event"])
	handleKeyboardEvent(ev: KeyboardEvent) {
		console.log(ev.key === "Escape" && this.isOpen$);
		if (ev.key === "Escape" && this.isOpen$) {
			this.closeModal();
		}
	}
}
