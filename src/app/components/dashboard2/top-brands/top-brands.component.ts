import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';
import { ChartOptions } from 'src/app/pages/charts/area/area.component';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import moment from 'moment';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { Subscription } from 'rxjs';
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
  imports: [
    MatCardModule,
    MatIconModule,
    TablerIconsModule,
    NgApexchartsModule,
    MaterialModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './top-brands.component.html',
})
export class TopBrandsComponent implements OnInit {
  public yearlysaleChart: Partial<ChartOptions> | any;
  displayedColumns1: string[] = ['vendor', 'links', 'entries'];
  // dataSource1 = PRODUCT_DATA;
  dataSource1: any;
  displayedColumns2: string[] = ['productName', 'vulnerabilities'];
  // dataSource2 = CISCO_DATA;
  dataSource2: any;
  // dataSource3 = F5_DATA;
  dataSource3: any;
  // dataSource4 = FORTINET_DATA;
  dataSource4: any;
  // dataSource5 = SOLAR_DATA;
  dataSource5: any;
  topEffected: any;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private vulnerabilitiesService: VulnerabilitiesService,
    public vulnerabilityDataService: VulnerabilityDataService,
    private localStorageService: VulnerabilityDataService
  ) {
    //  this.affectedBrands();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.localStorageService.startDate$.subscribe(() => {
        this.getAffectedProduct('Cisco');
        // this.getAffectedProduct("Alcatel-Lucent");
        this.getAffectedProduct('F5');
        this.getAffectedProduct('Fortinet');
        this.getAffectedProduct('Solarwinds');
        this.getTopAffectedProduct();
      })
    );
    // this.getTopAffectedProduct();
  }

  // getTopAffectedProduct() {
  //   const fromDate = localStorage.getItem('startDate');
  //   const toDate = localStorage.getItem('endDate');
  //   const payload = {
  //     vendor:'Alcatel-Lucent',
  //     fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
  //     toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
  //   };

  //   this.vulnerabilitiesService.getTopAffectedProducts(payload).subscribe((res) => {

  //          console.log('getTopAffectedProduct',res)
  //           this.topEffected=res;

  //   });
  // }
  getTopAffectedProduct() {
    const fromDate = localStorage.getItem('startDate');
    const toDate = localStorage.getItem('endDate');
    const payload = {
      fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
      toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
    };

    this.vulnerabilitiesService
      .getTopAffectedProducts(payload)
      .subscribe((res) => {
        const vendorCounts = res.reduce((acc: any, item: any) => {
          const vendor = item.vendor;
          if (!acc[vendor]) {
            acc[vendor] = 0;
          }
          acc[vendor] += item.vulnerabilitesCount;
          return acc;
        }, {});

        const result = Object.entries(vendorCounts).map(
          ([vendor, totalCount]) => ({
            vendor,
            totalCount,
          })
        );

        this.affectedBrands(result);
        this.dataSource1 = result;
      });
  }

  getAffectedProduct(Vendor: any) {
    this.vulnerabilityDataService.show();
    const fromDate = localStorage.getItem('startDate');
    const toDate = localStorage.getItem('endDate');
    const payload = {
      vendor: Vendor,
      fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
      toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
    };

    this.vulnerabilitiesService
      .getAffectedProducts(payload)
      .subscribe((res) => {
        // Correct sorting based on vulnerabilitesCount
        const sortedData = res
          .sort(
            (a: any, b: any) => b.vulnerabilitiesCount - a.vulnerabilitiesCount
          )
          .slice(0, 10);

        if (Vendor === 'Cisco') {
          this.dataSource2 = sortedData;
        } else if (Vendor === 'F5') {
          this.dataSource3 = sortedData;
        } else if (Vendor === 'Fortinet') {
          this.dataSource4 = sortedData;
        } else if (Vendor === 'Solarwinds') {
          this.dataSource5 = sortedData;
        }
        this.vulnerabilityDataService.hide();
      });
  }

  private affectedBrands(asset: any) {
    const vendors = asset.map((item: any) => item.vendor);
    const counts = asset.map((item: any) => item.totalCount);
    this.yearlysaleChart = {
      series: [
        {
          name: '',
          // data: [1000,20000,3000,4000,5000],
          data: counts,
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
        // categories: ["Cisco","F5","MICROSOFT","Fortinet","Solarwinds"],
        categories: vendors,
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
