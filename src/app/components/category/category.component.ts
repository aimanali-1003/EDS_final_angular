import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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
  pageSize: number = 10;
  isViewingCategory: boolean = false;
  categoryData: any;
  categorySearchQuery: string = '';

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

  ViewCategory(category: any): void {
    this.categoryData = category;
    this.isViewingCategory = true;
    this.router.navigate(['/view/Category/' + category.categoryID]);
  }
  
  openModalForEdit(category?: any): void {
    if (category && category.categoryID) {
      const categoryID = category.categoryID;
      this.router.navigate(['/editCategory', categoryID]);
    }
  }

  deleteCategory(category: any): void {
    const categoryId = category;
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
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
          this.category = this.category.filter(c => c.categoryId !== categoryId);
          this.updateDisplayedClients(1); 
          this.snackBar.open('Category successfully deleted', 'Close', {
            duration: 2000,
          });
        }, (error) => {
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


  performCategorySearch(query: string) {
    if (query) {
      this.displayedCategory = this.filterCategories(query);
    } else {
      // If the search query is empty, reset the displayed data to the original data.
      this.displayedCategory = this.category;
    }
  }
  
  filterCategories(query: string): any[] {
    return this.category.filter((category) =>
      category.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      category.categoryCode.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  applyCategoryFilter(filterData: any) {
    this.displayedCategory = this.category.filter((category) => {
      return true;
    });
  }
  
  private updateDisplayedClients(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.category.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // Sort in descending order
    });
    this.displayedCategory = this.category.slice(startIndex, endIndex);
  } 
}
 