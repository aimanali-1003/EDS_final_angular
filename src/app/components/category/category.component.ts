import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CATEGORY, CLIENT } from '../constants/table-headers.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
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


  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchClients();   
  }
  
  openModalForEdit(category?: any): void {
    if (category && category.categoryID) {
      const categoryID = category.categoryID;
      this.router.navigate(['/editCategory', categoryID]);
    }
  }

  deleteCategory(category: any): void {
    const categoryId = category; // Assuming 'categoryID' is the correct property name for the category's ID
    console.log(categoryId);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this category?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Call the categoryService to delete the category by ID
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
          // Remove the deleted category from the local 'category' array
          this.category = this.category.filter(c => c.categoryId !== categoryId);
          this.updateDisplayedClients(1); // Update the displayed categories
          this.snackBar.open('Category successfully deleted', 'Close', {
            duration: 2000,
          });
        }, (error) => {
          // Handle error if the delete operation fails
          console.error('Error deleting category:', error);
          this.snackBar.open('Error deleting category', 'Close', {
            duration: 2000,
          });
        });
      }
    });
  }
  

  fetchClients() {
    this.categoryService.getCategory().subscribe((category: any[]) => {
      this.category = category;
      this.displayedCategory=category;
      console.log('Category:', this.category); 
      this.updateDisplayedClients(1);
    });
  }

  CreateCategory(){
    this.router.navigate(['/createCategory']);
  }

  onPageChange(pageNumber: number) {
    this.updateDisplayedClients(pageNumber);
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
    this.category.sort((a, b) => b.categoryID - a.categoryID);
    this.displayedCategory = this.category.slice(startIndex, endIndex);
  }
  
   
}
 