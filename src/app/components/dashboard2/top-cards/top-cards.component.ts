import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-cards',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './top-cards.component.html',
})
export class AppTopCardsComponent {
  @Input() byCriticality: any;
  totalCount: number = 0;

  constructor(
    private vulnerabilityDataService: VulnerabilityDataService,
   
    public router: Router
  ) {}

  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe((data) => {
      this.byCriticality = data?.byCriticality;

      this.totalCount =
      this.byCriticality?.criticalCount +
      this.byCriticality?.highCount +
      this.byCriticality?.lowCount +
      this.byCriticality?.mediumCount;
    });
  }

  seviarityList(seviarity: string) {
    const seviarityPayload = {
      allData: true,
      duration: '',
      fromDate: localStorage.getItem('startDate'),
      seviarity: seviarity,
      toDate: localStorage.getItem('endDate'),
    };

    this.router.navigate(['cve/vulnerabilties'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
  }
}
