import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { JobComponent } from './components/job/job.component';
import { JobLogComponent } from './components/job-log/job-log.component';
import { DataTemplateComponent } from './components/data-template/data-template.component';
import { OrgManagementComponent } from './components/org-management/org-management.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
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
  // Add more routes as needed 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
