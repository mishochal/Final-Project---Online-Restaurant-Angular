import { Component } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { BasketsService } from '../../services/baskets.service';
import { IBasket } from '../../models/basket.model';

@Component({
    selector: 'app-cart-item-list',
    standalone: true,
    imports: [CartItemComponent, CommonModule],
    templateUrl: './cart-item-list.component.html',
    styleUrl: './cart-item-list.component.scss'
})
export class CartItemListComponent {
    cartItems: IBasket[] = [];

    constructor(private basketService: BasketsService) { }

    ngOnInit(): void {
        this.getBasket();
    }

    getBasket(): void {
        this.basketService.getBasket().subscribe(basket => this.cartItems = basket);
    }

    deleteItem(item: IBasket) {
        this.basketService.deleteProduct(item).subscribe();
    }
}
