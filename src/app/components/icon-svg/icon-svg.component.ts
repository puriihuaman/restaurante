import { NgClass } from "@angular/common";
import { Component, Input, type OnInit } from "@angular/core";

@Component({
	selector: "app-icon-svg",
	standalone: true,
	imports: [NgClass],
	templateUrl: "./icon-svg.component.html",
	styleUrl: "./icon-svg.component.scss",
})
export class IconSVGComponent implements OnInit {
	private PATH: string = "assets/icons/icons.svg#";
	@Input({ required: true }) iconID!: string;
	@Input() iconSize: IconSize = "sm";

	ngOnInit(): void {
		this.URl_PATH = `${this.PATH}${this.iconID}`;
		this.sizeClass = this.iconsSizes[this.iconSize] || this.iconsSizes["sm"];
	}

	private iconsSizes: Record<IconSize, string> = {
		xs: "xs",
		sm: "sm",
		md: "md",
		lg: "lg",
	};

	public sizeClass!: string;
	public URl_PATH!: string;
}

type IconSize = "xs" | "sm" | "md" | "lg";
