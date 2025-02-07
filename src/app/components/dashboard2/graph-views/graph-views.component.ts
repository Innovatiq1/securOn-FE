import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { CvssAttribute } from 'src/app/pipe/cvss-attribute.pipe';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';

@Component({
  selector: 'app-graph-views',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule,CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './graph-views.component.html',
  styleUrl: './graph-views.component.scss'
})
export class GraphViewsComponent {
  searchControl: FormControl = new FormControl("");
  _filteredVulnerabilities = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  vulerabilities: any[] = [];
  // _filteredVulnerabilities: any[] = [];
  _allVulnerabilities: any[] = [];
  constructor(private activeRoute: ActivatedRoute, private vulerabilityService: VulnerabilitiesService,public router:Router,public toastr: ToastrService, public vulnerabilityDataService: VulnerabilityDataService){}
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['data']) {
        const severity = JSON.parse(params['data']); 
        if(severity.metrics)
          {
            this.getVenderProductForGraph(severity)
          }
        else if(severity.seviarity){
          this.severity(severity)
        }else if(severity.vendorName){
          this.vendor(severity);
        }else if(severity.type){
          this. byAsset(severity)
        }else if(severity.project){
          this.byContractId(severity)
        }
       
      }
    });
    this.searchControl.valueChanges.pipe(
      debounceTime(200) 
    ).subscribe((searchText: string) => {
      this._filteredVulnerabilities.data = this._allVulnerabilities.filter((cve) => {
        return cve.cveId.toLowerCase().includes(searchText.toLowerCase());
      });
      // console.log('Filtered Vulnerabilities:', this._filteredVulnerabilities);
    });
  }
  ngAfterViewInit() {
    this._filteredVulnerabilities.paginator = this.paginator;
  }
  getVenderProductForGraph(severity: string){
    this.vulnerabilityDataService.show();
    this.vulerabilityService.getVenderProductForGraphs(severity).subscribe((data) => {
      if (Array.isArray(data)) {
        this.vulerabilities = data.map((v: { cveDetails: any; }) => v);
        this._allVulnerabilities = this.vulerabilities;
        this._filteredVulnerabilities.data = this.vulerabilities;
        this._filteredVulnerabilities.paginator = this.paginator;
        this.vulnerabilityDataService.hide();
      } else {
        console.error('Unexpected data structure:', data);
        this.vulnerabilityDataService.hide();
      }
    });
  }

  severity(severity: string){
    this.vulnerabilityDataService.show();
    this.vulerabilityService.getCveDataByCriticality(severity).subscribe((data) => {
      if (Array.isArray(data)) {
        this.vulerabilities = data.map((v: { cveDetails: any; }) => v);
        this._allVulnerabilities = this.vulerabilities;
        this._filteredVulnerabilities.data = this.vulerabilities;
        this._filteredVulnerabilities.paginator = this.paginator;
        this.vulnerabilityDataService.hide();
      } else {
        console.error('Unexpected data structure:', data);
        this.vulnerabilityDataService.hide();
      }
    });
  }
  vendor(severity: string){
    this.vulnerabilityDataService.show();
    this.vulerabilityService.getCveDataByBrand(severity).subscribe((data) => {
      if (Array.isArray(data)) {
        this.vulerabilities = data.map((v: { cveDetails: any; }) => v);
        this._allVulnerabilities = this.vulerabilities;
        this._filteredVulnerabilities.data = this.vulerabilities;
        this._filteredVulnerabilities.paginator = this.paginator;
        this.vulnerabilityDataService.hide();
      } else {
        console.error('Unexpected data structure:', data);
      }
    });
  }
  byAsset(severity: string){
    this.vulnerabilityDataService.show();
    this.vulerabilityService.getCveDataByAsset(severity).subscribe((data) => {
      if (Array.isArray(data)) {
        this.vulerabilities = data.map((v: { cveDetails: any; }) => v);
        this._allVulnerabilities = this.vulerabilities;
        this._filteredVulnerabilities.data = this.vulerabilities;
        this._filteredVulnerabilities.paginator = this.paginator;
        this.vulnerabilityDataService.hide();
      } else {
        console.error('Unexpected data structure:', data);
      }
    });
  }

  byContractId(severity: string){
    this.vulnerabilityDataService.show();
    this.vulerabilityService.getCveDataByProject(severity).subscribe((data) => {
      if (Array.isArray(data)) {
        this.vulerabilities = data.map((v: { cveDetails: any; }) => v);
        this._allVulnerabilities = this.vulerabilities;
        this._filteredVulnerabilities.data = this.vulerabilities;
        this._filteredVulnerabilities.paginator = this.paginator;
        this.vulnerabilityDataService.hide();
      } else {
        console.error('Unexpected data structure:', data);
      }
    });
  }

  back()
  {
    window.history.back();
  }

  view(cveid:number){ 
    this.router.navigate(['cve/vulnerabilty'], {queryParams: {cveId: cveid}});
  }
  exportToExcel(): void {
    this.toastr.info('Downloading...', 'Info', {
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-bottom-right',
    });

    const allDataToExport = this._filteredVulnerabilities.data.map((x: any) => ({
        'CVE ID': x.cveId || '-',
        Severity: x.seviarity || '-',
        Published: x.cveDetails?.cve?.published || '-',
        Brand: x.vendorName || '-',
        'Asset Type': x.type || '-',
        'Part No': x.partNo || '-',
        'Project ID': x.project || '-',
        'Firmware Version': x.version || '-',
        'Serial No': x.serialNo || '-',
        'Fixed Release': x.fixedRelease|| '-',
        'Security Advisory URL':x.advisoryUrl || '-',
        'Security Advisory Title':x.advisoryTitle || '-',
        'Security Impact Rating':x.seviarity || '-',
          'CVSS Base Score':x.cvssScore || '-',
          'Vulnerable Component or Feature':x.vulnerableComponent || '-',
          'Determine Whether Vulnerable Feature is Enabled':x.vulnerableFeature || '-',
          'Workaround/Mitigation':x.workarounds || '-',

    }));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Results');

    const headers = Object.keys(allDataToExport[0]);
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell: any, colNumber: number) => {
      if (colNumber <= 9) { 
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '0070c0' }, 
        };
        cell.font = {
          color: { argb: 'FFFFFF' },
          bold: true,
        };
      } else { 
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '00b050' }, 
        };
        cell.font = {
          color: { argb: 'FFFFFF' },
          bold: true,
        };
      }
    
      cell.alignment = {
        vertical: 'top',
        horizontal: 'center', 
        wrapText: true,       
      };
    
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };
    });

    worksheet.addRow([]); 
    allDataToExport.forEach((item: any) => {
      const dataRow = worksheet.addRow(Object.values(item));
      dataRow.eachCell((cell: any) => {
        cell.alignment = {
          wrapText: true,       
          vertical: 'top',
        };
      });
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
    worksheet.mergeCells('J1:J2');//dfhds
    worksheet.mergeCells('K1:K2');
    worksheet.mergeCells('L1:L2');
    worksheet.mergeCells('M1:M2');
    worksheet.mergeCells('N1:N2');
    worksheet.mergeCells('O1:O2');
    worksheet.mergeCells('P1:P2');
    worksheet.mergeCells('Q1:Q2');

    const columnWidths = [20, 15, 25, 15, 15, 20, 15, 20, 15,15,15,15,15,20,25,30,25];
    columnWidths.forEach((width, index) => {
        worksheet.getColumn(index + 1).width = width;
    });

    workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
        this.toastr.clear();

        this.toastr.success('Download completed', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
        });

        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const fileName = 'Vulnerability_by_Contract_ID.xlsx';
        FileSaver.saveAs(blob, fileName);
    }).catch((error: any) => {
        console.error('Error generating Excel file:', error);
        this.toastr.clear();
        this.toastr.error('Error downloading data', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
        });
    });
}
}
