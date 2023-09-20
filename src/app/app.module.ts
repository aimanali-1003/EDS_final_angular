import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { DataService } from './services/data.service';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { DataTemplateComponent } from './components/data-template/data-template.component';
import { FormsModule } from '@angular/forms';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientService } from './services/client.service';
import { MatSelectModule } from '@angular/material/select'; // Add 
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; // Import Material button module
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FilterComponent } from './components/filter/filter.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JobComponent } from './components/job/job.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { OrgManagementComponent } from './org-management/org-management.component';
import { PopupComponent } from './components/popup/popup.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableDataComponent } from './components/table-data/table-data.component';
@NgModule({
  declarations: [
    AppComponent,
    TemplateListComponent,
    DataTemplateComponent,
    ClientsComponent,
    NavbarComponent,
    PaginationComponent,
    FilterComponent,
    JobComponent,
    OrgManagementComponent,
    PopupComponent,
    TableHeaderComponent,
    TableDataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule, // Add Material button module here
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatOptionModule
  ],
  providers: [DataService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
