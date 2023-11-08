import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client-filter',
  templateUrl: './client-filter.component.html',
  styleUrls: ['./client-filter.component.css']
})
export class ClientFilterComponent implements OnInit {
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();

  selectedFields: { ClientName: boolean; id: boolean; CreatedAt: boolean; CreatedBy: boolean; UpdatedAt: boolean; UpdatedBy: boolean; Status: string } = {
    ClientName: false,
    id: false,
    CreatedAt: false,
    CreatedBy: false,
    UpdatedAt: false,
    UpdatedBy: false,
    Status: "",
  };


  isPopupVisible: boolean = false;
  jsonData: any;
  startDate: string = '';

  isDropdownVisible: boolean = false; // Initialize it as false

  constructor() {
    this.jsonData = {
      message: 'This message is coming from JSON data.'
    };
  }

  ngOnInit() {
    // This method is called when the component is initialized.
    // You can perform any initialization logic here if needed.
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  toggleDropdown() {
    // Toggle the dropdown's visibility
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  isFilterVisible: boolean = false; // Initial state of the filter sidebar

  toggleFilter(): void {
    // This method toggles the visibility of the filter sidebar
    this.isFilterVisible = !this.isFilterVisible;
  }

  applyFilters(): void {
    // This method should contain logic to apply the selected filters
    // You can access filter values and apply them to your data here
    // For example, emit an event or update a service with filter values
    const filters = {
      active: this.selectedFields.Status === 'enabled', // Assuming 'enabled' means active and 'disabled' means inactive
    };

    this.filterChanged.emit(filters);
  }
}
