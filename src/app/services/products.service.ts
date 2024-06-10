import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiUrl = "https://restaurant.stepprojects.ge/api"

    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        const url = `${this.apiUrl}/Products/GetAll`
        return this.http.get<IProduct[]>(url);
    }
}
