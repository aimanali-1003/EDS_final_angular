// src/app/org-management/org-management.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../org.model';

@Component({
  selector: 'app-org-management',
  templateUrl: './org-management.component.html',
  styleUrls: ['./org-management.component.css']
})
export class OrgManagementComponent implements OnInit {
  orgs: Organization[] = [];
  newOrg: Organization = {
    id: '',
    OrgName: '',
    OrgCode: '',
    ClientID: 0,
    CreatedAt: 0,
    CreatedBy: '',
    UpdatedAt: 0,
    UpdatedBy: '',
    Active: false
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadOrgs();
  }

  loadOrgs() {
    this.http.get<Organization[]>('https://lr7rg.wiremockapi.cloud/orgs').subscribe(orgs => {
      this.orgs = orgs;
    });
  }

  createOrg() {
    this.http.post('https://lr7rg.wiremockapi.cloud/orgs', this.newOrg).subscribe(() => {
      this.loadOrgs(); // Refresh the organization list
      this.newOrg = {  // Clear the form fields
        id: '',
        OrgName: '',
        OrgCode: '',
        ClientID: 0,
        CreatedAt: 0,
        CreatedBy: '',
        UpdatedAt: 0,
        UpdatedBy: '',
        Active: false
      };
    });
  }

  updateOrg(org: Organization) {
    this.http.put(`https://lr7rg.wiremockapi.cloud/orgs/${org.id}`, org).subscribe(() => {
      this.loadOrgs(); // Refresh the organization list
    });
  }

  deleteOrg(id: string) {
    this.http.delete(`https://lr7rg.wiremockapi.cloud/orgs/${id}`).subscribe(() => {
      this.loadOrgs(); // Refresh the organization list
    });
  }
}
