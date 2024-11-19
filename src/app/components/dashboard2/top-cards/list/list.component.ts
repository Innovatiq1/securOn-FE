import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { ScoreChipComponent } from "../../../score-chip/score-chip.component";
import { CvssAttribute } from 'src/app/pipe/cvss-attribute.pipe';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, ScoreChipComponent,CvssAttribute,CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  searchControl: FormControl = new FormControl("");
  vulerabilities: any[] = [];
  _filteredVulnerabilities: any[] = [];
  _allVulnerabilities: any[] = [];
  constructor(private activeRoute: ActivatedRoute, private vulerabilityService: VulnerabilitiesService){}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['data']) {
        const severity = JSON.parse(params['data']); 
        this.vulerabilityService.getCveDataByCriticality(severity).subscribe((data) => {
          if (Array.isArray(data)) {
            this.vulerabilities = data.map((v: { cveDetails: any; }) => v.cveDetails);
            this._allVulnerabilities = this.vulerabilities;
            this._filteredVulnerabilities = [...this.vulerabilities]; 
          } else {
            console.error('Unexpected data structure:', data);
          }
        });
      }
    });
    this.searchControl.valueChanges.pipe(
      debounceTime(200) 
    ).subscribe((searchText: string) => {
      this._filteredVulnerabilities = this._allVulnerabilities.filter((cve) => {
        return cve.cve?.id.toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }

}

  
