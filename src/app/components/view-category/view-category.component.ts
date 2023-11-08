import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { categoryDataModel } from 'src/app/model/CategoryModel';
import { CategoryService } from 'src/app/services/category.service'; 

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categoryName: string = '';
  categoryCode: string = '';
  categoryId: string = '';
  columns:any=[];
  currentDatetime = new Date();
  categoryData: categoryDataModel = new categoryDataModel();
  isViewOnly: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.isViewOnly = params['isViewOnly'];
      if (this.categoryId != undefined && this.categoryId != "" && this.categoryId != null && this.categoryId != '') {
        this.loadCategoryData();
      }
    });
  }
  loadCategoryData(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe((categoryData: any) => {
      this.categoryData = categoryData;
    }) 
    this.categoryService.getColumnsByCategory(this.categoryId).subscribe((columns: any) => {
      this.columns= columns;
      console.log(this.columns)
  })
}

  goToCategoryScreen() {
    this.router.navigate(['/category']);
  }

}
