import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { CategorySM } from 'src/app/model/CategoryModel';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('paginatorRef') paginator!: MatPaginator;

  showCategoryForm: boolean = false;
  category: any[] = [];
  displayedCategory: CategorySM[] = [];  
  categoryIdToEdit: string | null = null;
  categoryName: string = '';
  pageSize: number = 10; 
  categoryData: any;
  categorySearchQuery: string = '';
  categories: CategorySM[] = [];
  pageNumber: number = 1;
  totalCategories = 0; 
  categoryId!: number; 

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchCategories();   
  }

  ViewCategory(categoryId: number): void {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (response) => {
        if (response.code === 200 && response.data) {
          const category: CategorySM = response.data;
          this.router.navigate(['/viewCategory/' + category.categoryId+'/'+true]);
        } else {
          console.error('No category found or unsuccessful response.');
        }
      },
      (error) => {
        console.error('Error fetching client:', error);
      }
    );
  }

  fetchCategories(): void {

    this.categoryService.getCategories({ pageSize: this.pageSize, pageNumber: this.pageNumber }).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.categories = response.itemList;
          this.totalCategories = +response.totalCount;
          this.updateDisplayedCategories(this.pageNumber);
        }
      },
      (error) => {
        console.error('Error fetching Categories:', error);
      }
    );
  }

  updateDisplayedCategories(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCategory = this.categories.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchCategories();
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
}
 