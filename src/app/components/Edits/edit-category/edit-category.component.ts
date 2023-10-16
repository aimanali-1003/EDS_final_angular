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

  // categoryId: string = '';
  categoryName: string = '';
  categoryCode: string = '';
  categoryId: string = '';
  updatedCategory: any = {};


  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });
  }


  saveUpdatedCategory() {
    this.updatedCategory = {
      categoryCode: this.categoryCode,
      categoryName: this.categoryName,
      // Include other properties if needed
    };
    this.categoryService.updateCategory(this.categoryId, this.updatedCategory).subscribe(
      (response) => {
        // Handle success, if needed
        console.log('Category updated successfully.', response);
        this.router.navigate(['/category']);
      },
      (error) => {
        // Handle error, if needed
        console.error('Error updating category.', error);
      }
    );
  }

  goToCategoryScreen() {
    this.router.navigate(['/category']);
  }

}
