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
import { ToastrService } from 'ngx-toastr';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

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
  constructor(private activeRoute: ActivatedRoute, private vulerabilityService: VulnerabilitiesService,public toastr: ToastrService){}

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
  exportToExcel(): void {
    this.toastr.info('Downloading...', 'Info', {
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-bottom-right',
    });

    const allDataToExport = this._filteredVulnerabilities.map((x: any) => {
      const cvssV31 = x.cve.metrics.cvssMetricV31?.[0];
      const cvssV30 = x.cve.metrics.cvssMetricV30?.[0];
      return {
          'EPSS': cvssV31?.exploitabilityScore || cvssV30?.exploitabilityScore || '-',
          'Max Base Score': cvssV31?.cvssData?.baseScore || cvssV30?.cvssData?.baseScore || '-',
          'Published': x.cve.published || '-',
          'Updated': x.cve.lastModified || '-'
      };
  });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Results');

    const headers = Object.keys(allDataToExport[0]);
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0070c0' } };
        cell.font = { color: { argb: 'FFFFFF' }, bold: true };
        cell.alignment = { vertical: 'top' };
        cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } },
        };
    });

    worksheet.addRow([]); 

    allDataToExport.forEach((x: any) => {
        worksheet.addRow(Object.values(x));
    });
    worksheet.mergeCells('A1:A2');
    worksheet.mergeCells('B1:B2');
    worksheet.mergeCells('C1:C2');
    worksheet.mergeCells('D1:D2');
    worksheet.mergeCells('E1:E2');
    worksheet.mergeCells('F1:F2');
    worksheet.mergeCells('G1:G2');
    worksheet.mergeCells('H1:H2');
    worksheet.mergeCells('I1:I2');
    worksheet.mergeCells('J1:K2');

    const columnWidths = [15, 15, 25, 25];
    columnWidths.forEach((width, index) => {
        worksheet.getColumn(index + 1).width = width;
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        this.toastr.clear();

        this.toastr.success('Download completed', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
        });

        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = '.xlsx';
        FileSaver.saveAs(blob, fileName);
    }).catch((error) => {
        console.error('Error generating Excel file:', error);
        this.toastr.clear();
        this.toastr.error('Error downloading data', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
        });
    });
}
}

  
