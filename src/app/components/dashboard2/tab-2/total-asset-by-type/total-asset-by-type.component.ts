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
import { CommonModule } from '@angular/common';

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
  selector: 'app-total-asset-by-type',
  standalone: true,
  imports: [MaterialModule,NgApexchartsModule, CommonModule],
  templateUrl: './total-asset-by-type.component.html',
  styleUrls: ['../by-brand/by-brand.component.scss']
})
export class TotalAssetByTypeComponent implements OnInit {
  @Input() isActive = false;
  public toggleSwitchState: boolean = true;
  public typeChart: Partial<ChartOptions> |  any = {series: [] };
  assetByType:any;
  totalCount=0;
  constructor(private vulnerabilitiesService:VulnerabilitiesService){
    // this.initializeCharts();
  }
ngOnInit(): void {
  this.getCircularDashboardData();
}
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
         
          this.assetByType = response.assetsByType;
          if (response.assetsByType) {
            this.initializeCharts(response.assetsByType);
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
    const type = asset.map((item: any) => item.type);
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

   
    this.typeChart = {
      ...baseChartOptions,
      series: counts,
      labels: type,
    };
  }
  getLabelStyle(index: number, total: number) {
    const startAngle = this.assetByType
      .slice(0, index)
      .reduce(
        (sum: number, item: { count: number }) =>
          sum + (item.count / total) * 360,
        0
      );
    const segmentAngle = (this.assetByType[index].count / total) * 360;
    const angle = startAngle + segmentAngle / 2 - 90;
  
    const radius = 40;
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
    };
  }
}
