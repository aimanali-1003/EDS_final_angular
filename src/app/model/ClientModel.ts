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
    clientId: number;
    clientName: string;
    clientCode: string;
    isActive: boolean;
  
    constructor(data?: any) {
      if (data) {
        this.clientId = data.clientId || 0;
        this.clientName = data.clientName || '';
        this.clientCode = data.clientCode || '';
        this.isActive = data.isActive || false;
      } else {
        // Set default values if no data is provided
        this.clientId = 0;
        this.clientName = '';
        this.clientCode = '';
        this.isActive = false;
      }
    }
  }
  