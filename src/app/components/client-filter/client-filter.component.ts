import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-filter',
  templateUrl: './client-filter.component.html',
  styleUrls: ['./client-filter.component.css']
})
export class ClientFilterComponent implements OnInit {
  selectedFields: { ClientName: boolean; id: boolean; CreatedAt: boolean; CreatedBy: boolean; UpdatedAt: boolean; UpdatedBy: boolean; Status: boolean } = {
    ClientName: false,
    id: false,
    CreatedAt: false,
    CreatedBy: false,
    UpdatedAt: false,
    UpdatedBy: false,
    Status: false,
  };


  isPopupVisible: boolean = false;
  jsonData: any;
  startDate: string = '';
  endDate: string = '';
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
}
