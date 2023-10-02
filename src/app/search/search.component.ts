import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() placeholderText: string = '';
  @Output() searchQueryChanged = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<any>();

  searchQuery: string = '';

  applyFilter(filterData: any) {
    this.filterChanged.emit(filterData);
  }

  search() {
    this.searchQueryChanged.emit(this.searchQuery);
  }
}
