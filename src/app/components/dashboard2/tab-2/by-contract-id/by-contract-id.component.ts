import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
import { MaterialModule } from 'src/app/material.module';

import { ChartOptions } from 'src/app/pages/charts/area/area.component';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
@Component({
  selector: 'app-by-contract-id',
  standalone: true,
  imports: [NgApexchartsModule,
    MaterialModule, CommonModule],
  templateUrl: './by-contract-id.component.html',
  styleUrl: './by-contract-id.component.scss'
})
export class ByContractIdComponent {
  public contractChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  @Input() isActive = false;
  byContractId: any;
  totalCount: any;
  constructor(private vulnerabilityDataService: VulnerabilityDataService,public router: Router){
  
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
        type: 'pie',
        fontFamily: 'inherit',
        foreColor: '#a1aab2',
        toolbar: {
          show: false,
        },
        height: 290,
        events: {
          dataPointSelection: (
            event: any,
            chartContext: any,
            config: { w: { config: { labels: string[] } }; seriesIndex: number; dataPointIndex: number }
          ) => {
            const label = config.w.config.labels[config.dataPointIndex]; 
            this._openVulnerability(label); 
          },
        },
      },
      colors: [
        '#0070BA',
        '#F98D2B',
        '#43A047',
        '#0288D1',
        '#118e8683',
        '#FFCA28',
        '#217544',
        '#F39C12',
        '#00ACC1',
        '#F06292',
        '#054c8f83',
        '#cb0c6f',
        '#cb0c0c9d',
        '#6fcb0ce8',
        '#57701ee8',
        '#704f1ee8',
        '#601e70e8',
        '#10d2e0e8',
        '#563f8aef',
        '#8a3f53a2'

      ],
      plotOptions: {
        pie: {
          pie: {
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
            pie: {
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
      project: seviarity,
      toDate: localStorage.getItem('endDate'),
    };
  
    this.router.navigate(['cve/vulnerabilties-view'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
  }
  // getLabelStyle(index: number, total: number) {
  //   const startAngle = this.byContractId
  //     .slice(0, index)
  //     .reduce((sum: number, item: { count: number }) => sum + (item.count / total) * 360, 0);
  //   const segmentAngle = (this.byContractId[index].count / total) * 360;
  //   const angle = startAngle + segmentAngle / 2 - 90;
  
  //   const radius = 45;
  //   const chartWidthPercentage = 47;
  
  //   let x = chartWidthPercentage + radius * Math.cos((angle * Math.PI) / 180);
  //   let y = 50 + radius * Math.sin((angle * Math.PI) / 180);
  //   if (x < 50) {
  //     x += 4;
  //   }
  //   if (index > 0) {
  //     const previousLabel = this.getLabelStyle(index - 1, total);
  //     const previousY = parseFloat(previousLabel.top);
  //     const diffY = Math.abs(previousY - y);
  
  //     if (diffY < 5) {
  //       y += 5 * (index % 2 === 0 ? 1 : -1);
  //     }
  //   }
  
  //   return {
  //     top: `${y}%`,
  //     left: `${x}%`,
  //     transform: 'translate(-50%, -50%)',
  //     fontWeight: 'bold',
  //   };
  // }
  
  
}
