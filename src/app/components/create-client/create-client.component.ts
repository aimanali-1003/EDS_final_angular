import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { timeout } from 'rxjs';

enum OrganizationLVL {
  CONSOLIDATED = 'CONSOLIDATED',
  ROLLUP = 'ROLLUP',
  GPO = 'GPO',
  GROUP = 'GROUP',
  UNIT = 'UNIT',
}

interface FormRow {
  selectedOrgLevel: string;
  filteredOrganizationLevels?: edsClientOrgLevels[];
  selectedSecondDropdownValue?: edsClientOrgLevels;
}



interface OrganizationLevel {
  clientOrgLevelId: number;
  clientId: number;
  code: string;
  description: string;
}

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {


  public organizationLevelsEnum = Object.keys(OrganizationLVL).map((key) => ({
    key,
    value: OrganizationLVL[key as keyof typeof OrganizationLVL],
  }));


  formRows: FormRow[] = [];

  selectedOrganizationLevel: any;
  clientId!: number;
  isEdit: boolean = false;
  isViewOnly: boolean = false;
  selectedOrganization: any;
  clientData: ClientVM = new ClientVM();
  filteredOrganizationLevels: edsClientOrgLevels[] = [];

  selectedOrganizationDescription: string = '';
  formGroup!: FormGroup;
  PageSize: number = 20;
  PageNumber: number = 1;
  searchParams: OrganizationSearchSM = {
    PageNumber: this.PageNumber,
    PageSize: this.PageSize,
    ReqGridLevel: '',
    SearchText: ''
  };
  selectedOrgCode: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
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

              this.setDropdownOptions(this.clientData.edsClientOrgLevels);
              console.log("Client fetched from DB", this.clientData)
            } else {
              console.error('No client found or unsuccessful response.');
            }
          },
          (error) => {
            console.error('Error fetching client:', error);
          }
        );
      }
      else {
        this.addFormRow();
      }
    });
  }

  setDropdownOptions(orgLevels: edsClientOrgLevels[]): void {
    orgLevels.forEach((org) => {
      const filteredOrgs = [{
        clientId: org.clientId,
        clientOrgLevelId: org.clientOrgLevelId,
        organizationCode: org.organizationCode,
        description: org.description,
        parentCode: '',
        organizationLevel: org.organizationLevel
      } as edsClientOrgLevels];

      const selectedSecondDropdownValue = {
        clientId: org.clientId,
        clientOrgLevelId: org.clientOrgLevelId,
        organizationCode: org.organizationCode,
        description: org.description,
        organizationLevel: org.organizationLevel,
        parentCode: '',
      };

      this.formRows.push({
        selectedOrgLevel: org.organizationLevel,
        selectedSecondDropdownValue,
        filteredOrganizationLevels: filteredOrgs,
      });
    });

    // Trigger change detection 
    this.cdr.detectChanges();
  }




  searchOrganizationDescription(event: Event, index: number): void {
    const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (searchValue.length >= 3) {
      this.searchParams.ReqGridLevel = this.formRows[index].selectedOrgLevel.toUpperCase();
      this.searchParams.SearchText = searchValue;

      this.organizationService.getOrganizationLevels(this.searchParams)
        .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
          if (response) {
            console.log(this.filteredOrganizationLevels);
            this.formRows[index].filteredOrganizationLevels = response.itemList.map((org) => ({
              clientId: 0,
              clientOrgLevelId: 0,
              organizationCode: org.code,
              description: org.description,
              organizationLevel: org.levelName,
              parentCode: '',
            }) as edsClientOrgLevels);;
            this.searchParams.SearchText = "";
            //this.filteredOrganizationLevels = response.itemList;
            console.log('After Search filter');
          }
        });
    } else {
      //this.filteredOrganizationLevels = [];
    }
  }

  onOrgSelectChange(row: any, i: number) {
    var selectedOrg = this.formRows[i].filteredOrganizationLevels?.find(x => x.organizationCode === row.code)
    var a = row.selectedSecondDropdownValue = selectedOrg;
  }

  onSelectedOrgChange(n: any, i: number) {

  }
  addFormRow() {
    if (!this.isViewOnly) {
      const newFormRow: FormRow = {
        selectedOrgLevel: ''
      };
      this.formRows.push(newFormRow);
    }
  }


  removeFormRow(index: number) {
    if (!this.isViewOnly) {
      this.formRows.splice(index, 1);
    }
  }

  public searchCtrl: FormControl = new FormControl();

  // onSelectedOrganizationLevelChange(): void {
  //   this.fetchEntriesFromBackend(this.selectedOrganizationLevel);
  // }

  onSelectedOrganizationLevelChanged(selectedOrgLevel: string, rowIndex: number): void {
    this.fetchEntriesFromBackendd(selectedOrgLevel, rowIndex);
    this.formRows[rowIndex].selectedOrgLevel = selectedOrgLevel;
  }



  fetchEntriesFromBackendd(selectedValue: string, rowIndex: number): void {
    this.searchParams.ReqGridLevel = selectedValue.toUpperCase();

    this.organizationService.getOrganizationLevels(this.searchParams)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.formRows[rowIndex].filteredOrganizationLevels = response.itemList.map((org) => ({
            clientId: 0,
            clientOrgLevelId: 0,
            organizationCode: org.code,
            description: org.description,
            organizationLevel: org.levelName,
            parentCode: '',
          }) as edsClientOrgLevels);

          const fetchedOrgData: OrgDataModel = response.itemList[0];
          this.formRows[rowIndex].selectedSecondDropdownValue = {
            clientId: 0,
            clientOrgLevelId: 0,
            organizationCode: fetchedOrgData.code,
            description: fetchedOrgData.description,
            organizationLevel: fetchedOrgData.levelName
          };

        }
      });
  }





  // fetchEntriesFromBackend(selectedValue: string): void {
  //   this.searchParams.ReqGridLevel = selectedValue.toUpperCase();

  //   this.organizationService.getOrganizationLevels(this.searchParams)
  //     .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
  //       if (response) {
  //         this.filteredOrganizationLevels = response.itemList;
  //       }
  //     });
  // }

  onDropdownOpen(index: number): void {
    this.searchParams.SearchText = "";
    this.searchParams.ReqGridLevel = this.formRows[index].selectedOrgLevel.toUpperCase();

    this.organizationService.getOrganizationLevels(this.searchParams)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.formRows[index].filteredOrganizationLevels = response.itemList.map((org) => ({
            clientId: 0,
            clientOrgLevelId: 0,
            organizationCode: org.code,
            description: org.description,
            organizationLevel: org.levelName,
            parentCode: '',
          }) as edsClientOrgLevels);;


          // const fetchedOrgData: OrgDataModel = response.itemList[0];

          // this.formRows[index].selectedSecondDropdownValue = {
          //   clientId: 0,
          //   clientOrgLevelId: 0,
          //   organizationCode: fetchedOrgData.code,
          //   description: fetchedOrgData.description,
          //   organizationLevel: fetchedOrgData.levelName
          // };
        }


      });
  }

  onSelection(org: any) {
    timeout(3000)
    console.error("bcbecibrc")
    console.log(org);
  }

  clearSearch(inputField: HTMLInputElement, index: number): void {
    inputField.value = '';
    this.searchParams.SearchText = "";
    this.searchParams.ReqGridLevel = this.formRows[index].selectedOrgLevel.toUpperCase();

    this.organizationService.getOrganizationLevels(this.searchParams)
      .subscribe((response: ResponseViewModel<OrgDataModel[]>) => {
        if (response) {
          this.formRows[index].filteredOrganizationLevels = response.itemList;
        }
      });
  }

  goToClientScreen() {
    this.router.navigate(['/clients']);
  }

  createUpdateClient(): void {

    if (this.isEdit) {
      this.clientData.edsClientOrgLevels = [];
      this.formRows.forEach((row: any) => {
        const updatedOrgLevel: edsClientOrgLevels = {
          clientOrgLevelId: row.selectedSecondDropdownValue.clientOrgLevelId,
          clientId: row.selectedSecondDropdownValue.clientId,
          organizationCode: row.selectedSecondDropdownValue.organizationCode,
          organizationLevel: row.selectedOrgLevel,
          description: row.selectedSecondDropdownValue.description
        };

        this.clientData.edsClientOrgLevels.push(updatedOrgLevel);
      });
      console.log("Client Data before updation", this.clientData)

      this.clientService.updateClient(this.clientData).subscribe(
        (response) => {

          this.snackBar.open('Client updated successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/clients']);
        },
        (error) => {
          const errorMessage = ((error as any)?.error?.message) || error.message || 'An error occurred while updating the client.';

          console.error('Error updating client:', error);
          this.snackBar.open('Error updating client: ' + errorMessage, 'Close', {
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
        organizationCode: row.selectedSecondDropdownValue.organizationCode,
        organizationLevel: row.selectedOrgLevel,
        description: row.selectedSecondDropdownValue.description
      };

      this.clientData.edsClientOrgLevels.push(newOrgLevel);
    });

    console.log("Client Data before creation", this.clientData)

    // if (this.selectedOrganizationLevel) {
    //   const selectedOrg = this.filteredOrganizationLevels.find(level => level.code === this.selectedOrgCode);

    //   if (selectedOrg) {
    //     const orgs: edsClientOrgLevels = {
    //       clientOrgLevelId: 0,
    //       clientId: 0,
    //       organizationCode: selectedOrg.code,
    //       organizationLevel: this.organizationLevelsEnum.find(level => level.key === this.selectedOrganizationLevel)?.value || '',
    //       description: selectedOrg.description,
    //       isActive: true
    //     };

    //     this.clientData.edsClientOrgLevels.push(orgs);

    //     console.log(this.clientData)
    //   } else {
    //     console.error('Selected organization not found.');
    //   }
    // }

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


  // ValidateFormFields(){
  //   if (!this.clientData) {
  //     this.snackBar.open('Client Name is required.', 'Close', {
  //       duration: 3000,
  //     });
  //     return;
  //   }

  //   if(!this.selectedOrganization.organizationLevel){
  //     this.snackBar.open('Organization Name is required.', 'Close', {
  //       duration: 3000,
  //     });
  //     return;
  //   }
  // }
}