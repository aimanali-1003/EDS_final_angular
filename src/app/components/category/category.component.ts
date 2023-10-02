import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { ClientDialogService } from 'src/app/services/client-dialog.service';
import { SharedService } from 'src/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { CATEGORY, CLIENT } from '../constants/table-headers.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  showCategoryForm: boolean = false;
  category: any[] = [];
  displayedCategory: any[] = []; 
  isEditing = false;
  categoryIdToEdit: string | null = null;
  categoryName: string = '';
  pageSize: number = 10; // Adjust as needed
  searchTerm: string = '';
  selectedCategory: any = {};
  dataRecipients: any[] = [];
  notificationRecipients: any[] = [];
  headers = CATEGORY;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    
    private router: Router,
  ) { }

  openModalForCreate(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Create Category',
        fields: [
          { label: 'Category Name', key: 'categoryName', required: true },
          { label: 'Category ID', key: 'categoryId', required: true },
          { label: 'Organization Name', key: 'organizationName', required: false },
          // Add more fields as needed
        ],
        isEditing: false // Explicitly set it to false for a create operation
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the created client data here
        const newData = result.data; // New data
        // Perform create logic with newData
      }
    });
  }
  

  openModalForEdit(catrgoryData?: any): void {
    // const dialogRef = this.dialog.open(ModalComponent, {
    //   width: '400px',
    //   data: {
    //     title: 'Edit Category Details',
    //     fields: [
    //       { label: 'Category Name', key: 'categoryName', required: true },
    //       { label: 'Category ID', key: 'categoryId', required: true },
    //       { label: 'Organization Name', key: 'organizationName', required: false }, 
    //     ],
    //     data: catrgoryData || {},  
    //     isEditing: true  
    //   }
    // });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { 
    //     if (result.isEditing) { 
    //       const updatedData = result.data;  
    //     } else { 
    //       const newData = result.data;  
    //     }
    //   }
    // });
    this.router.navigate(['/editCategory']);
  }
  

  openDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Successfully Deleted', 'Cancel', {
          duration: 2000,
        });
      }
    });
  }
  

  openClientPopup(client?: any): void {
    const isEditing = !!client; // Check if you are editing an existing client

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: isEditing ? 'Edits Client' : 'Create New Client',
        content: isEditing ? 'Update the client details:' : 'Enter client details:',
        inputPlaceholder: 'Client Name',
        cancelText: 'Cancel',
        createText: isEditing ? 'Update' : 'Create', // Use different labels for create and update
        updateText: isEditing ? 'Update' : 'Create',
        isUpdate: isEditing, // Set to true for editing, false for creating
        input: isEditing ? client.ClientName : '', // Initialize with client name if editing
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (isEditing) {
          // Handle the update operation here
          this.updateClient(client, result);
        } else {
          // Handle the create operation here
          this.createNewClient(result);
        }
      }
    });
  }

  updateClient(client: any, updatedValue: string): void { 
  }

  createNewClient(clientName: string): void { 
  }

  

  ngOnInit(): void {
    this.getCategories();
    this.fetchClients();
    
  }

  getCategories(){

    this.categoryService.getCategory().subscribe((category: any[]) => {
      this.category = category;
    });
  }
  fetchClients() {
    this.categoryService.getCategory().subscribe((category: any[]) => {
      this.category = category;
      this.displayedCategory=category;
      console.log('Category:', this.category); // Log the clients array
      this.updateDisplayedClients(1);
    });
  }

  CreateCategory(){
    this.router.navigate(['/createCategory']);
  }
  clearSearch() {
    this.searchTerm = '';  
    this.onSearchChange();  
  }
  
  onSearchChange(event?: Event) {
    if (event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase(); 
      this.displayedCategory = this.category.filter(category =>
        category.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {   
      this.searchTerm = '';  
    }
    
  } 

  onPageChange(pageNumber: number) {
    this.updateDisplayedClients(pageNumber);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedClients(1);  
  }

   

  editClient(client: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Edits Client',
        content: 'Update the client details:',
        inputPlaceholder: 'Client Name',
        cancelText: 'Cancel',
        createText: 'Update', // Use 'Update' for editing
        updateText: 'Update', // Use 'Update' for editing
        isUpdate: true, // Set to true for editing
        input: client.name, // Initialize with client name for editing
      },
    });

    dialogRef.afterClosed().subscribe((updatedClientName) => {
      if (updatedClientName) { 
        client.name = updatedClientName; 
      }
    });
  }

  saveClient() {
    if (this.isEditing && this.categoryIdToEdit) { 
      this.categoryService.updateCategory(this.categoryIdToEdit, { name: this.categoryName }).subscribe(() => {
        this.showCategoryForm = false;
        this.fetchClients();
      });
    } else { 
      this.categoryService.createCategory({ name: this.categoryName }).subscribe(() => {
        this.showCategoryForm = false;
        this.fetchClients();
      });
    }
  }

  cancelEdit() {
    this.showCategoryForm = false;
  }

  deleteClient(category: any) {
    this.categoryService.deleteCategory(category.categoryId).subscribe(() => {
      this.category = this.category.filter(c => c.CategoryID !== this.category);
    });
  }
  

  performClientSearch(query: string) {
    // Implement the search logic specific to the 'clients' component
    // Update your displayedCategory based on the query
  }
  
  applyClientFilter(filterData: any) {
    // Implement the filter logic specific to the 'clients' component
    // Update your displayedCategory based on the filter data
  }
  
  
  
  
  
  private updateDisplayedClients(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCategory = this.category.slice(startIndex, endIndex);
  }
  
  
}
 