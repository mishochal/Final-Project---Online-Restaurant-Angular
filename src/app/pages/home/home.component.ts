import { Component, ViewChild } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ICategory } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { IProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { GetCategoryService } from '../../services/get-category.service';
import { IFilterData } from '../../models/filter-data.model';
import { FilterProductsService } from '../../services/filter-products.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, CategoriesComponent, ProductListComponent, FilterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    @ViewChild(FilterComponent) filterComponent!: FilterComponent;

    categories: ICategory[] = [];
    products: IProduct[] = [];
    selectedCategory: number = 0;

    constructor(
        private categoriesService: CategoriesService,
        private productsService: ProductsService,
        private getCategoryService: GetCategoryService,
        private filterProductsService: FilterProductsService
    ) { }

    ngOnInit(): void {
        this.getCategories();
        this.getProducts();
    }

    getCategories(): void {
        this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
    }

    getProducts(): void {
        this.productsService.getProducts().subscribe(products => this.products = products);
    }

    selectCategory(id: number) {
        this.products = [];
        this.selectedCategory = id;
        console.log(this.filterComponent.isFiltered);
        if (this.filterComponent.isFiltered) {
            this.filterProductsService.filterProducts(this.filterComponent.filterData, id)
                .subscribe(filtered => this.products = filtered);
        } else {
            if (id === 0) {
                this.productsService.getProducts().subscribe(products => this.products = products);
            } else {
                this.getCategoryService.getCategory(id).subscribe(category => this.products = category.products);
            }
        }
    }

    filterProducts(filterData: IFilterData) {
        this.filterProductsService.filterProducts(filterData, this.selectedCategory)
            .subscribe(filtered => this.products = filtered)
    }
}
