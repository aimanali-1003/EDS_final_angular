import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorySM, categoryDataModel } from 'src/app/model/CategoryModel';
import { CategoryService } from 'src/app/services/category.service'; 

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categoryName: string = '';
  categoryCode: string = '';
  categoryId!: number;
  columns:any=[];
  currentDatetime = new Date();
  isViewOnly: boolean = false;
  categoryData!: CategorySM;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      this.isViewOnly = params['isViewOnly'];
      if (this.categoryId) {
        this.categoryService.getCategoryById(this.categoryId).subscribe(
          (response) => {
            if (response.code === 200 && response.data) {
              this.categoryData = response.data;
            } else {
              console.error('No category found or unsuccessful response.');
            }
          },
          (error) => {
            console.error('Error fetching category:', error);
          }
        );
      }
    });
  }

  goToCategoryScreen() {
    this.router.navigate(['/category']);
  }

}
