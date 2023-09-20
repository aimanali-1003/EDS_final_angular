import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { JobComponent } from './job/job.component';
import { JobLogComponent } from './job-log/job-log.component';
import { DataTemplateComponent } from './data-template/data-template.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' }, // Default route
  // Import the routing modules for clients, jobs, and job logs
  { path: 'clients', component: ClientsComponent },
  { path: 'jobs', component: JobComponent },
  { path: 'job-logs', component: JobLogComponent },
  { path: 'dataTemplate', component: DataTemplateComponent},
  { path: 'joblog', component: JobLogComponent },

  // Add more routes as needed 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
