export class JobDataModel {
    public jobType: string;
    public startDate: Date | null;
    public endDate: Date | null;
    public active: boolean;
    public clientId: number | null;
    public client: { orgsOrganizationID: number | null }; // Define a nested 'client' property
  
    constructor() {
      this.jobType = "";
      this.startDate = null;
      this.endDate = null;
      this.active = true;
      this.clientId = null;
      this.client = { orgsOrganizationID: null }; // Initialize the 'client' property
    }
  }
  