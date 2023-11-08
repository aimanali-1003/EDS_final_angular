import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobDataModel } from 'src/app/model/JobModel';
import { DataTemplateModel } from 'src/app/model/DataTemplateModel';
import { ClientService } from 'src/app/services/client.service';
import { clientDataModel } from 'src/app/model/ClientModel';
// import { OrgService } from 'src/app/services/org.service';
import { DataService } from 'src/app/services/data.service';
import { OrgDataModel } from 'src/app/model/OrgDataModel';
import { DataRecipientService } from 'src/app/services/data-recipient.service';
import { RecipientTypeDataModel } from 'src/app/model/DataRecipientType.model';
import { FrequencyService } from 'src/app/services/frequency.service';
import { FrequencyDataModel } from 'src/app/model/Frequency.model';
import { FileFormatDataModel } from 'src/app/model/FileFormat.model';
import { FileFormatService } from 'src/app/services/file-format.service';


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  selectedTime!: Date;
  // selectedDays: { [key: string]: boolean } = {}; // Initialize selectedDays object
  isViewOnly: boolean = false;
  jobId: string = '';
  isEdit: boolean = false;
  jobData: JobDataModel = new JobDataModel();
 
  templates: any[] = [];
  template: DataTemplateModel = new DataTemplateModel();
  selectedTemplates: any;
  selectedOrganization: any;
  orgs: any[] = [];
  organizationClients: clientDataModel[] = [];
  selectedOrganizationId: number | null = null;
  selectedClientId: number | null = null;
  clients: any[] = [];
  organizations: OrgDataModel = new OrgDataModel();
  RecipientTypeData: RecipientTypeDataModel = new RecipientTypeDataModel();
  
  selectedDataRecipientTypeId: number | null = null;
  extractionFrequency: string | null = null;

  
// Use the correct data type (e.g., Time) instead of string

  // selectedDate: Date | null = null;

  dataRecipientTypes: RecipientTypeDataModel[] = [];
  frequenciesData: FrequencyDataModel[] = [];
  frequencies: any[] = [];
  fileFormat: any[] = [];
  fileFormatJobs: FileFormatDataModel[] = [];
  ClientData: clientDataModel[] = [];
  fileFormatstore: string | null = null;
  showDateFields: boolean = false;
  combinedDateTime!: string;
  // selectedDay!: string;
  templateId: string = '';

  columns: string[] = [];
  selectedDate: string | null = null;
  selectedDay: string | null = null; 


  constructor(
    private jobService: JobService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dataService: DataService,
    private clientService: ClientService,
    // private orgService: OrgService,
    private dataRecipientService: DataRecipientService,
    private frequencyService: FrequencyService,
    private fileformatService: FileFormatService
    ) {
     
     }


  ngOnInit(): void {

    this.dataRecipientService.getDataRecipeintTypes().subscribe((dataRecipients: any) => {
      this.dataRecipientTypes = dataRecipients;
    });

    this.frequencyService.getFrequency().subscribe((frequencies: any) => {
      this.frequenciesData = frequencies;
    });

    this.fileformatService.getfileFormats().subscribe((fileFormat: any) => {
      this.fileFormatJobs = fileFormat;
    });

    this.clientService.getClients().subscribe((clients: any) => {
      this.ClientData = clients;
      console.log(this.ClientData)
    })



    this.loadTemplatesDropDown();

    this.route.params.subscribe((params) => {
      this.jobId = params['jobId'];
      this.isViewOnly = params['isViewOnly'];


      if (this.jobId != undefined && this.jobId != "" && this.jobId != null && this.jobId != '') {
        this.isEdit = true;
        this.loadJobData();
      }
    })
  }

  loadJobData(): void {
    this.jobService.getJob(this.jobId).subscribe((jobData: any) => {
      this.jobData = jobData;
      console.log('load JOb Data', this.jobData)
    

      this.extractionFrequency = jobData?.Frequency?.FrequencyType || null;
      this.selectedTemplates = this.jobData.Template?.TemplateID;
      this.fileFormatstore = this.jobData.FileFormat?.FileFormatName || null;
      this.selectedDataRecipientTypeId = jobData?.DataRecipient?.RecipientTypeID || null;

      console.log('Start date print',this.jobData.StartDate)
      if (jobData.StartDate) {
        const startDate = new Date(jobData.StartDate);
        this.selectedDate = startDate.toISOString().split('T')[0];
      }

      this.selectedOrganizationId =  this.jobData.OrganizationID;

      this.selectedClientId = this.jobData.Client?.ClientID || null;
      if (this.isViewOnly) {

      }
    });
  }

  // onOrganizationSelected(organizationId: number) {
  //   this.clients = [];
  //   this.organizations.organizationID = organizationId;
  //   this.loadOrganizationClients(organizationId);
  // }


  loadTemplatesDropDown(): void {
    this.dataService.getDataTemplates().subscribe((templates: any[]) => {
      this.templates = templates;
    });
  }

  loadTemplates(templateId: string) {
    console.log('Template ID selected:', templateId);
    this.templateId = templateId;
    this.dataService.getTemplate(templateId).subscribe((template: any) => {
      this.template = template;
      this.viewTemplateColumns();
    });
  }
  
  viewTemplateColumns() {
    this.dataService.getColumnsOfTemplate(this.templateId).subscribe((column: string[]) => {
      this.columns = column;
      console.log(this.columns);
    });
  }


  // loadOrganizations(): void {
  //   this.clientService.getOrgs().subscribe((orgs: any[]) => {
  //     this.orgs = orgs;
  //   });
  // }

  // loadOrganizationClients(organizationId: number): void {

  //   if (organizationId !== null) {
  //     this.orgService.getClientsForOrganization(organizationId)
  //       .subscribe((clients: clientDataModel[]) => {
  //         this.organizationClients = clients;
  //       });
  //   }
  // }

  goToJobScreen() {
    this.router.navigate(['/jobs']);
  }

  ValidateFormFields() {
    if (!this.jobData.JobType) {
      this.snackBar.open('Job Name is required.', 'Close', {
        duration: 3000,
      });
      return;
    }
  }
  createUpdatejob() {

    if (this.selectedDate && this.jobData.StartTime) {
      const combinedDateTime = new Date(this.selectedDate);
      const timeParts = this.jobData.StartTime.split(':');
      combinedDateTime.setHours(+timeParts[0]);
      combinedDateTime.setMinutes(+timeParts[1]);
      this.jobData.StartDate = combinedDateTime;
    }

    this.jobData.templateID = this.selectedTemplates;
    // this.jobData.orgsOrganizationID = this.selectedOrganizationId;
    this.jobData.clientId = this.selectedClientId;
    this.jobData.RecipientTypeID = this.selectedDataRecipientTypeId;
    this.jobData.frequencyType = this.extractionFrequency;
    this.jobData.fileFormatType = this.fileFormatstore;


    console.log('Updating Job',this.jobData)
    if (this.isEdit) {
      console.log('updating job data', this.jobId)

      this.jobService.updateJob(this.jobId, this.jobData).subscribe(
        (response: any) => {
          this.snackBar.open('Job updated successfully', 'Close', {
            duration: 2000,
          });

          this.router.navigate(['/jobs']);
        },
        (error: any) => {
          this.snackBar.open('Error updating job:' + error.error, 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.jobService.createJob(this.jobData).subscribe((response: any) => {

        this.snackBar.open('Job created successfully', 'Close', {
          duration: 3000,
        });

        this.router.navigate(['/jobs']);
      },
        (error) => {
          console.error('Error creating job:', error);
          // Handle error and show an error message
          this.snackBar.open('Error creating job: ' + error.error, 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        }
      );
    }

  }
}
