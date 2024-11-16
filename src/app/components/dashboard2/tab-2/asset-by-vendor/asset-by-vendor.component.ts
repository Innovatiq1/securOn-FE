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
  selector: 'app-asset-by-vendor',
  standalone: true,
  imports: [NgApexchartsModule,MaterialModule],
  templateUrl: './asset-by-vendor.component.html',
})
export class AssetByVendorComponent {
  @Input() isActive = false;

  public vendorChart: Partial<ChartOptions> |  any = {series: [] };

constructor(){
  this.affectedBrands();
}

  private affectedBrands() {
    this.vendorChart = {
      series: [
        {
          name: '',
          data: [4],
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: 'inherit',
        foreColor: '#a1aab2',
        toolbar: {
          show: false,
        },
        height: 290,
      },
      colors: ['#5D87FF'],
      plotOptions: {
        bar: {
          borderRadius: 2,
          columnWidth: '45%',
          distributed: true,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: [
          'Cisco',
        ],
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          formatter: function (value: number) {
            return value.toFixed(0);
          },
        },
        min: 0,
        max: 10,
        tickAmount: 6,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
}
