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

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchCategories();   
  }

  ViewCategory(category: any): void {
    this.categoryData = category; 
    this.router.navigate(['/viewCategory/' + category.categoryID+'/'+true]);
  } 
   
  // fetchCategories() {
  //   this.categoryService.getCategory().subscribe((category: any[]) => {
  //     this.category = category;
  //     this.displayedCategory=category; 
  //     this.updateDisplayedCategory(1);
  //   });
  // } 

  fetchCategories(): void {
    const params = {
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
      // Add other parameters as required by your API
    };
  
    this.categoryService.getCategories(params).subscribe(
      (response) => {
        if (response.code === 200 && response.itemList) {
          this.categories = this.categories.concat(response.itemList);
          this.totalCategories = +response.totalCount; // Convert totalCount to a number
        }
        // Handle if itemList doesn't exist or other scenarios
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
 