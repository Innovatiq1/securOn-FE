import moment from 'moment';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { ScoreChipComponent } from '../../score-chip/score-chip.component';
import { CvssAttribute } from 'src/app/pipe/cvss-attribute.pipe';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';

@Component({
  selector: 'app-view-assets-by-type',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, ScoreChipComponent,CvssAttribute,CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './view-assets-by-type.component.html',
  styleUrl: './view-assets-by-type.component.scss'
})
export class ViewAssetsByTypeComponent {
  

  searchControl: FormControl = new FormControl("");
  vulerabilities: any[] = [];
  _filteredVulnerabilities: any[] = [];
  constructor(private activeRoute: ActivatedRoute, private vulerabilityService: VulnerabilitiesService,public toastr: ToastrService,public vulnerabilityDataService: VulnerabilityDataService){
    // this.getAssetByType();
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.vulnerabilityDataService.show(); // Show loader before processing begins
  
      if (params['data']) {
        const severity = JSON.parse(params['data']);

        console.log("datass",severity)

        const playload={
          type: severity.type,
         fromDate: severity.fromDate ? moment(severity.fromDate).format('YYYY-MM-DD') : '',
         toDate: severity.toDate ? moment(severity.toDate).format('YYYY-MM-DD') : '',
        }

        this.vulerabilityService.getAssetsByType(playload).subscribe((data:any)=>{
        console.log("rrrr",data)
        if (Array.isArray(data)) {
          this.vulerabilities = data;
          this._filteredVulnerabilities = [...this.vulerabilities];
          console.log("this._filteredVulnerabilities",this._filteredVulnerabilities)
        } else {
          console.error('Unexpected data structure:', data);
        }
        this.vulnerabilityDataService.hide(); 
      },
      (error) => {
        console.error('Error fetching data by criticality:', error);
        this.vulnerabilityDataService.hide();
      }


        )
      } 
    });

  }
back(){
  window.history.back();
}

}
