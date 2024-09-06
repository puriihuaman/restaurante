import { Component, Input } from "@angular/core";
import { OrderItemComponent } from "@components/order-item/order-item.component";
import type { Order } from "@models/order";

@Component({
	selector: "app-order-list",
	standalone: true,
	imports: [OrderItemComponent],
	templateUrl: "./order-list.component.html",
	styleUrl: "./order-list.component.scss",
})
export class OrderListComponent {
	@Input() order!: Order;
}
