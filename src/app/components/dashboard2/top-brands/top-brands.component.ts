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
import { Subscription, finalize } from 'rxjs';
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
        // Sort the response in descending order of vulnerabilitiesCount
        const topProducts = res
          .sort((a: any, b: any) => b.vulnerabilitesCount
          - a.vulnerabilitesCount
          )
          .slice(0, 5);
  
        const result = topProducts.map((item: any) => ({
          vendor: item.vendor,
          totalCount: item.vulnerabilitesCount,
          link: item.link, 
        }));
  
  
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
      .pipe(finalize(() => this.vulnerabilityDataService.hide())) 
      .subscribe(
        (res) => {
          const sortedData = res
            .sort((a: any, b: any) => b.vulnerabilitiesCount - a.vulnerabilitiesCount)
            .slice(0, 5);
  
          if (Vendor === 'Cisco') {
            this.dataSource2 = sortedData;
          } else if (Vendor === 'F5') {
            this.dataSource3 = sortedData;
          } else if (Vendor === 'Fortinet') {
            this.dataSource4 = sortedData;
          } else if (Vendor === 'Solarwinds') {
            this.dataSource5 = sortedData;
          }
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }
  private affectedBrands(asset: any) {
    const vendors = asset.map((item: any) => item.vendor);
    const counts = asset.map((item: any) => item.totalCount);
    // console.log("counts",counts)
    const roundUpToNearestHundred = (num: number) => Math.ceil(num / 100) * 100;

    // Get the max count value and round it up
    const maxValue = Math.max(...counts);
    const yAxisMax = roundUpToNearestHundred(maxValue);
    const tickAmount = Math.ceil(yAxisMax / 1000);
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
        max: yAxisMax||15000,
        tickAmount: tickAmount||3,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
}
