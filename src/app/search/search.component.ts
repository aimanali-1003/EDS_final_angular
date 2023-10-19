import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() placeholderText: string = '';
  @Input() searchQuery: string = '';
  @Output() searchQueryChanged = new EventEmitter<string>();

  onSearchQueryChange(query: string) {
    this.searchQueryChanged.emit(query);
  }
}
