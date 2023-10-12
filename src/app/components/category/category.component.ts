import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CATEGORY, CLIENT } from '../constants/table-headers.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private route: ActivatedRoute, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchClients();   
  }

  
  
  openModalForEdit(category: any): void {
    if (category) {
      const categoryId = category.categoryID;
      this.router.navigate(['/editCategory', categoryId]);
    }
  }

  deleteCategory(categoryId: string): void {
    console.log('categoryId:', categoryId); // Debugging line
  
    const confirmation = confirm('Are you sure you want to delete this category');
  
    if (confirmation) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        () => {
          this.displayedCategory = this.displayedCategory.filter(category => category.categoryId !== categoryId);
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
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

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.updateDisplayedClients(1);  
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
    this.displayedCategory = this.category.slice(startIndex, endIndex);
  }
   
}
 