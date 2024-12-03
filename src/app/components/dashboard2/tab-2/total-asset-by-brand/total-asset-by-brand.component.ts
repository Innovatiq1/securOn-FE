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
  selector: 'app-total-asset-by-brand',
  standalone: true,
  imports: [MaterialModule,NgApexchartsModule, CommonModule],
  templateUrl: './total-asset-by-brand.component.html',
  styleUrls: ['../by-brand/by-brand.component.scss']
})
export class TotalAssetByBrandComponent implements OnInit{
  @Input() isActive = false;
  public brandChart: Partial<ChartOptions> |  any = {series: [] };
  public toggleSwitchState: boolean = true;
  assetByBrand:any;
  totalCount=0;
  constructor(private vulnerabilitiesService:VulnerabilitiesService,private localStorageService: VulnerabilityDataService){
    // this.initializeCharts();
  }
  ngOnInit(): void {

    this.localStorageService.vulnerabilitiesData$.subscribe(data => {
      this.assetByBrand = data?.assetsByBrand;
      if(this.assetByBrand){
        this.initializeCharts(this.assetByBrand);
      }
    });

  }
 
  private initializeCharts(asset:any) {
    const vendors = asset.map((item: any) => item.vendor);
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
      colors: [
      '#0070BA',
      '#F98D2B',
      '#43A047',
      '#0288D1',
      '#fb977d',
      '#FFCA28',
      '#217544',
      '#f8c076',],
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

    this.brandChart = {
      ...baseChartOptions,
      series: counts,
      labels: vendors,
    };
  }
  getLabelStyle(index: number, total: number) {
    const startAngle = this.assetByBrand
      .slice(0, index)
      .reduce(
        (sum: number, item: { count: number }) =>
          sum + (item.count / total) * 360,
        0
      );
    const segmentAngle = (this.assetByBrand[index].count / total) * 360;
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
