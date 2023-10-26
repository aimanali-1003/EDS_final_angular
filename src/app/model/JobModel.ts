import { Time } from "@angular/common";

export class JobDataModel {
    public jobType: string;
    public startDate: Date | null;
    public endDate: Date | null;
    public active: boolean;
    public clientId: number | null;
    public client: { orgsOrganizationID: number | null };  
    public orgsOrganizationID: number | null;
    public templateId: number | null;
    public recipientTypeId:  number | null;
    public frequencyType:  string | null;
    public fileFormatType:  string | null;
    public startTime: Time | null;
    public endTime: Time | null;
  
    constructor() {
      this.jobType = "";
      this.startDate = null;
      this.endDate = null;
      this.active = true;
      this.clientId = null;
      this.client = { orgsOrganizationID: null }; // Initialize the 'client' property
      this.templateId = null;
      this.recipientTypeId = null;
      this.frequencyType = "";
      this.fileFormatType = "";
      this.startTime = null;
      this.endTime = null;
      this.orgsOrganizationID = null;
    }
  }
  