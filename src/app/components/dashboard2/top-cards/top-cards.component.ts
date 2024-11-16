import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';

@Component({
  selector: 'app-top-cards',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './top-cards.component.html',
})
export class AppTopCardsComponent {
  @Input() byCriticality: any; 

  constructor(private vulnerabilityDataService: VulnerabilityDataService){}

  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byCriticality = data?.byCriticality;
    });
  }
}
