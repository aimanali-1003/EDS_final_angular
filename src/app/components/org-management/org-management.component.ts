import { Component, OnInit } from '@angular/core';
import { OrgService } from 'src/app/services/org.service';
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
    private router: Router,
  ) {
    this.treeControl = new FlatTreeControl<OrgNode>(node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
 
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 
  }

  ngOnInit() {
    // this.fetchOrgs(); 
  }

  transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.organizationCode,
      level: level,
      data: node,
      pathToParents: node.pathToParents // Include pathToParents in the tree node
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
 
  // fetchOrgs() {
  //   this.orgService.getOrgs().subscribe((orgs: any[]) => {
  //     this.orgs = orgs.map(org => ({...org, showParentOrgDetails: false}));
  //     console.log(this.orgs)
  //     this.buildParentOrgsMap();
  //     this.updateDisplayedOrgs(1);
  //   });
  // }
   

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
      // If the search term is empty, reset the organizations
      this.orgs = [];
      this.buildParentOrgsMap();
      this.updateDisplayedOrgs(1);
    } else {
      // Assuming you have an API endpoint to search organizations based on the entered text
      this.orgService.searchOrgs(searchTerm).subscribe((filteredOrgs: any[]) => {
        this.orgs = filteredOrgs.map(org => ({ ...org, showParentOrgDetails: false }));
        console.log(this.orgs);
        this.buildParentOrgsMap();
        this.updateDisplayedOrgs(1);
      });
    }
  }
  
  expandParents(org: any) {
    const parentCode = org['parentOrganizationCode'];
  
    // Expand the immediate parent if it exists
    if (parentCode) {
      const parentNode = this.treeControl.dataNodes.find((node) => node.data['organizationCode'] === parentCode);
      if (parentNode && !this.treeControl.isExpanded(parentNode)) {
        this.treeControl.expand(parentNode);
      }
    }
  
    // Expand the current node
    const currentNode = this.treeControl.dataNodes.find((node) => node.data['organizationCode'] === org['organizationCode']);
    if (currentNode && !this.treeControl.isExpanded(currentNode)) {
      this.treeControl.expand(currentNode);
    }
  
    // Expand the immediate children
    if (org['children'] && org['children'].length > 0) {
      (org['children'] as any[]).forEach((child: any) => {
        const childNode = this.treeControl.dataNodes.find((node) => node.data['organizationCode'] === child['organizationCode']);
        if (childNode && !this.treeControl.isExpanded(childNode)) {
          this.treeControl.expand(childNode);
        }
      });
    }
  }
  
  
  
  buildPathToNode(org: any, pathToNode: string[]) {
    pathToNode.push(org['organizationCode']);
    if (org['parentOrganizationCode']) {
      const parent = this.orgs.find((o) => o['organizationCode'] === org['parentOrganizationCode']);
      if (parent) {
        this.buildPathToNode(parent, pathToNode);
      }
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