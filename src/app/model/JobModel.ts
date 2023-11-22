import { Time } from "@angular/common";
import { ClientVM } from "./ClientModel"; // Assuming ClientVM model is defined
import { TemplateVM } from "./DataTemplateModel"; // Assuming TemplateVM model is defined


export class JobDataModel {
    public JobType: string;
    public StartDate: Date | null;
    public active: boolean;
    public clientId: number | null;
    public client: { orgsOrganizationID: number | null };  
    public orgsOrganizationID: number | null;
    public templateID: number | null;
    public RecipientTypeID: number | null;
    public RecipientTypeName: string | null; // New property for RecipientTypeName
    public frequencyType:  string | null;
    public fileFormatType:  string | null;
    public StartTime: string | null; // Change the type to string
    public endTime: Time | null;
    public Frequency: { FrequencyID: number | null, FrequencyType: string | null } | null; // Include 'frequency' property
    public Template: { TemplateID: number | null, TemplateName: string | null } | null; // Include 'template' property
    public FileFormat: { FileFormatID: number | null, FileFormatName: string | null } | null;
    public Client: { ClientID: number | null, ClientName: string | null } | null;
    public OrganizationID: number | null;
    public OrganizationLevel: string | null;
    public DayofWeek_Lkp: string | null;
    public NotificationCheck: boolean | null;
    public MinRecordCountAlarm: number | null;
    public MaxRecordCountAlarm: number | null;
    public MinRunDurationAlarm: number | null;
    public MaxRunDurationAlarm: number | null;
  
    constructor() {
      this.JobType = "";
      this.StartDate = null;
      this.active = true;
      this.clientId = null;
      this.client = { orgsOrganizationID: null }; // Initialize the 'client' property
      this.templateID = null;
      this.RecipientTypeID = null;
      this.RecipientTypeName = null; // Initialize the new property
      this.frequencyType = "";
      this.fileFormatType = "";
      this.StartTime = null;
      this.endTime = null;
      this.orgsOrganizationID = null;
      this.Frequency = { FrequencyID: null, FrequencyType: null }; // Initialize the 'frequency' property
      this.Template = { TemplateID: null, TemplateName: null }; // Initialize the 'template' property
      this.FileFormat = { FileFormatID: null, FileFormatName: null };
      this.Client = { ClientID: null, ClientName: null };
      this.OrganizationID = null;
      this.OrganizationLevel = null;
      this.DayofWeek_Lkp = null;
      this.NotificationCheck= null;
      this.MinRecordCountAlarm= null;
      this.MaxRecordCountAlarm= null;
      this.MinRunDurationAlarm= null;
      this.MaxRunDurationAlarm= null;
      
    }
  }

export class JobVM {
  jobId: number;
  jobName: string;
  startDate: Date | null;
  templateId: number;
  clientId: number | null;
  fileFormatLkpId: number;
  frequencyLkpId: number;
  dataRecipientTypeLkpId: number;
  dayOfWeekLkpId: number | null;
  notificationCheck: boolean | null;
  minRecordCountAlarm: number | null;
  maxRecordCountAlarm: number | null;
  minRunDurationAlarm: number | null;
  maxRunDurationAlarm: number | null;
  createdBy: string;
  createdAt: Date;
  updatedBy: string | null;
  updatedAt: Date | null;
  isActive: boolean;
  client: ClientVM | null;
  template: TemplateVM;

  constructor(data?: any) {
    if (data) {
      this.jobId = data.jobId || 0;
      this.jobName = data.jobName || '';
      this.startDate = data.startDate ? new Date(data.startDate) : null;
      this.templateId = data.templateId || 0;
      this.clientId = data.clientId || null;
      this.fileFormatLkpId = data.fileFormatLkpId || 0;
      this.frequencyLkpId = data.frequencyLkpId || 0;
      this.dataRecipientTypeLkpId = data.dataRecipientTypeLkpId || 0;
      this.dayOfWeekLkpId = data.dayOfWeekLkpId || null;
      this.notificationCheck = data.notificationCheck || null;
      this.minRecordCountAlarm = data.minRecordCountAlarm || null;
      this.maxRecordCountAlarm = data.maxRecordCountAlarm || null;
      this.minRunDurationAlarm = data.minRunDurationAlarm || null;
      this.maxRunDurationAlarm = data.maxRunDurationAlarm || null;
      this.createdBy = data.createdBy || '';
      this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
      this.updatedBy = data.updatedBy || null;
      this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
      this.isActive = data.isActive || false;
      this.client = data.client ? new ClientVM(data.client) : null;
      this.template = data.template ? new TemplateVM(data.template) : new TemplateVM();
    } else {
      // Set default values if no data is provided
      this.jobId = 0;
      this.jobName = '';
      this.startDate = null;
      this.templateId = 0;
      this.clientId = null;
      this.fileFormatLkpId = 0;
      this.frequencyLkpId = 0;
      this.dataRecipientTypeLkpId = 0;
      this.dayOfWeekLkpId = null;
      this.notificationCheck = null;
      this.minRecordCountAlarm = null;
      this.maxRecordCountAlarm = null;
      this.minRunDurationAlarm = null;
      this.maxRunDurationAlarm = null;
      this.createdBy = '';
      this.createdAt = new Date();
      this.updatedBy = null;
      this.updatedAt = null;
      this.isActive = false;
      this.client = null;
      this.template = new TemplateVM();
    }
  }
}


