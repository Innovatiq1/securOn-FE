import { CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
// import { ChartOptions } from '../by-criticality/by-criticality.component';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
  imports: [MatCardModule,NgApexchartsModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './by-brand.component.html',
  styleUrl: './by-brand.component.scss'
})
export class ByBrandComponent {
  public brandChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  @Input() isActive = false;
  byBrands: any;
  totalCount: any;
  count: number =0;
  constructor(public vulnerabilityDataService: VulnerabilityDataService,public router: Router){
  
  }
  
  ngOnInit() {
    this.vulnerabilityDataService.show();
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byBrands = data?.byBrands;
      this.count = this.byBrands?.reduce((sum: any, item: { count: any; }) => sum + item.count, 0);
      this.vulnerabilityDataService.hide();
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
        height: 270,
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
        show:
        this.byBrands && this.byBrands.length > 0,
        labels: { colors: '#ffffff' },
        position: 'right', // Move legend to the right
        horizontalAlign: 'center', // Center-align legend items
        fontSize: '14px',
        markers: {
          width: 12,
          height: 12,
          radius: 12,
        },
        itemMargin: {
          vertical: 5,
        },
        formatter: (seriesName: string, opts: any) => {
          const count = opts.w.globals.series[opts.seriesIndex];
          return `${seriesName}: ${count}`; // Displaying severity label along with count
        },
      },
      
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  
    if (this.byBrands && this.byBrands.length > 0) {
      const labels = this.byBrands.map((item: { vendorName: any }) => item.vendorName);
      const series = this.byBrands.map((item: { count: any }) => item.count);
      this.totalCount = this.byBrands.reduce((sum: any, item: { count: any }) => sum + item.count, 0);
  
      this.brandChartOptions1 = {
        ...baseChartOptions,
        series: series, 
        labels: labels, 
      };
    } else {
      this.brandChartOptions1 = {
        ...baseChartOptions,
        series: [0], 
        labels: ['No Data Found'], 
        colors: ['#d3d3d3'], 
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  text: 'No Data Found',
                  fontSize: '18px',
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
  getLabelStyle(index: number, total: number) {
    const startAngle = this.byBrands
      .slice(0, index)
      .reduce(
        (sum: number, item: { count: number }) =>
          sum + (item.count / total) * 360,
        0
      );
    const segmentAngle = (this.byBrands[index].count / total) * 360;
    const angle = startAngle + segmentAngle / 2 - 90;
  
    const radius = 50;
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    let y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    if (index > 0) {
      const previousLabel = this.getLabelStyle(index - 1, total);
      const previousY = parseFloat(previousLabel.top);
      const diffY = Math.abs(previousY - y);
  
      if (diffY < 5) {
        y += 5 * (index % 2 === 0 ? 1 : -1);
      }
    }
  
    return {
      top: `${y}%`,
      left: `${x}%`,
      transform: 'translate(-50%, -50%)',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      padding: '4px 6px',
    borderRadius: '4px'
    };
  }
  
  
  
  
  _openVulnerability(seviarity: string): void {
    const seviarityPayload = {
      allData: false,
      duration: '',
      fromDate: localStorage.getItem('startDate'),
      vendorName: seviarity,
      toDate: localStorage.getItem('endDate'),
    };
  
    this.router.navigate(['cve/vulnerabilties-view'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
  }
}
