import { Component, Input } from '@angular/core';
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

import { ChartOptions } from 'src/app/pages/charts/area/area.component';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
@Component({
  selector: 'app-by-contract-id',
  standalone: true,
  imports: [NgApexchartsModule,
    MaterialModule],
  templateUrl: './by-contract-id.component.html',
  styleUrl: './by-contract-id.component.scss'
})
export class ByContractIdComponent {
  public contractChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  @Input() isActive = false;
  byContractId: any;
  totalCount: any;
  constructor(private vulnerabilityDataService: VulnerabilityDataService){
  
  }
  
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byContractId = data?.byContractId;
      if(this.byContractId){
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
  
  
    if (this.byContractId && this.byContractId.length > 0) {
      const labels = this.byContractId.map((item: { project: any; }) => item.project);
      const series = this.byContractId.map((item: { count: any; }) => item.count);
      this.totalCount = this.byContractId.reduce((sum: any, item: { count: any; }) => sum + item.count, 0);
      this.contractChartOptions1 = {
        ...baseChartOptions,
        series: series, 
        labels: labels, 
      };
    } else {
      this.contractChartOptions1 = {
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
