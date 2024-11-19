import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';

@Component({
  selector: 'app-top-asset-cards',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './top-asset-cards.component.html',
})
export class TopAssetCardsComponent {
  @Input() isActive = false;
  byCriticality: any;


  constructor(private vulnerabilityDataService: VulnerabilityDataService, public router: Router){}
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byCriticality = data?.byCriticality;
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
}
