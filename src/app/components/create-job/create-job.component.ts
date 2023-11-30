import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobVM } from 'src/app/model/JobModel';
import { ClientService } from 'src/app/services/client.service';
import { DataService } from 'src/app/services/data.service';
import { ClientVM } from 'src/app/model/ClientModel';
import { FilterModel } from 'src/app/model/MasterDataModel';
import { TemplateVM } from 'src/app/model/DataTemplateModel';

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

  constructor(
    private jobService: JobService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dataService: DataService,
    private clientService: ClientService,
  ) { }

  // ngOnInit(): void {
  //   this.fetchTemplates();
  //   this.fetchClients();
  //   this.loadLookupData();

  //   this.route.params.subscribe((params) => {
  //     this.jobId = +params['jobId'];
  //     this.isViewOnly = params['isViewOnly'];
  //     if (this.jobId) {
  //       this.isEdit=true;
  //       this.jobService.getJob(this.jobId).subscribe(
  //         (response) => {
  //           if (response.code === 200 && response.data) {
  //             this.jobData = response.data;
  //             this.selectedTemplate = this.templates.find(template => template.templateId === this.jobData.template.templateId);

  //             this.selectedRecipientType = this.jobData.dataRecipientTypeLkpId;
  //             this.selectedFileFormatType = this.jobData.fileFormatLkpId;
  //             this.selectedFrequencyTypeLookups = response.data.frequencyLkpValue;

  //           } else {
  //             console.error('No client found or unsuccessful response.');
  //           }
  //         },
  //         (error) => {
  //           console.error('Error fetching client:', error);
  //         }
  //       );
  //     }
  //   })
  // }
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
              this.selectedTemplate = this.templates.find(template => template.templateId === this.jobData.template.templateId);
  
              this.selectedRecipientType = this.jobData.dataRecipientTypeLkpId;
              this.selectedFileFormatType = this.jobData.fileFormatLkpId;
              this.selectedFrequencyTypeLookups = response.data.frequencyLkpValue;
  
              this.onTemplateSelectionChange(); // Call the method here
  
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

  onTemplateSelectionChange(): void {
    console.log("Inside on Template selection change")
    if (this.selectedTemplate) {
      this.associatedCategoryName = this.selectedTemplate.category?.categoryName || null;
      this.associatedColumns = this.selectedTemplate.category.edsColumns || [];
    }
    console.log(this.selectedTemplate,"    ",this.associatedCategoryName,"    ",this.associatedColumns);
  }

  onTempSelectionChange(): void {
    console.log("Inside on Template selection change in edit and view mode")
    if (this.selectedTemplate) {
      this.associatedCategoryName = this.selectedTemplate.category?.categoryName || null;
      this.associatedColumns = this.selectedTemplate.category.edsColumns || [];
    }
    console.log(this.selectedTemplate,"    ",this.associatedCategoryName,"    ",this.associatedColumns);
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

  async createUpdatejob(): Promise<void> {

    this.jobData.template.templateId = this.selectedTemplate.templateId;
    this.jobData.dataRecipientTypeLkpId = this.selectedRecipientType;
    this.jobData.fileFormatLkpId = this.selectedFileFormatType;
    this.jobData.templateId = this.selectedTemplate.templateId;
    this.jobData.clientId = this.jobData.client.clientId;
    const selectedFrequency = this.frequencyTypeLookups.find(type => type.name === this.selectedFrequencyTypeLookups);

    if (selectedFrequency) {
      this.jobData.frequencyLkpId = selectedFrequency?.id;
    } else {
      console.error('Selected frequency type not found');
    }
    
    if (this.isEdit) {
      console.log('updating job data', this.jobId);
      const response = await this.jobService.updateJob(this.jobData).toPromise();
      this.snackBar.open('Job edited successfully', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/jobs']);
    } else {
      try {

        const response = await this.jobService.createJob(this.jobData).toPromise();
        this.snackBar.open('Job created successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/jobs']);
      } catch (error) {
        console.error('Error creating job:', error);
        this.snackBar.open('Error creating job: ' + error, 'Close', {
          duration: 3000,
        });
      }
    }
  }
}
