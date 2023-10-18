import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryName: string = '';
  categoryCode: string = '';
  categoryId: string = '';
  active: string = '';
  updatedCategory: any = {};
  categoryData: any;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.loadCategoryData();
    });
  }

  loadCategoryData(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe((categoryData: any) => {
      this.categoryData = categoryData;
    })
  }


  saveUpdatedCategory() {

    const updatedClientData = {
      categoryCode: this.categoryData.categoryCode,
      categoryName: this.categoryData.categoryName,
      active: this.categoryData.active
    };
  
    console.log(this.categoryData.categoryCode)
    this.categoryService.updateCategory(this.categoryId, updatedClientData).subscribe(
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

  goToCategoryScreen() {
    this.router.navigate(['/category']);
  }
}
