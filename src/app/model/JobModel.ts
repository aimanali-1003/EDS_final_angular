import { Time } from "@angular/common";

export class JobDataModel {
    public JobType: string;
    public startDate: Date | null;
    public endDate: Date | null;
    public active: boolean;
    public clientId: number | null;
    public client: { orgsOrganizationID: number | null };  
    public orgsOrganizationID: number | null;
    public templateID: number | null;
    public RecipientTypeID: number | null;
    public RecipientTypeName: string | null; // New property for RecipientTypeName
    public frequencyType:  string | null;
    public fileFormatType:  string | null;
    public startTime: Time | null;
    public endTime: Time | null;
    public Frequency: { FrequencyID: number | null, FrequencyType: string | null } | null; // Include 'frequency' property
    public Template: { TemplateID: number | null, TemplateName: string | null } | null; // Include 'template' property
    public FileFormat: { FileFormatID: number | null, FileFormatName: string | null } | null;
  
    constructor() {
      this.JobType = "";
      this.startDate = null;
      this.endDate = null;
      this.active = true;
      this.clientId = null;
      this.client = { orgsOrganizationID: null }; // Initialize the 'client' property
      this.templateID = null;
      this.RecipientTypeID = null;
      this.RecipientTypeName = null; // Initialize the new property
      this.frequencyType = "";
      this.fileFormatType = "";
      this.startTime = null;
      this.endTime = null;
      this.orgsOrganizationID = null;
      this.Frequency = { FrequencyID: null, FrequencyType: null }; // Initialize the 'frequency' property
      this.Template = { TemplateID: null, TemplateName: null }; // Initialize the 'template' property
      this.FileFormat = { FileFormatID: null, FileFormatName: null };
      
    }
  }
  