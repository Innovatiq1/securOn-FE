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
  count: number = 0;
  constructor(private vulnerabilityDataService: VulnerabilityDataService,public router: Router,private vulerabilityService: VulnerabilitiesService){
  
  }
  
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byContractId = data?.byContractId;
      this.byCriticality = data?.byCriticality;
     this.count = this.byContractId?.reduce((sum: any, item: { count: any; }) => sum + item.count, 0);
      if(this.byContractId){
        console.log(this.byContractId)
        this.initializeCharts();
      }
    });
    
  }
//clean chat 
  private initializeCharts() {
    const hoveredSeverities = new Set<string>();
    this.apiCache = new Map<string, any>();
    const hoveredIndex = { value: -1 };
    const baseChartOptions = {
      chart: {
        type: 'pie',
        fontFamily: 'inherit',
        foreColor: '#a1aab2',
        toolbar: {
          show: false,
        },
        height: 500,  
  width: 420,
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

          legendItemHover: (event: any, chartContext: any, config: any) => {
            hoveredIndex.value = config.seriesIndex;
    
            const newSeries = chartContext.opts.series.map((s: any, index: number) =>
              index === hoveredIndex.value ? s : 0
            );
            chartContext.updateOptions({
              dataLabels: {
                enabled: true,
                formatter: (val: number, opts: any) => {
                  return opts.seriesIndex === hoveredIndex.value
                    ? `${val.toFixed(1)}%`
                    : '';
                },
                style: {
                  fontSize: '14px',
                  fontWeight: 'bold',
                  colors: ['#fff'], // Ensure white text visibility
                },
              },
            });
          },
          legendItemMouseOut: (event: any, chartContext: any) => {
            hoveredIndex.value = -1;
            chartContext.updateOptions({
              series: chartContext.opts.series,
              dataLabels: { enabled: false }, // Hide percentage when not hovered
            });
            // Restore original chart data when the legend is not hovered
            chartContext.updateOptions({ series: chartContext.opts.series });
          },

        },
        dataLabels: {
          enabled: false, // Hide default percentage on chart
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
    }      
  
    if (this.byContractId && this.byContractId.length > 0) {
      const labels = this.byContractId.map((item: { project: any; }) => item.project);
      const series = this.byContractId.map((item: { count: any; }) => item.count);
      this.totalCount = this.byContractId.reduce((sum: any, item: { count: any; }) => sum + item.count, 0);
      this.contractChartOptions1 = {
        ...baseChartOptions,
        series: series,
        labels: labels,
        dataLabels: {
          enabled: false, // Hide % inside the chart
        },
        legend: {
          show: true,
          position: 'right',
          labels: {
            useSeriesColors: true,
          },
          formatter: (seriesName: string, opts: any) => {
            const total = opts.w.config.series?.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((opts.w.config.series[opts.seriesIndex] / total) * 100).toFixed(1);
            return `<span style="display: flex; align-items: center;">
                      <span style="margin-right: 8px;color: white;font-weight: bold;">${percentage}%</span> 
                      <span style="color: white;font-weight: bold;">${seriesName}</span>
                    </span>`;
          }
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            dataLabels: {
              minAngleToShowLabel: 5,
            },
          },
        },
      };
      
      
    } else {
      this.contractChartOptions1 = {
        ...baseChartOptions,
        series: [], 
        labels: [''],
        colors: ['#d3d3d3'],  
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: false, 
                },
                value: {
                  show: false, 
                },
                total: {
                  show: true,
                  label: 'No Data Found', 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#a1aab2',
                },
              },
            },
          },
        },
        legend: {
          show: false, 
        },
        dataLabels: {
          enabled: false, 
        },
        tooltip: {
          enabled: false, 
        },
      };
      
    }
  }

  //changed code 
  // private initializeCharts() {
  //   const hoveredSeverities = new Set<string>();
  //   this.apiCache = new Map<string, any>();
  
  //   const baseChartOptions = {
  //     chart: {
  //       type: 'pie',
  //       fontFamily: 'inherit',
  //       foreColor: '#a1aab2',
  //       toolbar: { show: false },
  //       height: 290,
  //       events: {
  //         dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
  //           const label = config.w.config.labels[config.dataPointIndex];
  //           if (!hoveredSeverities.has(label)) {
  //             hoveredSeverities.add(label);
  //             this.fetchData(label);
  //           }
  //         },
  //         dataPointSelection: (event: any, chartContext: any, config: any) => {
  //           const label = config.w.config.labels[config.dataPointIndex]; 
  //           this._openVulnerability(label);
  //         },
  //       },
  //     },
  //     colors: [
  //       '#0070BA', '#F98D2B', '#43A047', '#0288D1', '#118e8683',
  //       '#FFCA28', '#217544', '#F39C12', '#00ACC1', '#F06292',
  //       '#054c8f83', '#cb0c6f', '#cb0c0c9d', '#6fcb0ce8', '#57701ee8',
  //       '#704f1ee8', '#601e70e8', '#10d2e0e8', '#563f8aef', '#8a3f53a2'
  //     ],
  //     tooltip: {
  //       theme: 'dark',
  //       fillSeriesColor: false,
  //     },
  //     dataLabels: {
  //       enabled: true, 
  //       formatter: (val: number) => `${val.toFixed(1)}%`, 
  //       dropShadow: { enabled: false },
  //       style: {
  //         fontSize: '12px',
  //         fontWeight: 'bold',
  //         colors: ['#fff'],
  //       },
  //     },
  //     plotOptions: {
  //       pie: {
  //         expandOnClick: false,
  //         customScale: 1,
  //         dataLabels: {
  //           offset: 10, 
  //           minAngleToShowLabel: 1, 
  //         },
  //       },
  //     },
  //   };
  
  //   if (this.byContractId && this.byContractId.length > 0) {
  //     const labels = this.byContractId.map((item: { project: any }) => item.project);
  //     const series = this.byContractId.map((item: { count: any }) => item.count);
  //     this.totalCount = this.byContractId.reduce((sum: any, item: { count: any }) => sum + item.count, 0);
  //     this.contractChartOptions1 = {
  //       ...baseChartOptions,
  //       series: series,
  //       labels: labels,
  //     };
  //   } else {
  //     this.contractChartOptions1 = {
  //       ...baseChartOptions,
  //       series: [1],
  //       labels: ['No Data'],
  //       colors: ['#d3d3d3'],
  //     };
  //   }
  // }
  
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
  
    this.vulerabilityService.getCveDataCountByProject(seviarityPayload).subscribe(
      (data) => {
        this.loading = false;
  
        if (data && typeof data === 'object') {
          const severityCounts = this.formatSeverities(data);
          this.apiCache.set(severity, severityCounts);
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );
  }
  
  private formatSeverities(data: Record<string, number>): { criticalCount: number, highCount: number, mediumCount: number, lowCount: number, totalCount: number } {
    return {
      criticalCount: data['CRITICAL'] || 0,
      highCount: data['HIGH'] || 0,
      mediumCount: data['MEDIUM'] || 0,
      lowCount: data['LOW'] || 0,
      totalCount: (data['CRITICAL'] || 0) + (data['HIGH'] || 0) + (data['MEDIUM'] || 0) + (data['LOW'] || 0),
    };
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
