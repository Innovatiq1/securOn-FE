import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  NgApexchartsModule
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';
import { ChartOptions } from 'src/app/pages/charts/area/area.component';
export interface productsData {
  id: number;
  vendor: string;
  link: string;
  entries: number;
}
export interface ciscoData {
  id: number;
  productName: string;
  vulnerabilities: number;
}
const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    vendor: 'Oracle',
    link: 'oracle.com',
    entries: 14778,
  },
  {
    id: 2,
    vendor: 'Apple',
    link: 'apple.com',
    entries: 13950,
  },
  {
    id: 3,
    vendor: 'Microsoft',
    link: 'microsoft.com',
    entries: 13086,
  },
  {
    id: 4,
    vendor: 'Google',
    link: 'google.com',
    entries: 10413,
  },
  {
    id: 5,
    vendor: 'IBM',
    link: 'ibm.com',
    entries: 7360,
  },
  {
    id: 6,
    vendor: 'Linux',
    link: 'linux.com',
    entries: 6609,
  },
];
const CISCO_DATA: ciscoData[] = [
  {
    id: 1,
    productName: 'IOS',
    vulnerabilities: 606,
  },
  {
    id: 2,
    productName: 'Ios Xe',
    vulnerabilities: 492,
  },
  {
    id: 3,
    productName: 'Nx-os',
    vulnerabilities: 279,
  },
  {
    id: 4,
    productName: 'Ios Xr',
    vulnerabilities: 164,
  },
  {
    id: 5,
    productName: 'Firepower Threat Defense',
    vulnerabilities: 198,
  },
];
const F5_DATA: ciscoData[] = [
  {
    id: 1,
    productName: 'Big-ip Access Policy Manager',
    vulnerabilities: 531,
  },
  {
    id: 2,
    productName: 'Big-ip Application Manager',
    vulnerabilities: 482,
  },
  {
    id: 3,
    productName: 'Big-ip Firewall Manager',
    vulnerabilities: 465,
  },
  {
    id: 4,
    productName: 'Big-ip Local Traffic Manager',
    vulnerabilities: 454,
  },
  {
    id: 5,
    productName: 'Big-ip Link Contoller',
    vulnerabilities: 438,
  },
];
const FORTINET_DATA: ciscoData[] = [
  {
    id: 1,
    productName: 'Fortios',
    vulnerabilities: 182,
  },
  {
    id: 2,
    productName: 'Fortiweb',
    vulnerabilities: 84,
  },
  {
    id: 3,
    productName: 'Fortiproxy',
    vulnerabilities: 74,
  },
  {
    id: 4,
    productName: 'Forticlient',
    vulnerabilities: 59,
  },
  {
    id: 5,
    productName: 'Fortimanager',
    vulnerabilities: 57,
  },
];
const SOLAR_DATA: ciscoData[] = [
  {
    id: 1,
    productName: 'Orion Platform',
    vulnerabilities: 49,
  },
  {
    id: 2,
    productName: 'Access Rights Manager',
    vulnerabilities: 32,
  },
  {
    id: 3,
    productName: 'Serv-u',
    vulnerabilities: 29,
  },
  {
    id: 4,
    productName: 'Solarwinds Platform',
    vulnerabilities: 21,
  },
  {
    id: 5,
    productName: 'Serv-u File Server',
    vulnerabilities: 20,
  },
];
@Component({
  selector: 'app-top-brands',
  standalone: true,
  imports: [  MatCardModule,
    MatIconModule,
    TablerIconsModule,
    NgApexchartsModule,
    MaterialModule,
    CommonModule,
    RouterModule],
  templateUrl: './top-brands.component.html'
})
export class TopBrandsComponent {
  public yearlysaleChart: Partial<ChartOptions> | any;
  displayedColumns1: string[] = ['vendor', 'links', 'entries'];
  dataSource1 = PRODUCT_DATA;
  displayedColumns2: string[] = ['productName', 'vulnerabilities'];
  dataSource2 = CISCO_DATA;
  dataSource3 = F5_DATA;
  dataSource4 = FORTINET_DATA;
  dataSource5 = SOLAR_DATA;

constructor(){
  this.affectedBrands();
}

private affectedBrands() {
  this.yearlysaleChart = {
    series: [
      {
        name: '',
        data: [14778, 13950, 13085, 10413, 7360, 500, 500, 500],
      },
    ],

    chart: {
      type: 'bar',
      fontFamily: 'inherit',
      foreColor: '#a1aab2',
      toolbar: {
        show: false,
      },
      height: 290,
    },
    colors: ['#5D87FF', '#5D87FF', '#5D87FF', '#5D87FF', '#5D87FF'],
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '45%',
        distributed: true,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [
        'Oracle',
        'Apple',
        'Microsoft',
        'Google',
        'IBM',
        'Linux',
        'Cisco',
        'Adobe',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (value: number) {
          return value.toFixed(0);
        },
      },
      min: 0,
      max: 15000,
      tickAmount: 3,
    },
    tooltip: {
      theme: 'dark',
    },
  };
}
}
