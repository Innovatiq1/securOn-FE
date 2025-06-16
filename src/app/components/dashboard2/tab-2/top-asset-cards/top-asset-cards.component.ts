import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import moment from 'moment';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
@Component({
  selector: 'app-top-asset-cards',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './top-asset-cards.component.html',
})
export class TopAssetCardsComponent {
  @Input() isActive = false;
  byCriticality: any;
  totalVender:0;
  public toggleSwitchState: boolean = true;
  vendorsList: any;

  constructor(private vulnerabilityDataService: VulnerabilityDataService,private vulnerabilitiesService:VulnerabilitiesService, public router: Router){}
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byCriticality = data?.byCriticality;
      this.vendorsList = data?.byVendors;
      this.totalVender = data?.byVendors.length;
    });
    // this.getCircularDashboardData()
    // this.getAllVendors();
  }

  viewAllVendors() {
    this.router.navigate(['cve/cve-vendorsList'], { 
      queryParams: { vendor: JSON.stringify(this.vendorsList) }
    });
  }
  seviarityList(seviarity: string) {
    const seviarityPayload = {
      allData: false,
      duration: '',
      fromDate: localStorage.getItem('startDate'),
      seviarity: seviarity,
      toDate: localStorage.getItem('endDate'),
    };

    this.router.navigate(['cve/vulnerabilties'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
  }
  // getCircularDashboardData(){
  //   this.vulnerabilityDataService.show();
  //   const fromDate = localStorage.getItem('startDate');
  //   const toDate = localStorage.getItem('endDate');
  //   const payload = {
  //     fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
  //     toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
  //     duration: '',
  //     allData: this.toggleSwitchState
  //   };
  //   this.vulnerabilitiesService.loadVulnerabilitiesByDateRange(payload).subscribe((res)=>{
  //     // console.log("req",res.byVendors);
  //     this.totalVender=res.byVendors.length;
  //     this.vulnerabilityDataService.hide();

  //   })
  // }

  // getAllVendors(){
  //   this.vulnerabilitiesService.getAllVendors().subscribe((res)=>{
  //     // console.log("getAll",res)
  //   })
  // }


}
