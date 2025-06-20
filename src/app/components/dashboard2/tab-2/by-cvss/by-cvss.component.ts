import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
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
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { Subscription } from 'rxjs';
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
  selector: 'app-by-cvss',
  standalone: true,
  imports: [MaterialModule,NgApexchartsModule],
  templateUrl: './by-cvss.component.html',
})
export class ByCvssComponent implements OnInit {
  @Input() isActive = false;
  public scoreChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  total:any;
  private subscriptions: Subscription = new Subscription();
constructor(private vulnerabilitiesService: VulnerabilitiesService,public router: Router,private localStorageService: VulnerabilityDataService){
  this.initializeCharts();
}
ngOnInit(): void {
    this.getVenderProductCve();
    this.subscriptions.add(
      this.localStorageService.startDate$.subscribe(() => {
        this.getVenderProductCve();
      })
    );
}


  getVenderProductCve() {
    const fromDate = localStorage.getItem('startDate');
    const toDate = localStorage.getItem('endDate');
    const payload = {
      fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
      toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
    };
  
    this.vulnerabilitiesService.getVenderProductCves(payload).subscribe((res) => {
      if (res) {
        this.total = res.totalCount;
        this.updateChartData(res);
      }
    });
  }
  
  // private initializeCharts() {
  //   const baseChartOptions = {
  //     chart: {
  //       type: 'donut',
  //       fontFamily: 'inherit',
  //       foreColor: '#a1aab2',
  //       toolbar: {
  //         show: false,
  //       },
  //       height: 270,
  //     },
  //     colors: ['#e7ecf0', '#f8c076', '#fb977d', '#0085db'],
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           size: '65%',
  //           background: 'none',
  //           labels: {
  //             show: true,
  //             name: {
  //               show: true,
  //               fontSize: '18px',
  //               color: undefined,
  //               offsetY: 5,
  //             },
  //             value: {
  //               show: false,
  //               color: '#98aab4',
  //             },
  //           },
  //         },
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       show: false,
  //     },
  //     legend: {
  //       show: true,
  //       labels: {
  //         colors: '#ffffff',
  //       },
  //       position: 'bottom',
  //     },
  //     tooltip: {
  //       theme: 'dark',
  //       fillSeriesColor: false,
  //     },
  //   };
  
  //   this.scoreChartOptions1 = {
  //     ...baseChartOptions,
  //     series: [], 
  //     labels: ['Critical', 'High', 'Medium', 'Low'], 
  //   };
  // }
  
  private initializeCharts() {
    const baseChartOptions = {
      chart: {
        type: 'donut',
        fontFamily: 'inherit',
        foreColor: '#a1aab2',
        toolbar: {
          show: false,
        },
        height: 270,
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            const severity = this.scoreChartOptions1.labels[config.dataPointIndex];
            if (severity) {
              this._openVulnerability(severity);
            }
          },
        },
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
  
    this.scoreChartOptions1 = {
      ...baseChartOptions,
      series: [],
      labels: ['Critical', 'High', 'Medium', 'Low'],
    };
  }
  
  // private updateChartData(data: any) {
  //   this.scoreChartOptions1.series = [
  //     data.criticalCount || 0,
  //     data.highCount || 0,
  //     data.mediumCount || 0,
  //     data.lowCount || 0,
  //   ];
  
  // }
  private updateChartData(data: any) {
    const seriesData = [
      data.criticalCount || 0,
      data.highCount || 0,
      data.mediumCount || 0,
      data.lowCount || 0,
    ];
  
    this.total = seriesData.reduce((a, b) => a + b, 0);
  
    if (this.total === 0) {
      this.scoreChartOptions1.series = [0]; 
       this.scoreChartOptions1.labels = ["No Data found"];
       this.scoreChartOptions1.colors = ["#D3D3D3"]; 
       this.scoreChartOptions1.legend = { show: false };
    } else {
      this.scoreChartOptions1.series = seriesData;
      this.scoreChartOptions1.labels = ["Critical", "High", "Medium", "Low"];
      this.scoreChartOptions1.colors = ['#e7ecf0', '#f8c076', '#fb977d', '#0085db'];
      this.scoreChartOptions1.legend = { show: true };
    }
  }
  
  _openVulnerability(seviarity: string): void {
    const seviarityPayload = {
      allData: false,
      duration: '',
      metrics:true,
      fromDate: localStorage.getItem('startDate'),
      seviarity: seviarity.toUpperCase(),
      toDate: localStorage.getItem('endDate'),
    };
  
    this.router.navigate(['cve/vulnerabilties-view'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
  }
}
