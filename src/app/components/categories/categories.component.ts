import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CommonModule, FormsModule, NgClass],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    @Input() categories: ICategory[] | undefined;
    @Output() selected = new EventEmitter<number>();

    selectedId: number = 0;

    isOpen: boolean = false;
    closeCategories() {
        this.isOpen = false;
    }

    selectCategory(id: number) {
        this.selectedId = id;
        this.selected.emit(id);
    }
}
