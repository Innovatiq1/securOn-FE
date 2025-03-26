import moment from 'moment';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { Component, ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-assets-by-type',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, ScoreChipComponent, CvssAttribute, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-assets-by-type.component.html',
  styleUrl: './view-assets-by-type.component.scss'
})
export class ViewAssetsByTypeComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchControl: FormControl = new FormControl("");
  vulerabilities: any[] = [];
  titleHead = '';
  _filteredVulnerabilities = new MatTableDataSource<any>([]);
  constructor(private activeRoute: ActivatedRoute, private vulerabilityService: VulnerabilitiesService, public toastr: ToastrService, public vulnerabilityDataService: VulnerabilityDataService) {
    // this.getAssetByType();
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.vulnerabilityDataService.show(); // Show loader before processing begins

      if (params['data']) {
        const severity = JSON.parse(params['data']);
        this.titleHead = severity.title;
        const playload = {
          type: severity.type,
          fromDate: severity.fromDate ? moment(severity.fromDate).format('YYYY-MM-DD') : '',
          toDate: severity.toDate ? moment(severity.toDate).format('YYYY-MM-DD') : '',
        }
        if (severity.name == 'assetByBrandName') {
          this.vulerabilityService.getAssetsByBrandName(playload).subscribe((data: any) => {
            if (Array.isArray(data)) {
              this.vulerabilities = data;
              this._filteredVulnerabilities.data = this.vulerabilities;
              this._filteredVulnerabilities.paginator = this.paginator;
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
        else {
          this.vulerabilityService.getAssetsByType(playload).subscribe((data: any) => {
            if (Array.isArray(data)) {
              this.vulerabilities = data;
              this._filteredVulnerabilities.data = this.vulerabilities;
              this._filteredVulnerabilities.paginator = this.paginator;
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


      }
    });

  }

  ngAfterViewInit() {
    this._filteredVulnerabilities.paginator = this.paginator;
  }
  back() {
    window.history.back();
  }

}
