import { Component, OnInit, Input } from '@angular/core';
import { OrgService } from 'src/app/services/org.service';
import { OrgDataModel } from 'src/app/model/OrgDataModel';
import { OrganizationSearchSM } from 'src/app/model/OrganizationSearch.model';
import { ResponseViewModel } from 'src/app/model/ResponseViewModel';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  displayedOrganizationLevels: OrgDataModel[] = [];
  nodeHierarchy: any[] = [];
  selectedNode!: OrganizationNode;
  totalOrganizationLevels = 0;
  totalCount = 0;
  consolidatedCode: string = '';
  rollupCode: string = '';
  gpoCode: string = '';
  groupCode: string = '';
  unitCode: string = '';
  PageSize: number = 10;
  PageNumber: number = 1;
  searchParams: OrganizationSearchSM = {
    PageNumber: this.PageNumber,
    PageSize: this.PageSize,
    ParentCode: '',
    ConsolidatedCode: this.consolidatedCode,
    RollupCode: this.rollupCode,
    GPOCode: this.gpoCode,
    GroupCode: this.groupCode,
    UnitCode: this.unitCode,
  };
  filters = [
    { placeholder: 'Enter Consolidated Code or Name', value: '' },
    { placeholder: 'Enter Rollup Code or Name', value: '' },
    { placeholder: 'Enter GPO Code or Name', value: '' },
    { placeholder: 'Enter Group Code or Name', value: '' },
    { placeholder: 'Enter Unit Code or Name', value: '' },
  ];

  dataSource!: ArrayDataSource<OrganizationNode>;
  treeControl = new NestedTreeControl<OrganizationNode>(node => node.children);
  hasChild = (_: number, node: OrganizationNode) => !!node.children && node.children.length > 0;

  constructor(private orgService: OrgService) {
    this.dataSource = new ArrayDataSource([]);
  }

  ngOnInit() {
    this.fetchOrganizationLevels();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  submitFilters(): void {
    const updatedSearchParams: OrganizationSearchSM = {
      PageNumber: this.PageNumber,
      PageSize: this.PageSize,
      ConsolidatedCode: this.consolidatedCode,
      RollupCode: this.rollupCode,
      GPOCode: this.gpoCode,
      GroupCode: this.groupCode,
      UnitCode: this.unitCode,
    };
    this.fetchLevelsAndUpdateDataSource(updatedSearchParams);
  }

  onPageChange(event: PageEvent) {
    this.searchParams.PageNumber = event.pageIndex + 1;
    this.searchParams.PageSize = event.pageSize;
    this.fetchOrganizationLevels();
  }

  onPageChangeRollup(event: PageEvent): void {
    this.PageNumber = event.pageIndex + 1;
    this.PageSize = event.pageSize;
    this.fetchChildNodes(this.selectedNode);
  }

  fetchOrganizationLevels(): void {
    this.orgService.getOrganizationLevels(this.searchParams)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.organizationLevels = response.itemList;
          this.totalOrganizationLevels = +response.totalCount;
          this.displayedOrganizationLevels = this.organizationLevels;
          this.updateDataSource(this.organizationLevels);
        }
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
    this.selectedNode = node;
    const levelName = this.getLevelName(node.levelName);

    if (!levelName) {
      console.error('GridLevel not determined for the node:', node);
      return;
    }

    if (!node.children || node.children.length === 0 || node.children) {
      const params: OrganizationSearchSM = {
        PageNumber: this.PageNumber,
        PageSize: this.PageSize,
        ParentCode: node.code,
        ReqGridLevel: levelName
      };

      this.orgService.getOrganizationLevels(params)
        .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
          if (response && response.itemList) {
            this.totalCount = +response.totalCount;
            const childNodes: OrganizationNode[] = this.createNodesFromResponse(response.itemList);
            this.updateNodeChildren(node, childNodes);
          } else {
            node.isExpanded = !node.isExpanded;
          }
        });
    } else {
      node.isExpanded = !node.isExpanded;
      if (!node.isExpanded) {
        node.children = [];
      }
    }
  }

  fetchSubChild(childNode: OrganizationNode): void {
    if (!childNode.children || childNode.children.length === 0) {
      const levelName = this.getLevelName(childNode.levelName);

      if (!levelName) {
        console.error('Sub-GridLevel not determined for the node:', childNode);
        return;
      }

      const subParams: OrganizationSearchSM = {
        PageNumber: 1,
        PageSize: 10,
        ParentCode: childNode.code,
        ReqGridLevel: levelName
      };

      this.orgService.getOrganizationLevels(subParams)
        .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
          if (response && response.itemList) {
            const subChildNodes: OrganizationNode[] = this.createNodesFromResponse(response.itemList);
            this.updateNodeChildren(childNode, subChildNodes);
          }
        });
    } else {
      childNode.isExpanded = !childNode.isExpanded;
      if (!childNode.isExpanded) {
        childNode.children = [];
      }
    }
  }

  private fetchLevelsAndUpdateDataSource(params: OrganizationSearchSM): void {
    this.orgService.getOrganizationLevels(params)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.organizationLevels = response.itemList;
          this.totalOrganizationLevels = +response.totalCount;
          this.displayedOrganizationLevels = this.organizationLevels;
          this.updateDataSource(this.organizationLevels);
          console.log("response",response.itemList)
        }
      });
       
      console.log("params", params);
  }

  private updateDataSource(data: OrgDataModel[]): void {
    const transformedData: OrganizationNode[] = data.map(org => ({
      code: org.code,
      description: org.description,
      levelName: org.levelName,
      children: []
    }));
    this.dataSource = new ArrayDataSource<OrganizationNode>(transformedData);
  }

  private getLevelName(level: string | undefined): string {
    switch (level) {
      case 'CONSOLIDATED':
        return 'ROLLUP';
      case 'ROLLUP':
        return 'GPO';
      case 'GPO':
        return 'GROUP';
      case 'GROUP':
        return 'UNIT';
      default:
        return '';
    }
  }

  private createNodesFromResponse(data: OrgDataModel[]): OrganizationNode[] {
    return data.map(child => ({
      code: child.code,
      description: child.description,
      levelName: child.levelName,
      children: [],
      isExpanded: false
    }));
  }

  private updateNodeChildren(node: OrganizationNode, children: OrganizationNode[]): void {
    node.children = children;
    node.isExpanded = true;
  }
}
