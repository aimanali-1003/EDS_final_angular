export interface ApiResponse {
  isSuccess: boolean;
  message: string;
  itemList: OrgDataModel[]; // Assuming itemList is an array of Client objects
  totalCount: number;
  // Add other properties as needed
}
export class OrgDataModel {
    public organizationID: number | null;
    public organizationCode: string;
    public parentOrganizationCode: string | null;
    public parentOrganizationLevel: string | null;
    public organizationLevel: string | null;
  
    constructor() {
      this.organizationID = null;
      this.organizationCode = '';
      this.parentOrganizationCode = null;
      this.parentOrganizationLevel = null;
      this.organizationLevel = null;
    }
  }
  
  export class OrganizationLevelSM {
    public Id: number;
    public Code: string;
    public ParentCode: string;
    public Description: string;
    public LevelName: string;
  
    constructor() {
      this.Id = 0;
      this.Code = '';
      this.ParentCode = '';
      this.Description = '';
      this.LevelName = '';
    }
  }
  
  export interface OrganizationNode {
    id: number;
    name: string;
    parentId: number | null;
    children?: OrganizationNode[];
  }

  // export const organizationData: OrganizationNode[] = [
  //   { id: 1, name: 'CEO', parentId: null, children: [
  //     { id: 2, name: 'Finance Department', parentId: 1, children: [
  //       { id: 3, name: 'Accounting', parentId: 2 },
  //       { id: 4, name: 'Audit', parentId: 2 }
  //     ]},
  //     { id: 5, name: 'IT Department', parentId: 1, children: [
  //       { id: 6, name: 'Development', parentId: 5 },
  //       { id: 7, name: 'QA', parentId: 5 }
  //     ]},
  //     // Add more departments or levels
  //   ]}
  //   // Add more nodes or departments
  // ];
  
  export interface OrgDataModel {
    id: number;
    code: string;
    parentCode: string;
    description: string;
    levelName: string;
    // Other properties...
  }