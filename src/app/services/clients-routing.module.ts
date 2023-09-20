import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  // Add more routes for other components (e.g., jobs, job logs) here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
