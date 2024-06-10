import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBasket } from '../models/basket.model';
import { tap } from 'rxjs/operators';
import { IPartialProduct } from '../models/partial-product.model';
import { IProduct } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class BasketsService {
    private apiUrl = "https://restaurant.stepprojects.ge/api";

    private basketItemsSubject = new BehaviorSubject<IBasket[]>([]);
    public basketItems$ = this.basketItemsSubject.asObservable();

    private totalPriceSubject = new BehaviorSubject<number>(0);
    public totalPrice$ = this.totalPriceSubject.asObservable();

    constructor(private http: HttpClient) { }

    loadBasket() {
        const url = `${this.apiUrl}/Baskets/GetAll`;
        this.http.get<IBasket[]>(url).subscribe(items => {
            this.basketItemsSubject.next(items);
            this.calculateTotal(items);
        });
    }

    getBasket(): Observable<IBasket[]> {
        return this.basketItems$;
    }

    addToBasket(product: IPartialProduct, newBasketItem: IBasket): Observable<void> {
        const url = `${this.apiUrl}/Baskets/AddToBasket`;

        const updatedItems = [...this.basketItemsSubject.value, newBasketItem];
        this.basketItemsSubject.next(updatedItems);
        this.calculateTotal(updatedItems);

        return this.http.post<void>(url, product);
    }

    updateProduct(updatedItem: IPartialProduct, updatedBasketItem: IBasket): Observable<void> {
        const url = `${this.apiUrl}/Baskets/UpdateBasket`;

        const currItems = this.basketItemsSubject.value;
        const updatedItems = currItems.map(item => item.product.id === updatedBasketItem.product.id ? updatedBasketItem : item);
        this.basketItemsSubject.next(updatedItems);
        this.calculateTotal(updatedItems);

        return this.http.put<void>(url, updatedItem);
    }

    deleteProduct(item: IBasket): Observable<void> {
        const url = `${this.apiUrl}/Baskets/DeleteProduct/${item.product.id}`;

        const currItems = this.basketItemsSubject.value;
        const updatedItems = currItems.filter(currItem => item.product.id !== currItem.product.id);
        this.basketItemsSubject.next(updatedItems);
        this.calculateTotal(updatedItems);

        return this.http.delete<void>(url);
    }

    isInBasket(id: number) {
        return this.basketItemsSubject.value.some(item => item.product.id === id);
    }

    calculateTotal(items: IBasket[]) {
        const total = items.reduce((a, b) => a + b.price * b.quantity, 0);
        this.totalPriceSubject.next(total);
    }
}
