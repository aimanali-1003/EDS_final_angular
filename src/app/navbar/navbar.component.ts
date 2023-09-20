import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidenav.toggle();
  }

  ngAfterViewInit() {
    // This method will be called after the view is initialized.
    // You can access and manipulate the DOM or child components here.
    // For example, you can use this.sidenav to access the MatSidenav instance.
  }
  constructor() { }

  ngOnInit(): void {
  }

}
