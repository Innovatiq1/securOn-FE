import { Component, Input, OnInit, } from '@angular/core';
import moment from 'moment';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { Router } from '@angular/router';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
};
@Component({
  selector: 'app-asset-by-vendor',
  standalone: true,
  imports: [NgApexchartsModule,MaterialModule],
  templateUrl: './asset-by-vendor.component.html',
})
export class AssetByVendorComponent implements OnInit{
  @Input() isActive = false;
  public toggleSwitchState: boolean = true;
  public vendorChart: Partial<ChartOptions> |  any = {series: [] };
  assetByBrand:any;
  byVendor: any;
constructor(private vulnerabilitiesService:VulnerabilitiesService,private vulnerabilityDataService: VulnerabilityDataService,public router: Router){
  // this.affectedBrands();
  // this.getCircularDashboardData();
}
ngOnInit(): void {

  this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
    this.byVendor = data?.assetsByBrand;
    // console.log("data",this.byVendor)
    if ( this.byVendor) {
      this.affectedBrands(this.byVendor);
    } else {
      console.warn('assetByBrand is undefined or null.');
    }
  });
  
}
// getCircularDashboardData(){
//   const fromDate = localStorage.getItem('startDate');
//   const toDate = localStorage.getItem('endDate');
//   const payload = {
//     fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
//     toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
//     duration: '',
//     allData: this.toggleSwitchState
//   };
 
// //   this.vulnerabilitiesService.loadVulnerabilitiesByDateRange(payload).subscribe((res)=>{
// //     console.log("getCircular",typeof res.assetsByBrand);
// //     if (res && res.assetByBrand) {
// //     this.assetByBrand=res.assetByBrand;
// //     console.log("venders")
// //     //  const vendors = res.assetByBrand.map((item: any) => item.vendor);
// //     //  const counts = res.assetByBrand.map((item: any) => item.count);
// // //  console.log("venders",vendors)
// // //  console.log("counts",counts)
    
// //  this.affectedBrands();
// //     }
// //   })
// }
// getCircularDashboardData() {
//   const fromDate = localStorage.getItem('startDate');
//   const toDate = localStorage.getItem('endDate');
//   const payload = {
//     fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
//     toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
//     duration: '',
//     allData: this.toggleSwitchState,
//   };

//   // this.vulnerabilityDataService.setDataLoading(true);

//   this.vulnerabilitiesService.loadVulnerabilitiesByDateRange(payload).subscribe(
//     async (response) => {
//       try {
//         if (response) {
         
//           this.assetByBrand = response.assetsByBrand;
//           if (response.assetsByBrand) {
//             this.affectedBrands(response.assetsByBrand);
//           } else {
//             console.warn('assetByBrand is undefined or null.');
//           }
//         }
//       } catch (error) {
//         console.error('Error processing response:', error);
//       }   
//     },
//     (error:any) => {
//       // this.vulnerabilityDataService.setDataLoading(false);
//       console.error('Error fetching data:', error);
//     }
//   );
// }

  private affectedBrands(asset:any) {
    const vendors = asset.map((item: any) => item.vendor);
    const counts = asset.map((item: any) => item.count);
    const maxValue = Math.max(...counts);
    const tickAmount = maxValue < 10 ? maxValue : 10;
    this.vendorChart = {
      series: [
        {
          data:counts
        }
        // {
        //   name: 'Asset1',
        //   data: [4],
        // },
        // {
        //   name: 'Asset2',
        //   data: [7],
        // },
        // {
        //   name: 'Asset3',
        //   data: [6],
        // },
      ],

      chart: {
        type: 'bar',
        fontFamily: 'inherit',
        foreColor: '#a1aab2',
        toolbar: {
          show: false,
        },
        height: 290,
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            this.onChartClick(config.dataPointIndex);
          },
        },
      },
      colors: ['#5D87FF'],
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
            show: true,
          },
        },
      },
      xaxis: {
        categories: vendors,
        axisBorder: {
          show: true,
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
        max: Math.ceil(maxValue), 
        tickAmount: tickAmount,
      },
      tooltip: {
        theme: 'dark',
        custom: function ({
          series,
          seriesIndex,
          dataPointIndex,
          w
        }: {
          series: number[][];
          seriesIndex: number;
          dataPointIndex: number;
          w: any;
        }) {
          const value = series[seriesIndex][dataPointIndex];
          const category = w.config.xaxis.categories[dataPointIndex];
      
          return `<div style="padding: 8px; background-color: #333; color: #fff; border-radius: 4px;">
          <strong>${category}</strong>: ${value}

                  </div>`;
        },
      
      },
    };
  }
  onChartClick(dataPointIndex: number) {
    if (this.byVendor && this.byVendor[dataPointIndex]) {
      const label = this.byVendor[dataPointIndex].vendor;
      this._openVulnerability(label);
    }
  }
  
  
  _openVulnerability(label: string): void {
    const seviarityPayload = {
      allData: false,
      name: 'assetByBrandName',
      fromDate: localStorage.getItem('startDate'),
      type: label,
      toDate: localStorage.getItem('endDate'),
    };
  
    this.router.navigate(['cve/view-AssesstByType'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
  }
}
