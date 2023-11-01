import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router'; 
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
   
  fetchCategories() {
    this.categoryService.getCategory().subscribe((category: any[]) => {
      this.category = category;
      this.displayedCategory=category; 
      this.updateDisplayedCategory(1);
    });
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
 