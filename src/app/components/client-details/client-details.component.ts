// client-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: any;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const clientId = params['id'];
      if (clientId) {
        this.clientService.getClient(clientId).subscribe(client => {
          this.client = client;
        });
      }
    });
  }
}
