import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-total-asset-by-brand',
  standalone: true,
  imports: [MaterialModule,NgApexchartsModule],
  templateUrl: './total-asset-by-brand.component.html',
})
export class TotalAssetByBrandComponent implements OnInit{
  @Input() isActive = false;
  public brandChart: Partial<ChartOptions> |  any = {series: [] };
  public toggleSwitchState: boolean = true;
  assetByBrand:any;
  totalCount=0;
  constructor(private vulnerabilitiesService:VulnerabilitiesService){
    // this.initializeCharts();
  }
  ngOnInit(): void {
    this.getCircularDashboardData();
    // this.initializeCharts();

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
  //   this.vulnerabilitiesService.loadVulnerabilitiesByDateRange(payload).subscribe((res)=>{
  //     console.log("initializeCharts", res.assetsByBrand);
  //     if (res && res.assetByBrand) {
  //     this.assetByBrand=res.assetByBrand;
  //     console.log("venders")
  //     //  const vendors = res.assetByBrand.map((item: any) => item.vendor);
  //     //  const counts = res.assetByBrand.map((item: any) => item.count);
  // //  console.log("venders",vendors)
  // //  console.log("counts",counts)
      
   
  //     }
  //   })
  // }
  getCircularDashboardData() {
    const fromDate = localStorage.getItem('startDate');
    const toDate = localStorage.getItem('endDate');
    const payload = {
      fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
      toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
      duration: '',
      allData: this.toggleSwitchState,
    };
  
    // this.vulnerabilityDataService.setDataLoading(true);
  
    this.vulnerabilitiesService.loadVulnerabilitiesByDateRange(payload).subscribe(
      async (response) => {
        try {
          if (response) {
           
            this.assetByBrand = response.assetsByBrand;
            if (response.assetsByBrand) {
              this.initializeCharts(response.assetsByBrand);
            } else {
              console.warn('assetByBrand is undefined or null.');
            }
          }
        } catch (error) {
          console.error('Error processing response:', error);
        }   
      },
      (error:any) => {
        // this.vulnerabilityDataService.setDataLoading(false);
        console.error('Error fetching data:', error);
      }
    );
  }
  private initializeCharts(asset:any) {
    const vendors = asset.map((item: any) => item.vendor);
    const counts = asset.map((item: any) => item.count);
    this.totalCount = counts.reduce((sum: number, current: number) => sum + current, 0);
    const baseChartOptions = {
      chart: {
        type: 'donut',
        fontFamily: 'inherit',
        foreColor: '#a1aab2',
        toolbar: {
          show: false,
        },
        height: 270,
      },
      colors: ['#e7ecf0', '#f8c076', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: 5,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      legend: {
        show: true,
        labels: {
          colors: '#ffffff',
        },
        position: 'bottom',
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };

    this.brandChart = {
      ...baseChartOptions,
      series: counts,
      labels: vendors,
    };
  }
}
