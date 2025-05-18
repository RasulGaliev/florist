// src/app/components/product-list/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../../mocks/mock-products';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    products: Product[] = PRODUCTS;
    categories = ['Все', 'Цветы', 'Аксессуары', 'Подарки'];
    selectedCategory = 'Все';

    get filteredProducts() {
        return this.selectedCategory === 'Все'
            ? this.products
            : this.products.filter(p => p.category === this.selectedCategory);
    }

    selectCategory(category: string) {
        this.selectedCategory = category;
    }
}