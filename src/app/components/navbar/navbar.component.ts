import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';  

interface RouteData {
  title?: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
   
  isSidebarOpen = true;
  pageTitle = 'Entegra Data Staging'; // Default title
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Get the current route's data
        const routeData = this.getCurrentRouteData(
          this.activatedRoute.root
        );

        // Update the title with the route name
        if (routeData && routeData.title) {
          this.pageTitle = routeData.title;
        }
      });
  }
  

  private getCurrentRouteData(route: ActivatedRoute) {
    let routeData: RouteData | null = null;

    while (route.firstChild) {
      route = route.firstChild;
      routeData = route.snapshot.data as RouteData;
    }

    return routeData;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidenav.toggle();
  }

  isClientsPage(): boolean {
    return this.router.url.includes('/clients');
  }
}
