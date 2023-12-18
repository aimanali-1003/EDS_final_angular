import { Component, OnInit, Input } from '@angular/core';
import { OrgService } from 'src/app/services/org.service';
import { OrgDataModel } from 'src/app/model/OrgDataModel';
import { OrganizationSearchSM } from 'src/app/model/OrganizationSearch.model';
import { ResponseViewModel } from 'src/app/model/ResponseViewModel';
import {ArrayDataSource} from '@angular/cdk/collections';
import {NestedTreeControl} from '@angular/cdk/tree';
import { trigger, state, style, animate, transition } from '@angular/animations';


interface OrganizationNode {
  code: string;
  description?: string;
  levelName?: string;
  parentCode?: string | null;
  children?: OrganizationNode[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-org-management',
  templateUrl: './org-management.component.html',
  styleUrls: ['./org-management.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
  
})
export class OrgManagementComponent implements OnInit { 
  
  @Input() sidebarOpen: boolean = false;

  organizationLevels: OrgDataModel[] = [];
  selectedNode: any;
  nodeHierarchy: any[] = [];
  searchParams: OrganizationSearchSM = {
    PageNumber: 1,
    PageSize: 10,
    ParentCode: ''
  };
  // At the top of your component class
// sidebarOpen: boolean = false;

// Inside your component class
toggleSidebar(): void {
  this.sidebarOpen = !this.sidebarOpen;
}

submitFilters(): void {
  const consolidatedCode = (document.querySelector(
    'input[placeholder="Enter Consolidated Code or Name"]'
  ) as HTMLInputElement).value;

  const rollupCode = (document.querySelector(
    'input[placeholder="Enter Rollup Code or Name"]'
  ) as HTMLInputElement).value;

  const gpoCode = (document.querySelector(
    'input[placeholder="Enter GPO Code or Name"]'
  ) as HTMLInputElement).value;

  const groupCode = (document.querySelector(
    'input[placeholder="Enter Group Code or Name"]'
  ) as HTMLInputElement).value;

  const unitCode = (document.querySelector(
    'input[placeholder="Enter Unit Code or Name"]'
  ) as HTMLInputElement).value;

  // Update the searchParams only if the input fields have values
  const updatedSearchParams: OrganizationSearchSM = {
    PageNumber: 1,
    PageSize: 10,
  };

  if (consolidatedCode) {
    updatedSearchParams.ConsolidatedCode = consolidatedCode;
  }

  if (rollupCode) {
    updatedSearchParams.RollupCode = rollupCode;
  }

  if (gpoCode) {
    updatedSearchParams.GPOCode = gpoCode;
  }

  if (groupCode) {
    updatedSearchParams.GroupCode = groupCode;
  }

  if (unitCode) {
    updatedSearchParams.UnitCode = unitCode;
  }

  // Make the API call with the updated searchParams
  this.orgService.getOrganizationLevels(updatedSearchParams)
    .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
      this.organizationLevels = response.itemList;
      console.log('Response from API:', this.organizationLevels);
    });
}


  dataSource!: ArrayDataSource<OrganizationNode>;

  treeControl = new NestedTreeControl<OrganizationNode>(node => node.children);

  hasChild = (_: number, node: OrganizationNode) => {
    return !!node.children && node.children.length > 0;
  };

  constructor(
    private orgService: OrgService,
  ) { 
    this.dataSource = new ArrayDataSource([]);
  }

  ngOnInit() {
    this.fetchOrganizationLevels();
  }

  fetchOrganizationLevels(): void {
    this.orgService.getOrganizationLevels(this.searchParams)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.organizationLevels = response.itemList;
          const transformedData: OrganizationNode[] = this.organizationLevels.map(org => {
            return {
              code: org.code,
              description: org.description,
              levelName: org.levelName,
              children: []
            };
          });
          this.dataSource = new ArrayDataSource<OrganizationNode>(transformedData);
        } else { }
      });
  }

  toggleNode(node: OrganizationNode): void {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.collapse(node);
    } else {
      this.treeControl.expand(node);
    }
  }

  fetchChildNodes(node: OrganizationNode): void {
    let levelName: string = '';
    switch (node.levelName) {
      case 'CONSOLIDATED':
        levelName = 'ROLLUP';
        break;
      case 'ROLLUP':
        levelName = 'GPO';
        break;
      case 'GPO':
        levelName = 'GROUP';
        break;
      case 'GROUP':
        levelName = 'UNIT';
        break;
      default:
        levelName = '';
        break;
    }
  
    if (levelName) {
      if (!node.children || node.children.length === 0) {
        const params: OrganizationSearchSM = {
          PageNumber: 1,
          PageSize: 10,
          ParentCode: node.code,
          ReqGridLevel: levelName
        };
  
        this.orgService.getOrganizationLevels(params)
          .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
            if (response && response.itemList) {
              const childNodes: OrganizationNode[] = response.itemList.map(child => {
                return {
                  code: child.code,
                  description: child.description,
                  levelName: child.levelName,
                  children: [],
                  isExpanded: false
                };
              });
  
              node.children = childNodes;
  
              // Toggle the node to expand or collapse based on the current state
              node.isExpanded = true;
            } else {
              node.isExpanded = !node.isExpanded;
              // Handle empty response or errors
            }
          });
      } else {
        // If nodes are already present, just toggle
        node.isExpanded = !node.isExpanded;
        if (!node.isExpanded) {
          node.children = [];
        }
      }
    } else {
      console.error('GridLevel not determined for the node:', node);
    }
  }
  
  fetchSubChild(childNode: OrganizationNode): void {
    
    if (!childNode.children || childNode.children.length === 0) {

      let levelName: string = '';
      switch (childNode.levelName) {
        case 'CONSOLIDATED':
          levelName = 'ROLLUP';
          break;
        case 'ROLLUP':
          levelName = 'GPO';
          break;
        case 'GPO':
          levelName = 'GROUP';
          break;
        case 'GROUP':
            levelName = 'UNIT';
            break;
        default:
          levelName = '';
          break;
      }
  
      if (levelName) {
        const subParams: OrganizationSearchSM = {
          PageNumber: 1,
          PageSize: 10,
          ParentCode: childNode.code,
          ReqGridLevel: levelName
        };
  
        this.orgService.getOrganizationLevels(subParams)
          .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
            if (response && response.itemList) {
              const subChildNodes: OrganizationNode[] = response.itemList.map(subChild => {
                return {
                  code: subChild.code,
                  description: subChild.description,
                  levelName: subChild.levelName,
                  children: [],
                  isExpanded: false
                };
              });
  
              childNode.children = subChildNodes;
              childNode.isExpanded = true;
              // this.treeControl.expand(childNode);
            } else {
            }
          });
      } else {
        console.error('Sub-GridLevel not determined for the node:', childNode);
      }
    } else {
      childNode.isExpanded = !childNode.isExpanded;
      if (!childNode.isExpanded) {
        childNode.children = [];
      }
    }
  }
}
