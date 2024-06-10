import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private apiUrl = "https://restaurant.stepprojects.ge/api";

    constructor(private http: HttpClient) { }

    getCategories(): Observable<ICategory[]> {
        const url = `${this.apiUrl}/Categories/GetAll`
        return this.http.get<ICategory[]>(url);
    }
}
