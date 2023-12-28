import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { clientDataModel } from 'src/app/model/ClientModel';
import { OrgService } from 'src/app/services/org.service';
import { ClientVM } from 'src/app/model/ClientModel';
import { MatDialog } from '@angular/material/dialog';
import { ActiveJobsPopupComponent } from '../active-jobs-popup/active-jobs-popup.component';
import { FormControl, FormGroup } from '@angular/forms';
import { OrganizationSearchSM } from 'src/app/model/OrganizationSearch.model';
import { ResponseViewModel } from 'src/app/model/ResponseViewModel';
import { OrgDataModel } from 'src/app/model/OrgDataModel';
import { edsClientOrgLevels } from 'src/app/model/ClientModel';
import { FormBuilder } from '@angular/forms'; 

enum OrganizationLVL {
  Consolidated = 'CONSOLIDATED',
  Rollup = 'ROLLUP',
  GPO = 'GPO',
  Group = 'GROUP',
  Unit = 'UNIT',
}

interface FormRow {
  selectedOrgLevel: string;
  filteredOrganizationLevels?: OrganizationLevel[];
  selectedSecondDropdownValue?: string;
}


interface OrganizationLevel {
  code: string;
  description: string;
}

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  organizationLevelsEnum = Object.keys(OrganizationLVL).map((key) => ({
    key,
    value: OrganizationLVL[key as keyof typeof OrganizationLVL],
  }));

  clientName: string = '';
  organizationLevel!: string;
  formRows: FormRow[] = [];


  // getOrganizations(): any[] {
  //   return [
  //     { code: '001', description: 'Organization One' },
  //     { code: '002', description: 'Organization Two' },
  //     { code: '003', description: 'Another Organization' },
  //     { code: '004', description: 'Some Company' },
  //     { code: '005', description: 'Tech Solutions Inc' },
  //     { code: '006', description: 'Global Innovations' },
  //     { code: '007', description: 'Data Systems Corporation' },
  //   ];
  // }
  

  selectedOrganizationLevel: any ;

  orgs: any[] = [];
  currentDatetime = new Date();
  clientCode: string = '';
  clientId!: number;
  isEdit:boolean = false;
  isViewOnly:boolean = false;
  clientOrg: any[] = [];
  selectedOrganization: any; 
  organizations: any[] = [];
  clients: clientDataModel[] = [];
  clientData: ClientVM = new ClientVM();
  setDisable: boolean = false;

  public searchValue: string = '';
  public levels: any[] = []; 
  public filteredLevels: any[] = [];

  organizationLevels: string[] = Object.values(OrganizationLVL);
 
  filteredOrganizationLevels: OrganizationLevel[] = [];
  organizationLevelControl = new FormControl();
 
selectedOrganizationDescription: string = '';
  formGroup!: FormGroup;
  PageSize: number = 5;
  PageNumber: number = 1;
  searchParams: OrganizationSearchSM = {
    PageNumber: this.PageNumber,
    PageSize: this.PageSize,
    ReqGridLevel: '',
    SearchText: ''
  };
  orgLevels: any[] = []; 

  

  constructor(
    private clientService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private organizationService: OrgService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void { 

    this.formGroup = new FormGroup({
      selectedOrganizationLevel: new FormControl(),
    });

    this.formGroup = this.formBuilder.group({
      clientName: new FormControl(''),
      clientCode: new FormControl(''),
      selectedOrganizationLevel: new FormControl(''),
      selectedSecondDropdownValue: new FormControl(''),

    });

    this.route.params.subscribe((params) => {
      this.clientId = +params['clientId'];
      this.isViewOnly = params['isViewOnly'];
      if (this.clientId) {
        this.isEdit = true;
        this.clientService.getClientById(this.clientId).subscribe(
          (response) => {
            if (response.code === 200 && response.data) {
              this.clientData = response.data;
              this.selectedOrganizationDescription = this.clientData.edsClientOrgLevels[0].organizationCode;
          this.selectedOrganizationLevel = this.clientData.edsClientOrgLevels[0].organizationCode;

          this.setDropdownOptions(this.clientData.edsClientOrgLevels);
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

  isRowDeleted(row: any): boolean {
    // Assuming 'row' contains a property 'isDeleted'
    return row && row.isDeleted;
  }

  setDropdownOptions(orgLevels: any[]): void {
    const orgLevelsEnum = orgLevels.map((level) => ({
      key: level.organizationCode,
      value: level.organizationLevel
    }));

    this.clientData.edsClientOrgLevels.map((org) => {
      const newFormRow: FormRow = {
        selectedOrgLevel: org.organizationLevel,
        selectedSecondDropdownValue: org.organizationCode
      };
      debugger
      this.formRows.push(newFormRow);
    })
    this.selectedOrganizationLevel = orgLevelsEnum;

  }

  searchOrganizationDescription(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (searchValue.length >= 3) {
      // Perform the search and send the request to the backend
      this.searchParams.ReqGridLevel = this.selectedOrganizationLevel.toUpperCase(); // Assuming this is the selected level you want to send
      this.searchParams.SearchText = searchValue; // Text to be sent to the backend for search
      
      this.organizationService.getOrganizationLevels(this.searchParams)
        .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
          if (response) {
            this.filteredOrganizationLevels = response.itemList;
          }
        });
    } else {
      this.filteredOrganizationLevels = [];
    }
  }
  

  addFormRow() {
    const newFormRow: FormRow = {
      selectedOrgLevel: ''
    };

    this.formRows.push(newFormRow);
  }

  removeFormRow(index: number) {
    this.formRows.splice(index, 1);
  }

  public searchCtrl: FormControl = new FormControl();

  onSelectedOrganizationLevelChange(): void {

    this.fetchEntriesFromBackend(this.selectedOrganizationLevel);
  }

  onSelectedOrganizationLevelChanged(selectedOrgLevel: string, rowIndex: number): void {
    this.formRows[rowIndex].selectedOrgLevel = selectedOrgLevel;
    this.formRows[rowIndex].selectedSecondDropdownValue = '';
  
    this.fetchEntriesFromBackendd(selectedOrgLevel, rowIndex);
  }
  

  fetchEntriesFromBackendd(selectedValue: string, rowIndex: number): void {
    this.searchParams.ReqGridLevel = selectedValue.toUpperCase();
  
    this.organizationService.getOrganizationLevels(this.searchParams)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.formRows[rowIndex].filteredOrganizationLevels = response.itemList;
        }
      });
  }
  

  fetchEntriesFromBackend(selectedValue: string): void {
    this.searchParams.ReqGridLevel = selectedValue.toUpperCase();

    this.organizationService.getOrganizationLevels(this.searchParams)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.filteredOrganizationLevels = response.itemList;
        }
      });
  }

  clearSearch(inputField: HTMLInputElement): void {
    inputField.value = '';
  }

  fetchEntriesForDescriptionSearch(selectedValue: string, searchValue: string): void {
    console.log(selectedValue, searchValue);

  }

  goToClientScreen() { 
    this.router.navigate(['/clients']);
  }

  createUpdateClient(): void {
    this.formRows.forEach((row: any) => {
      const newOrgLevel: edsClientOrgLevels = {
        clientOrgLevelId: 0,
        clientId: 0,
        organizationCode: row.selectedOrgLevel,
        organizationLevel: row.selectedSecondDropdownValue,
        isActive: true
      };

      this.clientData.edsClientOrgLevels.push(newOrgLevel);
    });

    if (this.selectedOrganizationLevel) {
      debugger
      const orgs: edsClientOrgLevels = {
        organizationCode: this.selectedOrganizationDescription,
        organizationLevel: this.organizationLevelsEnum.find(level => level.key === this.selectedOrganizationLevel)?.value || '',
        clientOrgLevelId: 0,
        clientId: 0,
        isActive: true
      };

      this.clientData.edsClientOrgLevels.push(orgs);
    }

    const ClientData: ClientVM = new ClientVM({
      clientId: 0,
      clientName: this.clientData.clientName,
      clientCode: this.clientData.clientCode,
      isActive: true,
      organizations: this.clientData.edsClientOrgLevels
    });

    if (this.isEdit) {
      this.clientService.updateClient(this.clientData).subscribe(
        (response) => {
          
          this.snackBar.open('Client edited successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/clients']);
        },
        (error) => {
          const errorMessage = ((error as any)?.error?.message) || error.message || 'An error occurred while updating the client.';
  
          console.error('Error updating job:', error);
          this.snackBar.open('Error updating job: ' + errorMessage, 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      
    this.clientService.createClient(this.clientData).subscribe(
      (response: any) => {
        this.snackBar.open('Client created successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/clients']);
      },
      (error: any) => {
        this.snackBar.open('Error creating client: ' + error.error.message, 'Close', {
          duration: 3000,
        });
      }
    );
    }
  }

  onCreateClientSubmit(): void {
    this.formRows.forEach((row: any) => {
      const newOrgLevel: edsClientOrgLevels = {
        clientOrgLevelId: 0,
        clientId: 0,
        organizationCode: row.selectedSecondDropdownValue,
        organizationLevel: row.selectedOrgLevel,
        isActive: true
      };

      this.clientData.edsClientOrgLevels.push(newOrgLevel);
    });

    if (this.selectedOrganizationLevel) {
      debugger
      const orgs: edsClientOrgLevels = {
        clientOrgLevelId: 0,
        clientId: 0,
        organizationCode: this.selectedOrganizationDescription,
        organizationLevel: this.organizationLevelsEnum.find(level => level.key === this.selectedOrganizationLevel)?.value || '',
        isActive: true
      };

      this.clientData.edsClientOrgLevels.push(orgs);
    }

    // const clientData: ClientVM = new ClientVM({
    //   clientId: 0,
    //   clientName: this.clientData.clientName,
    //   clientCode: this.clientData.clientCode,
    //   isActive: true,
    //   organizations: this.clientData.edsClientOrgLevels
    // });


    this.clientService.createClient(this.clientData).subscribe(
      (response: any) => {
        this.snackBar.open('Client created successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/clients']);
      },
      (error: any) => {
        this.snackBar.open('Error creating client: ' + error.error.message, 'Close', {
          duration: 3000,
        });
      }
    );
  }
  

disableToggleButton(disable: boolean): void {
  const toggleButton = document.getElementById('toggleButton') as HTMLInputElement;
  if (toggleButton) {
    toggleButton.disabled = disable;
  }
}

toggleActiveStatus(): void {
  if (this.clientData && this.clientData.clientId) {
    this.clientService.getJobs(this.clientData.clientId).subscribe(
      (response: any) => {
        console.log("Data is", response);
        if (response.itemList.length > 0) {
          this.clientData.isActive = true;
          this.disableToggleButton(true);
          const dialogRef = this.dialog.open(ActiveJobsPopupComponent, {
            data: { activeJobs: response.itemList }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        } else {
          this.disableToggleButton(false);
        }
      },
      (error: any) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }
}


  ValidateFormFields(){
    if (!this.clientData) {
      this.snackBar.open('Client Name is required.', 'Close', {
        duration: 3000,
      });
      return;
    }

    if(!this.selectedOrganization.organizationLevel){
      this.snackBar.open('Organization Name is required.', 'Close', {
        duration: 3000,
      });
      return;
    }
  }

  fetchDataFromBackend(selectedValue: string) {

    console.log("The selected value is:", selectedValue);
 
  }
  
}

