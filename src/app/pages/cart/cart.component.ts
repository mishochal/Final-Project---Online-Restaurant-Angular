import { Component } from '@angular/core';
import { CartHeroComponent } from '../../components/cart-hero/cart-hero.component';
import { CartItemListComponent } from '../../components/cart-item-list/cart-item-list.component';
import { CommonModule } from '@angular/common';
import { BasketsService } from '../../services/baskets.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CartHeroComponent, CartItemListComponent, CommonModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    totalPrice: number = 0;

    constructor(private basketService: BasketsService) { }

    ngOnInit() {
        this.basketService.totalPrice$.subscribe(price => this.totalPrice = price);
        this.basketService.loadBasket();
    }
}
