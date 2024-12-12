import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { ToastrService } from 'ngx-toastr';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
@Component({
  selector: 'app-schedule-logs',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './schedule-logs.component.html',
  styleUrl: './schedule-logs.component.scss'
})
export class ScheduleLogsComponent implements  OnInit {


  @Input() isActive = false;
  schedulerLogsData:any;
  UserActivityLogsData:any

  private subscriptions: Subscription = new Subscription();
  constructor(private vulnerabilitiesService:VulnerabilitiesService,private localStorageService: VulnerabilityDataService, public toastr: ToastrService,){}
  ngOnInit(): void {
    this.getSchedulerLog();
    this.getUserActivityLog();

    this.subscriptions.add(
      this.localStorageService.startDate$.subscribe(() => {
        this.getSchedulerLog();
        this.getUserActivityLog();
      })
    );

    // this.subscriptions.add(
    //   this.localStorageService.endDate$.subscribe(() => {
    //     this.getSchedulerLog();
    //     this.getUserActivityLog();
    //   })
    // );
}

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}

getSchedulerLog(){
  const fromDate = localStorage.getItem('startDate');
  const toDate = localStorage.getItem('endDate');
  const payload = {
    fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
    toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',

  };
  this.vulnerabilitiesService.getSchedulerLogs(payload).subscribe((res)=>{
    this.schedulerLogsData=res;
    // this.dataSource=res;
    // console.log("this.dataSource",this.dataSource)
  })

}
getUserActivityLog(){
  const fromDate = localStorage.getItem('startDate');
  const toDate = localStorage.getItem('endDate');
  const payload = {
    fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
    toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',

  };
  this.vulnerabilitiesService.getUserActivityLogs(payload).subscribe((res)=>{
    this.UserActivityLogsData=res;
    // this.dataSource=res;
    // console.log("this.dataSource",this.dataSource)
  })

}
schedulerExcel(): void {
  this.toastr.info('Downloading...', 'Info', {
      timeOut: 0,
      extendedTimeOut: 0,
      positionClass: 'toast-bottom-right',
  });

  const allDataToExport = this.schedulerLogsData.map((x: any) => ({
      'Priority': x.meta?.priority || '-',
      'Version': x.meta?.version || '-',
      'Time Stamp': x.meta?.timestamp || '-',
      'Host Name': x.hostname || '-',
      'App Name': x.meta?.appName || '-',
      'Process ID': x.meta?.processId || '-',
      'Message ID': x.meta?.msgId || '-',
      'Message': x.message || '-',

  }));

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Scheduler_logs');

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

  const columnWidths = [15, 10, 30, 25, 20, 10, 15, 30];
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
      const fileName = 'Scheduler_logs.xlsx';
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
schedulerCSV(): void {
this.toastr.info('Downloading...', 'Info', {
  timeOut: 0,
  extendedTimeOut: 0,
  positionClass: 'toast-bottom-right',
});

const allDataToExport = this.schedulerLogsData.map((x: any) => ({
  'Priority': x.meta?.priority || '-',
  'Version': x.meta?.version || '-',
  'Time Stamp': x.meta?.timestamp || '-',
  'Host Name': x.hostname || '-',
  'App Name': x.meta?.appName || '-',
  'Process ID': x.meta?.processId || '-',
  'Message ID': x.meta?.msgId || '-',
  'Message': x.message || '-',
}));


const headers = Object.keys(allDataToExport[0]);
const headerRow = headers.join(',') + '\n'; 
const dataRows = allDataToExport.map((item: any) => {
  return headers.map((header: string) => {
    const value = item[header] || '-';
    const valueStr = String(value);

    return `"${valueStr.replace(/"/g, '""')}"`;
  }).join(',');
}).join('\n');

const csvContent = headerRow + dataRows;
const blob = new Blob([csvContent], {
  type: 'text/csv;charset=utf-8;',
});
const fileName = 'Scheduler_logs.csv';
FileSaver.saveAs(blob, fileName);

this.toastr.clear();
this.toastr.success('Download completed', 'Success', {
  timeOut: 3000,
  positionClass: 'toast-bottom-right',
});
}
auditExcel(): void {
  this.toastr.info('Downloading...', 'Info', {
      timeOut: 0,
      extendedTimeOut: 0,
      positionClass: 'toast-bottom-right',
  });

  const allDataToExport = this.UserActivityLogsData.map((x: any) => ({
      'Priority': x.meta?.priority || '-',
      'Version': x.meta?.version || '-',
      'Time Stamp': x.meta?.timestamp || '-',
      'Host Name': x.hostname || '-',
      'App Name': x.meta?.appName || '-',
      'Process ID': x.meta?.processId || '-',
      'Message ID': x.meta?.msgId || '-',
      'Message': x.message || '-',

  }));

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Audit_logs');

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

  const columnWidths = [15, 10, 30, 25, 10, 10, 15, 30];
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
      const fileName = 'Audit_logs.xlsx';
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
auditCSV(): void {
this.toastr.info('Downloading...', 'Info', {
  timeOut: 0,
  extendedTimeOut: 0,
  positionClass: 'toast-bottom-right',
});

const allDataToExport = this.UserActivityLogsData.map((x: any) => ({
  'Priority': x.meta?.priority || '-',
  'Version': x.meta?.version || '-',
  'Time Stamp': x.meta?.timestamp || '-',
  'Host Name': x.hostname || '-',
  'App Name': x.meta?.appName || '-',
  'Process ID': x.meta?.processId || '-',
  'Message ID': x.meta?.msgId || '-',
  'Message': x.message || '-',
}));


const headers = Object.keys(allDataToExport[0]);
const headerRow = headers.join(',') + '\n'; 
const dataRows = allDataToExport.map((item: any) => {
  return headers.map((header: string) => {
    const value = item[header] || '-';
    const valueStr = String(value);

    return `"${valueStr.replace(/"/g, '""')}"`;
  }).join(',');
}).join('\n');

const csvContent = headerRow + dataRows;
const blob = new Blob([csvContent], {
  type: 'text/csv;charset=utf-8;',
});
const fileName = 'Audit_logs.csv';
FileSaver.saveAs(blob, fileName);

this.toastr.clear();
this.toastr.success('Download completed', 'Success', {
  timeOut: 3000,
  positionClass: 'toast-bottom-right',
});
}
}
