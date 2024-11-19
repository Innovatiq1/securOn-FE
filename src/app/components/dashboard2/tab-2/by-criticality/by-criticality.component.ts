import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
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
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';

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
  selector: 'app-by-criticality',
  standalone: true,
  imports: [MatCardModule,NgApexchartsModule,CommonModule],
  templateUrl: './by-criticality.component.html',
})
export class ByCriticalityComponent {
  @ViewChild('chart1') chart1: ChartComponent = Object.create(null);
  public criticalChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  @Input() isActive = false;
  byCriticality: any;

constructor(private vulnerabilityDataService: VulnerabilityDataService,public router: Router){
  
}

ngOnInit() {
  this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
    this.byCriticality = data?.byCriticality;
    if(this.byCriticality){
      this.initializeCharts();
    }
  });
}

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
        dataPointSelection: (event: any, chartContext: any, config: { w: { config: { labels: string[] } }; seriesIndex: number; dataPointIndex: number }) => {
         
          const label = config.w.config.labels[config.dataPointIndex]; 
          this._openVulnerability(label.toUpperCase());  
        },
      } 
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


  if (this.byCriticality && 
      (this.byCriticality.criticalCount > 0 || 
       this.byCriticality.highCount > 0 || 
       this.byCriticality.mediumCount > 0 || 
       this.byCriticality.lowCount > 0)) {
    this.criticalChartOptions1 = {
      ...baseChartOptions,
      series: [
        this.byCriticality.criticalCount,
        this.byCriticality.highCount,
        this.byCriticality.mediumCount,
        this.byCriticality.lowCount,
      ],
      labels: ['Critical', 'High', 'Medium', 'Low'],
    };
  } else {
    this.criticalChartOptions1 = {
      ...baseChartOptions,
      series: [1],  
      labels: ['No Data'],
      colors: ['#d3d3d3'],  
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                text: 'No Data Available',
                fontSize: '16px',
                color: '#a1aab2',
                offsetY: 0,
              },
              value: {
                show: false,
              },
            },
          },
        },
      },
    };
  }
}
_openVulnerability(seviarity: string): void {
  const seviarityPayload = {
    allData: false,
    duration: '',
    fromDate: localStorage.getItem('startDate'),
    seviarity: seviarity.toUpperCase(),
    toDate: localStorage.getItem('endDate'),
  };

  this.router.navigate(['cve/vulnerabilties-view'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
}
}
