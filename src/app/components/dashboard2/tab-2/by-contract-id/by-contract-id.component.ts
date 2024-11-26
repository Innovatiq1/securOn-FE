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
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
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
  byCriticality: any;
  loading: boolean;
  apiCache: any;
  constructor(private vulnerabilityDataService: VulnerabilityDataService,public router: Router,private vulerabilityService: VulnerabilitiesService){
  
  }
  
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byContractId = data?.byContractId;
      this.byCriticality = data?.byCriticality;
      if(this.byContractId){
        this.initializeCharts();
      }
    });
  }

  private initializeCharts() {
    const hoveredSeverities = new Set<string>();
    this.apiCache = new Map<string, any>(); // Cache for API responses
  
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
          dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
            const label = config.w.config.labels[config.dataPointIndex];
            if (!hoveredSeverities.has(label)) {
              hoveredSeverities.add(label);
              this.fetchData(label); 
            }
          },
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
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
        custom: (options: { series: number[]; seriesIndex: number; dataPointIndex: number; w: any }) => {
          const { series, seriesIndex, w } = options;
          const label = w.config.labels[seriesIndex];
      
          const criticalityData = this.apiCache.get(label);
          
          if (!criticalityData) {
            return `
              <div style="padding: 10px; background: #2a2a2a; color: #fff; border-radius: 4px; max-width: 300px; overflow: auto; word-wrap: break-word; white-space: normal;">
                <strong>${label}</strong><br>
                <div style="margin-top: 5px;">Loading data...</div>
              </div>
            `;
          }
      
          const { criticalCount = 0, highCount = 0, mediumCount = 0, lowCount = 0, totalCount = 0 } = criticalityData;
          const criticalityCount = series[seriesIndex];
      
          return `
            <div style="padding: 10px; background: #2a2a2a; color: #fff; border-radius: 4px; max-width: 300px; overflow: auto; word-wrap: break-word; white-space: normal;">
              <strong>${label}: ${criticalityCount}</strong><br>
              <div style="margin-top: 5px;">
                <strong>Total Count:</strong> ${totalCount}<br>
                <strong>Critical:</strong> ${criticalCount}<br>
                <strong>High:</strong> ${highCount}<br>
                <strong>Medium:</strong> ${mediumCount}<br>
                <strong>Low:</strong> ${lowCount}
              </div>
            </div>
          `;
        },
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

  fetchData(severity: string) {
    if (this.apiCache.has(severity)) {
      console.log(`Using cached data for ${severity}`);
      return;
    }
  
    this.loading = true; 
  
    const seviarityPayload = {
      allData: false,
      duration: '',
      fromDate: localStorage.getItem('startDate'),
      project: severity,
      toDate: localStorage.getItem('endDate'),
    };
  
    this.vulerabilityService.getCveDataByProject(seviarityPayload).subscribe(
      (data) => {
        this.loading = false; 
        if (Array.isArray(data)) {
          const severityCounts = this.countSeverities(data);
          this.apiCache.set(severity, severityCounts);
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );
  }

  private countSeverities(data: any[]): { criticalCount: number, highCount: number, mediumCount: number, lowCount: number, totalCount: number } {
    const counts = {
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      totalCount: 0,
    };
  
    data.forEach((item) => {
      switch (item.seviarity.toUpperCase()) {
        case 'CRITICAL':
          counts.criticalCount++;
          break;
        case 'HIGH':
          counts.highCount++;
          break;
        case 'MEDIUM':
          counts.mediumCount++;
          break;
        case 'LOW':
          counts.lowCount++;
          break;
      }
      counts.totalCount++;
    });
  
    return counts;
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
