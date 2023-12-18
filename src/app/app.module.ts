import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { DataTemplateComponent } from './components/data-template/data-template.component'; 
import { FormsModule } from '@angular/forms';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientService } from './services/client.service';
import { MatSelectModule } from '@angular/material/select';    
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { JobComponent } from './components/job/job.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { OrgManagementComponent } from './components/org-management/org-management.component'; 
import { ClientFilterComponent } from './components/client-filter/client-filter.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { JobLogComponent } from './components/job-log/job-log.component';
import { MatSortModule } from '@angular/material/sort';
import { OrgService } from './services/org.service';
import { CategoryComponent } from './components/category/category.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateClientComponent } from './components/create-client/create-client.component'; 
import { SearchComponent } from './search/search.component';   
import { OrgDetailsComponent } from './components/org-details/org-details.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';   
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatTreeModule } from '@angular/material/tree';
import { ActiveJobsPopupComponent } from './components/active-jobs-popup/active-jobs-popup.component';
import { TreeListModule } from '@progress/kendo-angular-treelist'; 
import { InputsModule } from '@progress/kendo-angular-inputs';
import {CdkTreeModule} from '@angular/cdk/tree';


@NgModule({
  declarations: [
    AppComponent,  
    DataTemplateComponent,
    ClientsComponent,
    NavbarComponent,
    PaginationComponent, 
    JobComponent,
    OrgManagementComponent, 
    ClientFilterComponent,
    DeleteDialogComponent,
    JobLogComponent,
    CategoryComponent,
    CreateTemplateComponent,
    CreateJobComponent,
    CreateClientComponent, 
    SearchComponent,   
    OrgDetailsComponent, ViewCategoryComponent, ActiveJobsPopupComponent, 
    
  ],
  imports: [
    BrowserModule,
    MatTreeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,  
    MatTableModule,  
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatOptionModule,
    MatSnackBarModule,
    CommonModule,
    MatSortModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDividerModule, 
    MatListModule,
    MatOptionModule,
    MatSnackBarModule,
    CommonModule,
    MatSortModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDividerModule, 
    MatSlideToggleModule,
    MatPaginatorModule, 
    DragDropModule,
    TreeListModule,
    InputsModule,
    CdkTreeModule
  ],
  providers: [DataService, ClientService, DatePipe, OrgService],
  bootstrap: [AppComponent], 
})
export class AppModule {} 
