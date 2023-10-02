import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator'; // Import PageEvent

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() pageSize: number = 10;
  @Input() length: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;

  constructor() { }

  onPageChange(event: PageEvent): void { // Use PageEvent type
    this.pageChange.emit(event.pageIndex + 1);
    this.currentPage = event.pageIndex + 1;
  }
}
