import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {
    @Input() product!: IProduct;
    @Input() isLoaded: boolean = true;

    @Output() add = new EventEmitter<IProduct>();

    spicinessLevels: { [key: string]: string } = {
        0: "Not Spicy",
        1: "Mildly Spicy",
        2: "Fairly Spicy",
        3: "Spicy",
        4: "Extra Spicy"
    };

    addToCart(product: IProduct) {
        this.add.emit(product);
    }
}
