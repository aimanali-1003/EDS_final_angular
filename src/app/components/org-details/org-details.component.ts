import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { OrgService } from 'src/app/services/org.service';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.css'],
})
export class OrgDetailsComponent implements OnInit {
  org: any;
  orglevel:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orgService:OrgService
  ) {}

  ngOnInit() { 
    this.route.params.subscribe(params => {
      const orgId = params['id'];  
      this.orgService.getOrgById(orgId).subscribe((orgDetails: any) => {
        this.org=orgDetails; 
        console.log("Org Details",orgDetails)
      });

      this.orgService.getOrgDetails(orgId).subscribe((orgLevelDetails: any) => {
        this.orglevel=orgLevelDetails; 
        console.log("Org level Details",this.orglevel);
      });
    });
  }
  goToOrgScreen() {
    this.router.navigate(['/orgs']);
  }
}
