import { Component, Input } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product.model';
import { BasketsService } from '../../services/baskets.service';
import { IPartialProduct } from '../../models/partial-product.model';
import { IBasket } from '../../models/basket.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductComponent, CommonModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    @Input() products: IProduct[] | undefined;
    iterations = Array(12).fill(0);

    constructor(private basketService: BasketsService) { }

    ngOnInit() {
        this.basketService.loadBasket();
    }

    addToCart(product: IProduct) {
        if (this.basketService.isInBasket(product.id)) {
            alert("This product is already in the cart");
        } else {
            const newProd: IPartialProduct = {
                quantity: 1,
                price: product.price,
                productId: product.id
            }
            const newBasketItem: IBasket = {
                quantity: 1,
                price: product.price,
                product: product
            }
            this.basketService.addToBasket(newProd, newBasketItem).subscribe();
        }
    }
}
