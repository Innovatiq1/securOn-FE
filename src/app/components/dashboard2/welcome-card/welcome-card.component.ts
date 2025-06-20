import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [MaterialModule,TablerIconsModule],
  templateUrl: './welcome-card.component.html',
})
export class AppWelcomeCardComponent {
  @Input() byCriticality: any; 
  totalCount: number = 0;

  constructor(private vulnerabilityDataService: VulnerabilityDataService){}

  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byCriticality = data?.byCriticality;
      this.totalCount =
      this.byCriticality?.criticalCount +
      this.byCriticality?.highCount +
      this.byCriticality?.lowCount +
      this.byCriticality?.mediumCount;
    });
  }
}
