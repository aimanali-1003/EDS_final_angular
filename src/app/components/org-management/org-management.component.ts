
// org-management.component.ts
import { Component, OnInit } from '@angular/core';
import { OrgService } from 'src/app/services/org.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-org-management',
  templateUrl: './org-management.component.html',
  styleUrls: ['./org-management.component.css'],
})
export class OrgManagementComponent implements OnInit {
  treeControl: FlatTreeControl<OrgNode>;
  treeFlattener: MatTreeFlattener<any, any>;
  dataSource: MatTreeFlatDataSource<any, any>;

  displayedOrganization: any[] = [];
  orgs: { [key: string]: any; showParentOrgDetails?: boolean }[] = [];
  pageSize: number = 10;
  organizationSearchQuery: string = '';
  parentOrgsMap: { [key: string]: string } = {};

  constructor(
    private orgService: OrgService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.treeControl = new FlatTreeControl<OrgNode>(node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);

    // Initialize the data source for the tree
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit() {
    this.fetchOrgs();
  }
  transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.organizationCode,
      level: level,
      data: node,
    };
  };
  buildParentOrgsMap() {
    const tree: any[] = [];
    const map: any = {};

    this.orgs.forEach(org => {
      const orgCode = org['organizationCode'];
      const parentOrgCode = org['parentOrganizationCode'];
      map[orgCode] = { ...org, children: [] };
      const parentOrg = map[parentOrgCode];
      if (parentOrg) {
        if (!parentOrg.children) {
          parentOrg.children = [];
        }
        parentOrg.children.push(map[orgCode]);
      } else {
        tree.push(map[orgCode]);
      }
    });

    this.dataSource.data = tree;
  }


  fetchOrgs() {
    this.orgService.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs.map(org => ({...org, showParentOrgDetails: false}));
      this.buildParentOrgsMap();
      this.updateDisplayedOrgs(1);
    });
  }
 

  onParentOrgChange(event: any, parentOrgCode: string) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    const parentOrgDetails = this.orgs.find((org) => org['organizationCode'] === parentOrgCode);
    if (parentOrgDetails) {
      console.log(parentOrgDetails); // Handle the fetched parent org details as required
    }
  
    if (this.parentOrgsMap[parentOrgCode]) {
      this.onParentOrgChange(event, this.parentOrgsMap[parentOrgCode]);
    }
  }

  toggleParentOrgDetails(index: number) {
    this.orgs[index].showParentOrgDetails = !this.orgs[index].showParentOrgDetails;
  }

  toggleParentOrgDetailsByCode(parentOrganizationCode: string) {
    const orgIndex = this.orgs.findIndex(org => org['organizationCode'] === parentOrganizationCode);
    if (orgIndex > -1) {
      this.orgs[orgIndex].showParentOrgDetails = !this.orgs[orgIndex].showParentOrgDetails;
    }
  }

  getParentOrgDetails(parentOrganizationCode: string) {
    const parentOrg = this.orgs.find(org => org['organizationCode'] === parentOrganizationCode);
    return parentOrg ? `${parentOrg['organizationLevel']} - ${parentOrg['organizationCode']}` : 'Parent organization details not found';
  }

  viewOrgDetails(org: any) {
    this.router.navigate(['org-details', org['organizationID']]);
  }

  onPageChange(pageNumber: number) {
    this.updateDisplayedOrgs(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedOrgs(1);
  }

  private updateDisplayedOrgs(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedOrganization = this.orgs.slice(startIndex, endIndex);
  }

  performOrganizationSearch(searchTerm: string) {
    this.organizationSearchQuery = searchTerm;
    if (!searchTerm) {
      this.updateDisplayedOrgs(1);
    } else {
      this.displayedOrganization = this.orgs.filter(
        (org) =>
          org['organizationLevel'].toLowerCase().includes(searchTerm.toLowerCase()) ||
          org['organizationCode'].toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
interface OrgNode {
  expandable: boolean;
  name: string;
  level: number;
  data: any;
  children?: OrgNode[];
}

