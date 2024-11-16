import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TablerIconsModule } from 'angular-tabler-icons';
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
  selector: 'app-by-brand',
  standalone: true,
  imports: [  CommonModule,
    MatCardModule,
    MatIconModule,
    TablerIconsModule,
    DatePipe,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    TablerIconsModule,
    DatePipe,
    MatButtonModule,
    NgApexchartsModule,
    MaterialModule,],
  templateUrl: './by-brand.component.html',
  styleUrl: './by-brand.component.scss'
})
export class ByBrandComponent {
  public brandChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  @Input() isActive = false;
  byBrands: any;
  totalCount: any;
  constructor(private vulnerabilityDataService: VulnerabilityDataService){
  
  }
  
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byBrands = data?.byBrands;
      if(this.byBrands){
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
        events: {
          mouseMove: function() {
            
          }
        }
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
  
  
    if (this.byBrands && this.byBrands.length > 0) {
      const labels = this.byBrands.map((item: { vendorName: any; }) => item.vendorName);
      const series = this.byBrands.map((item: { count: any; }) => item.count);
      this.totalCount = this.byBrands.reduce((sum: any, item: { count: any; }) => sum + item.count, 0);
    
      this.brandChartOptions1 = {
        ...baseChartOptions,
        series: series, 
        labels: labels, 
      };
    } else {
      this.brandChartOptions1 = {
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
