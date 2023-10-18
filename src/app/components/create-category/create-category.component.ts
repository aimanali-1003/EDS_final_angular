import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { categoryDataModel } from 'src/app/Models/CategoryModel';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  categoryName: string = '';
  categoryCode: string = ''; 
  categoryId: string = '';
  currentDatetime = new Date();
  categoryData: categoryDataModel=new categoryDataModel();
  isEdit:boolean = false;
  isViewOnly:boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.isViewOnly = params['isViewOnly'];
      if(this.categoryId != undefined && this.categoryId != "" && this.categoryId != null && this.categoryId != ''){
        this.isEdit = true;
        this.loadCategoryData();
      } 
    });
  }
  loadCategoryData(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe((categoryData: any) => {
      this.categoryData = categoryData; 
    })
  }

  goToCategoryScreen() {
    this.router.navigate(['/category']);
  }

  createUpdateCategory() {
    if (!this.categoryData.categoryName || !this.categoryData.categoryCode) {
      this.snackBar.open('Category Name and Code are required.', 'Close', {
        duration: 3000,
      });
      return; // Prevent further execution if fields are empty
    }
    if(!this.isEdit){ 
      this.categoryService.createCategory(this.categoryData).subscribe(
        (response) => {
          console.log('Category created successfully:', response);
          this.snackBar.open('Category created successfully', 'Close', {
            duration: 3000,
          });
          // Redirect to the category list screen
          this.goToCategoryScreen();
        },
        (error) => {
          console.error('Error creating category:', error);
          // Handle error and show an error message
          this.snackBar.open('Error updating category: ' + error.error, 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        }
      );
    }
    else{ 
      console.log(this.categoryData.categoryCode)
      this.categoryService.updateCategory(this.categoryId, this.categoryData).subscribe(
        (response) => {
          // Handle success, if needed
          console.log('Category updated successfully.', response);
          this.router.navigate(['/category']);
        },
        (error) => {
          // Handle error, if needed
          console.error('Error updating category.', error);
          this.snackBar.open('Error updating category: ' + error.error, 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        }
      );
    }
    
  }
}