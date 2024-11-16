import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
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


  constructor(private vulnerabilityDataService: VulnerabilityDataService){}
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byCriticality = data?.byCriticality;
    });
  }

}
