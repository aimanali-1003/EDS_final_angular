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
  // dummyDataSource: MatTreeFlatDataSource<any, any>;
  // dummyTreeControl: FlatTreeControl<any>; // Adjust the type as needed
  // dummyOrgs = [
  //   {
  //     active: false,
  //     clients: null,
  //     createdAt: "1900-01-01T00:00:00",
  //     createdBy: "Zamaan",
  //     isDeleted: false,
  //     levels: null,
  //     organizationCode: "CompanyA",
  //     organizationID: 1,
  //     organizationLevel: "Headquarters",
  //     parentOrganizationCode: null,
  //     parentOrganizationLevel: "",
  //     showParentOrgDetails: false,
  //     updatedAt: null,
  //     updatedBy: null
  //   },
  //   {
  //     active: false,
  //     clients: null,
  //     createdAt: "1900-01-01T00:00:00",
  //     createdBy: "Zamaan",
  //     isDeleted: false,
  //     levels: null,
  //     organizationCode: "DivisionA",
  //     organizationID: 2,
  //     organizationLevel: "Division",
  //     parentOrganizationCode: "CompanyA",
  //     parentOrganizationLevel: "Headquarters",
  //     showParentOrgDetails: false,
  //     updatedAt: null,
  //     updatedBy: null
  //   },
  //   {
  //     active: false,
  //     clients: null,
  //     createdAt: "1900-01-01T00:00:00",
  //     createdBy: "Zamaan",
  //     isDeleted: false,
  //     levels: null,
  //     organizationCode: "DepartmentA",
  //     organizationID: 3,
  //     organizationLevel: "Department",
  //     parentOrganizationCode: "DivisionA",
  //     parentOrganizationLevel: "Division",
  //     showParentOrgDetails: false,
  //     updatedAt: null,
  //     updatedBy: null
  //   },
  //   {
  //     active: false,
  //     clients: null,
  //     createdAt: "1900-01-01T00:00:00",
  //     createdBy: "Zamaan",
  //     isDeleted: false,
  //     levels: null,
  //     organizationCode: "DepartmentB",
  //     organizationID: 4,
  //     organizationLevel: "Department",
  //     parentOrganizationCode: "DivisionA",
  //     parentOrganizationLevel: "Division",
  //     showParentOrgDetails: false,
  //     updatedAt: null,
  //     updatedBy: null
  //   },
  //   {
  //     active: false,
  //     clients: null,
  //     createdAt: "1900-01-01T00:00:00",
  //     createdBy: "Zamaan",
  //     isDeleted: false,
  //     levels: null,
  //     organizationCode: "DepartmentC",
  //     organizationID: 5,
  //     organizationLevel: "Department",
  //     parentOrganizationCode: "DepartmentB",
  //     parentOrganizationLevel: "Department",
  //     showParentOrgDetails: false,
  //     updatedAt: null,
  //     updatedBy: null
  //   }
  // ];


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

    // Initialize the data source for the main tree
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    // Initialize the data source for the dummy tree
    //this.dummyTreeControl = new FlatTreeControl<any>(node => node.level, node => node.expandable);
    //this.dummyDataSource = new MatTreeFlatDataSource(this.dummyTreeControl, this.treeFlattener);
  }

  ngOnInit() {
    this.fetchOrgs();
    //this.buildDummyDataSource();
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

  // buildDummyDataSource() {
  //   const dummyTree: any[] = [];
  //   const dummyMap: any = {};
    
  //   this.dummyOrgs.forEach((org) => {
  //     const orgCode = org['organizationCode'];
  //     const parentOrgCode = org['parentOrganizationCode'];
  //     dummyMap[orgCode] = { ...org, children: [] };
  //     const parentOrg = parentOrgCode ? dummyMap[parentOrgCode] : null;
  //     if (parentOrg) {
  //       if (!parentOrg.children) {
  //         parentOrg.children = [];
  //       }
  //       parentOrg.children.push(dummyMap[orgCode]);
  //     } else {
  //       dummyTree.push(dummyMap[orgCode]);
  //     }
  //   });
  
  //   this.dummyDataSource.data = dummyTree;
  //   this.dummyTreeControl.dataNodes = dummyTree;
  //   this.dummyTreeControl.expandAll();
  // }
 
  fetchOrgs() {
    this.orgService.getOrgs().subscribe((orgs: any[]) => {
      this.orgs = orgs.map(org => ({...org, showParentOrgDetails: false}));
      console.log(this.orgs)
      this.buildParentOrgsMap();
      this.updateDisplayedOrgs(1);
    });
  }
  // toggleDummyParentOrgDetailsByCode(parentOrganizationCode: string) {
  //   const orgIndex = this.dummyOrgs.findIndex(org => org['organizationCode'] === parentOrganizationCode);
  //   if (orgIndex > -1) {
  //     this.dummyOrgs[orgIndex].showParentOrgDetails = !this.dummyOrgs[orgIndex].showParentOrgDetails;
  //   }
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
