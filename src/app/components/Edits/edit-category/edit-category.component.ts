import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  goToCategoryScreen() {
    this.router.navigate(['/category']);
  }

  saveCategory() {
     

    const categoryData = {
      name: this.categoryName,
      id: this.categoryCode,
    };

    console.log('Category edited successfully:');
    this.snackBar.open('Category edited successfully', 'Close', {
      duration: 3000,
    });  
    this.goToCategoryScreen();
  }

}
