import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { CategorySM } from 'src/app/model/CategoryModel';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  showCategoryForm: boolean = false;
  category: any[] = [];
  displayedCategory: any[] = [];  
  categoryIdToEdit: string | null = null;
  categoryName: string = '';
  pageSize: number = 10; 
  categoryData: any;
  categorySearchQuery: string = '';
  categories: CategorySM[] = [];
  currentPage: number = 1; // Track current page
  totalCategories = 0; 
  categoryId!: number; 

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchCategories();   
  }

  // ViewCategory(category: any): void {
  //   this.categoryData = category; 
  //   this.router.navigate(['/viewCategory/' + category.categoryID+'/'+true]);
  // } 

  ViewCategory(categoryId: number): void {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (response) => {
        if (response.code === 200 && response.data) {
          const category: CategorySM = response.data;
          this.router.navigate(['/viewCategory/' + category.categoryId+'/'+true]);  // Routing to create-client component with client ID
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
    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
    };
  
    this.categoryService.getCategories(params).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.categories = this.categories.concat(response.itemList);
          this.totalCategories = +response.totalCount; // Convert totalCount to a number
        }
      },
      (error) => {
        console.error('Error fetching Categories:', error);
        // Handle error cases
      }
    );
  }

  onPageChange(pageNumber: number) {
    this.updateDisplayedCategory(pageNumber);
  } 

  performCategorySearch(query: string) {
    if (query) {
      this.displayedCategory = this.filterCategories(query);
    } else { 
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
  
  private updateDisplayedCategory(pageNumber: number) {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCategory = this.category
    .slice(0)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // Sort in descending order
    })
    .slice(startIndex, endIndex);
  } 
}
 