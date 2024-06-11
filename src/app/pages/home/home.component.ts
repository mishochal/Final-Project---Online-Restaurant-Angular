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
    isLoaded: boolean = false;

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
        this.loadAllProducts();
    }

    selectCategory(id: number) {
        if (this.selectedCategory !== id) {
            this.resetProucts();
            this.selectedCategory = id;
            if (this.filterComponent.isFiltered) {
                this.loadFiltered(this.filterComponent.filterData, id);
            } else {
                this.loadByCategories(id);
            }
        }
    }

    filterProducts(filterData: IFilterData) {
        this.resetProucts();
        this.loadFiltered(filterData, this.selectedCategory);
    }

    resetProucts() {
        this.isLoaded = false;
        this.products = [];
    }

    loadFiltered(filterData: IFilterData, id: number) {
        this.filterProductsService.filterProducts(filterData, id)
            .subscribe(filtered => {
                this.products = filtered;
                this.isLoaded = true;
            });
    }

    loadByCategories(id: number) {
        if (id === 0) {
            this.loadAllProducts();
        } else {
            this.loadSingleCategory(id);
        }
    }

    loadAllProducts() {
        this.productsService.getProducts().subscribe(products => {
            this.products = products;
            this.isLoaded = true;
        });
    }

    loadSingleCategory(id: number) {
        this.getCategoryService.getCategory(id).subscribe(category => {
            this.products = category.products
            this.isLoaded = true;
        });
    }
}
