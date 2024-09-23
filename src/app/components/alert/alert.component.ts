import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-alert",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./alert.component.html",
	styleUrl: "./alert.component.scss",
})
export class AlertComponent {
	@Input() isLoading!: boolean;
	@Input() title?: String;
	@Input() message!: String;
}
