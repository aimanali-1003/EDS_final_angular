import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  searchTerm: string = '';

  @Input() placeholder: string = 'Search'; // Input property for the search input placeholder
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter() {
    this.searchChange.emit(this.searchTerm);
  }
}
