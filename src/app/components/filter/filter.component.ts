import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { IFilterData } from '../../models/filter-data.model';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss'
})
export class FilterComponent {
    @Output() filter = new EventEmitter<IFilterData>;

    public isFiltered: boolean = false;
    isOpen: boolean = false;

    spicinessLevels: { [key: string]: string } = {
        0: "Not Chosen",
        1: "Not Spicy",
        2: "Mildly Spicy",
        3: "Fairly Spicy",
        4: "Spicy",
        5: "Extra Spicy"
    };

    filterData: IFilterData = {
        spiciness: 0,
        vegetarian: false,
        nuts: false
    };

    filterProducts() {
        this.closeFilter();
        this.isFiltered = true;
        this.filter.emit(this.filterData);
    }

    resetFilter() {
        this.closeFilter();
        this.isFiltered = false;
        this.filterData.spiciness = 0;
        this.filterData.vegetarian = false;
        this.filterData.nuts = false;
        this.filter.emit(this.filterData);
    }

    closeFilter() {
        this.isOpen = false;
    }
}
