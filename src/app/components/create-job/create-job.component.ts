import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobVM } from 'src/app/model/JobModel';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';
import { ClientVM } from 'src/app/model/ClientModel';
import { FilterModel } from 'src/app/model/MasterDataModel';
import { MatDialog } from '@angular/material/dialog';
import { TemplateVM } from 'src/app/model/DataTemplateModel';
import { ClientInfoPopupComponent } from '../client-info-popup/client-info-popup.component';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})

export class CreateJobComponent implements OnInit {
  clients: ClientVM[] = [];
  pageSize: number = 10;
  totalClients = 0;
  currentPage: number = 1;

  dataRecipientTypeLookups: FilterModel[] = [];
  fileFormatTypeLookups: FilterModel[] = [];
  frequencyTypeLookups: FilterModel[] = [];
  dayofWeekLookups: FilterModel[] = [];
  selectedFrequencyTypeLookups: any;
  selectedDayOfWeekTypeLookups: any;
  selectedRecipientType: any;
  selectedFileFormatType: any;
  selectedTemplate: any;

  jobData: JobVM = new JobVM();
  templates: TemplateVM[] = [];
  isViewOnly: boolean = false;
  jobId!: number;
  isEdit: boolean = false;

  selectedDate: string | null = null;
  selectedTime: string | null = null;

  associatedCategoryName: string | null = null;
  associatedColumns: any[] = [];

  selectedTemplateId!: number;
  columnName!: string | null;
  columnCode!: string;

  constructor(
    private jobService: JobService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dataService: DataService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchTemplates();
    this.fetchClients();
    this.loadLookupData();
  
    this.route.params.subscribe((params) => {
      this.jobId = +params['jobId'];
      this.isViewOnly = params['isViewOnly'];
      if (this.jobId) {
        this.isEdit = true;
        this.jobService.getJob(this.jobId).subscribe(
          (response) => {
            if (response.code === 200 && response.data) {
              this.jobData = response.data;
              this.selectedTemplate = this.jobData.template.templateId;
  
              this.selectedRecipientType = this.jobData.dataRecipientTypeLkpId;
              this.selectedFileFormatType = this.jobData.fileFormatLkpId;
              this.selectedFrequencyTypeLookups = response.data.frequencyLkpValue;
              this.selectedDayOfWeekTypeLookups = response.data.dayOfWeekLkpValue;
              const template = response.data.template;
              if (template && template.edsTemplateColumns) {
                this.associatedColumns = template.edsTemplateColumns.map((column: any) => column.columnName);
              }

              if (template && template.category) {
                this.associatedCategoryName = template.category.categoryName || null;
              }

              const startDate = response.data.startDate;

              if (startDate) {
                const startDateTime = new Date(startDate);
                this.selectedDate = startDateTime.toISOString().split('T')[0];
                this.selectedTime = startDateTime.toTimeString().split(' ')[0];
              }

            } else {
              console.error('No client found or unsuccessful response.');
            }
          },
          (error) => {
            console.error('Error fetching client:', error);
          }
        );
      }
    });
  }
  
  showClientInfoDialog(): void { 
    const dialogRef = this.dialog.open(ClientInfoPopupComponent, {
      width: '700px', 
      data: { client: this.clients.find(c => c.clientId === this.jobData.client.clientId) }
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  fetchTemplates(): void {
    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
    };

    this.dataService.getDataTemplates(params).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.templates = this.templates.concat(response.itemList);
          console.log(this.templates);
          this.totalClients = +response.totalCount;
        }
      },
      (error) => {
        console.error('Error fetching templates:', error);
      }
    );
  }

onTemplateSelectionChange(event: any): void {
  const selectedTemplateId = event.value;
  const selectedTemplate = this.templates.find(template => template.templateId === selectedTemplateId);

  if (selectedTemplate) {
    this.selectedTemplate = selectedTemplate.templateId;
    this.associatedCategoryName = selectedTemplate.category?.categoryName || null;

    this.associatedColumns = selectedTemplate.edsTemplateColumns
      .map((column: any) => column.columns?.columnName)
      .filter((columnName: any) => columnName !== null && columnName !== undefined) as string[];
  } 
  console.log(this.selectedTemplate, "    ", this.associatedCategoryName, "    ", this.associatedColumns);
}



  fetchClients(): void {
    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
    };

    this.clientService.getClients(params).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.clients = this.clients.concat(response.itemList);
          this.totalClients = +response.totalCount;
        }
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  loadLookupData(): void {
    this.dataService.getAllGroupLookups().subscribe(
      (data: any) => {
        if (data && data.itemList) {
          const recipientTypeLookup = data.itemList.find((item: any) => item.lookupType === 'DataRecipientType');
          this.dataRecipientTypeLookups = recipientTypeLookup ? recipientTypeLookup.masterDataLookups : [];
          const fileFormatLookup = data.itemList.find((item: any) => item.lookupType === 'FileFormat');
          this.fileFormatTypeLookups = fileFormatLookup ? fileFormatLookup.masterDataLookups : [];
          const frequencyLookup = data.itemList.find((item: any) => item.lookupType === 'Frequency');
          this.frequencyTypeLookups = frequencyLookup ? frequencyLookup.masterDataLookups : [];
          const dayofWeekLookup = data.itemList.find((item: any) => item.lookupType === 'DayofWeek');
          this.dayofWeekLookups = dayofWeekLookup ? dayofWeekLookup.masterDataLookups : [];
        } else {
          console.error('Invalid lookup data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching lookup data:', error);
      }
    );
  }

  goToJobScreen() {
    this.router.navigate(['/jobs']);
  }

  createUpdatejob(): void {
    this.jobData.template.templateId = this.selectedTemplate;
    this.jobData.dataRecipientTypeLkpId = this.selectedRecipientType;
    this.jobData.fileFormatLkpId = this.selectedFileFormatType;
    this.jobData.templateId = this.selectedTemplate;
    this.jobData.clientId = this.jobData.client.clientId;
    
    const selectedDayofWeek = this.dayofWeekLookups.find(type => type.name === this.selectedDayOfWeekTypeLookups);
    if(selectedDayofWeek){
      this.jobData.dayOfWeekLkpId = selectedDayofWeek?.id;
    }
    
    const selectedFrequency = this.frequencyTypeLookups.find(type => type.name === this.selectedFrequencyTypeLookups);
    if (selectedFrequency) {
      this.jobData.frequencyLkpId = selectedFrequency?.id;
    } else {
      console.error('Selected frequency type not found');
      return;
    }
  
    if (this.selectedTime) {
      const currentTime = new Date();
      const [hours, minutes] = this.selectedTime.split(':').map(Number);
      currentTime.setHours(hours, minutes);
  
      if (!this.selectedDate) {
        // If startTime is present and startDate is absent, assign startTime as startDate
        this.jobData.startDate = currentTime;
      } else {
        // If both startDate and startTime are available
        const startDateTime = new Date(this.selectedDate);
        startDateTime.setHours(hours, minutes);
        this.jobData.startDate = startDateTime;
      }
    }
    
    if (this.isEdit) {
      console.log('updating job data', this.jobId);
      this.jobService.updateJob(this.jobData)
        .subscribe(
          () => {
            this.snackBar.open('Job edited successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/jobs']);
          },
          (error) => {
            console.error('Error updating job:', error);
            this.snackBar.open('Error updating job: ' + error, 'Close', {
              duration: 3000,
            });
          }
        );
    } else {
      this.jobService.createJob(this.jobData)
        .subscribe(
          () => {
            this.snackBar.open('Job created successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/jobs']);
          },
          (error) => {
            console.error('Error creating job:', error);
            this.snackBar.open('Error creating job: ' + error, 'Close', {
              duration: 3000,
            });
          }
        );
    }
  }
}
