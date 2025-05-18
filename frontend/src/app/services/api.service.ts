import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    addProduct(product: any) {
        return this.http.post(`${this.apiUrl}/products`, product);
    }

    deleteProduct(id: string) {
        return this.http.delete(`${this.apiUrl}/products/${id}`);
    }

    createSubscription(subscription: any) {
        return this.http.post(`${this.apiUrl}/subscriptions`, subscription);
    }
}