import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ChartOptions } from 'src/app/pages/charts/area/area.component';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { CommonModule } from '@angular/common';

export interface productSalesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-product-sales',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule,CommonModule],
  templateUrl: './product-sales.component.html',
})
export class AppProductSalesComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public productSalesChart!: Partial<productSalesChart> | any;
  public trafficChart: Partial<ChartOptions> | any;
  byCriticality: any;
  

  constructor(private vulnerabilityDataService: VulnerabilityDataService) {
   
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
        height: 290,
      },
      colors: ['#e7ecf0', '#f8c076', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
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
        show: false,
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
      this.trafficChart = {
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
      this.trafficChart = {
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
  
}
