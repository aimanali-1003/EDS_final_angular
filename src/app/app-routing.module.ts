import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { JobComponent } from './components/job/job.component';
import { JobLogComponent } from './components/job-log/job-log.component';
import { DataTemplateComponent } from './components/data-template/data-template.component';
import { OrgManagementComponent } from './components/org-management/org-management.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { CategoryComponent } from './components/category/category.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component'; 
import { EditOrgComponent } from './components/Edits/edit-org/edit-org.component';
import { EditJoblogComponent } from './components/Edits/edit-joblog/edit-joblog.component'; 
import { EditJobComponent } from './components/Edits/edit-job/edit-job.component';
import { OrgDetailsComponent } from './components/org-details/org-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' }, // Default route
  // Import the routing modules for clients, jobs, and job logs
  { path: 'clients', component: ClientsComponent, data: { title: 'Clients' } },
  { path: 'jobs', component: JobComponent,data: { title: 'Jobs' } },
  { path: 'job-logs', component: JobLogComponent, data: { title: 'Job Logs' } },
  { path: 'clients', component: ClientsComponent, data: { title: 'Clients' } },
  { path: 'jobs', component: JobComponent,data: { title: 'Jobs' } },
  { path: 'job-logs', component: JobLogComponent, data: { title: 'Job Logs' } },
  { path: 'dataTemplate', component: DataTemplateComponent},
  { path: 'joblog', component: JobLogComponent },
  { path: 'orgs', component: OrgManagementComponent },
  { path: 'createTemplate', component: CreateTemplateComponent },
  
  {path:'editTemplate/:id',component:CreateTemplateComponent},

  { path: 'category', component: CategoryComponent },
  { path:'createClient',component:CreateClientComponent}, 
  { path:'editClient/:clientId',component:CreateClientComponent},
  { path:'viewClient/:clientId/:isViewOnly',component:CreateClientComponent},
  {
    path: 'editCategory/:id',
    component: CreateCategoryComponent 
  },

  { path:'viewCategory/:id/:isViewOnly',component:CreateCategoryComponent},
  { path: 'createJob', component: CreateJobComponent },
  { path:'viewJob/:jobId/:isViewOnly',component: CreateJobComponent},
  { path:'editJob/:jobId',component:CreateClientComponent},
  {path:'createCategory',component:CreateCategoryComponent},
  {path:'editOrg',component:EditOrgComponent},
  {path:'editJoblog',component:EditJoblogComponent},
  {path:'editJob',component:EditJobComponent},  
  { path: 'org-details/:id', component: OrgDetailsComponent },
  // Add more routes as needed 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
