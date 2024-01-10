export interface ApiResponse {
    isSuccess: boolean;
    message: string;
    itemList: clientDataModel[]; // Assuming itemList is an array of Client objects
    totalCount: number;
    // Add other properties as needed
  }

  
  export interface clientDataModel {
    id: number;
    name: string;
    code: string;
    organizationId: string;
    // Add other properties as needed
  }

  export class ClientVM {
    clientId: number = 0;
    clientName: string = '';
    clientCode: string = '';
    isActive: boolean = false;
    edsClientOrgLevels: edsClientOrgLevels[] = [];
  
    constructor(data?: any) {
      if (data) {
        this.clientId = data.clientId ?? 0;
        this.clientName = data.clientName ?? '';
        this.clientCode = data.clientCode ?? '';
        this.isActive = data.isActive ?? false;
        this.edsClientOrgLevels = data.organizations
          ? data.organizations.map((column: any) => new edsClientOrgLevels(column))
          : [];
      }
    }
  }


  export class edsClientOrgLevels {
    clientOrgLevelId: number = 0;
    clientId: number = 0;
    organizationCode: string = ''
    organizationLevel: string = ''
    description: string = '' 
    
    constructor(data?: any) {
      if (data) {
        this.clientOrgLevelId = data.clientOrgLevelId ?? 0;
        this.clientId = data.clientId ?? 0;
        this.organizationCode = data.organizationCode ?? '';
        this.organizationLevel = data.organizationLevel ?? '';
        this.description = data.description ?? '';
 
      }
    }
  }
  
  