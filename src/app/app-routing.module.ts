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
import { CreateOrgComponent } from './components/create-org/create-org.component';
import { ClientEditComponent } from './components/Edits/client-edit/client-edit.component';
import { EditCategoryComponent } from './components/Edits/edit-category/edit-category.component';
import { EditOrgComponent } from './components/Edits/edit-org/edit-org.component';
import { EditJoblogComponent } from './components/Edits/edit-joblog/edit-joblog.component';
import { EditTemplateComponent } from './components/Edits/edit-template/edit-template.component';
import { EditJobComponent } from './components/Edits/edit-job/edit-job.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' }, // Default route
  // Import the routing modules for clients, jobs, and job logs
  { path: 'clients', component: ClientsComponent, data: { title: 'Clients' } },
  { path: 'jobs', component: JobComponent,data: { title: 'Jobs' } },
  { path: 'job-logs', component: JobLogComponent, data: { title: 'Job Logs' } },
  { path: 'dataTemplate', component: DataTemplateComponent},
  { path: 'joblog', component: JobLogComponent },
  { path: 'orgs', component: OrgManagementComponent },
  { path: 'createTemplate', component: CreateTemplateComponent },
  { path: 'createJob', component: CreateJobComponent },
  { path: 'category', component: CategoryComponent },
  {path:'createClient',component:CreateClientComponent},
  {path:'createOrg',component:CreateOrgComponent},
  {path:'editClient',component:ClientEditComponent},
  {path:'editCategory',component:EditCategoryComponent},
  {path:'editOrg',component:EditOrgComponent},
  {path:'editJoblog',component:EditJoblogComponent},
  {path:'editTemplate',component:EditTemplateComponent},
  {path:'editJob',component:EditJobComponent}, 
  {path:'createCategory',component:CreateCategoryComponent},
  // Add more routes as needed 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
