// generic-view.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.component.html',
  styleUrls: ['./generic-view.component.css'],
})
export class GenericViewComponent implements OnInit {
  @Input() data: any;
  type!: string;
  id!: string;
  

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
      this.id = params['id'];

      // Fetch data based on type and id
      if (this.type === 'Client') {
        // Fetch client data by ID
        this.clientService.getClient(this.id).subscribe((data) => this.data = data);
      } else if (this.type === 'Category') {
        // Fetch category data by ID
        this.categoryService.getCategoryById(this.id).subscribe((data) => this.data = data);
      }
    });
  }
}
