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
  ApexTheme,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ChartOptions } from 'src/app/pages/charts/area/area.component';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import * as moment from 'moment';
import { CommonModule } from '@angular/common';

export interface revenuetwoChart {
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
  selector: 'app-profile-expance',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule,CommonModule],
  templateUrl: './profile-expance.component.html',
})
export class AppProfileExpanceCpmponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenuetwoChart!: Partial<revenuetwoChart> | any;
  public areaChartOptions: Partial<ChartOptions> | any;
  public trendsData: any;

  constructor(private vulnerabilityDataService: VulnerabilityDataService) {
    
  }

  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesTrendsData$.subscribe((data) => {
      this.trendsData = data;
      console.log( this.trendsData ,"trends")
      if (this.trendsData) {
        this.trends();  
      }
    });
  }
  public getNoDataChartOptions(){
    return {
      title: {
        text: 'No Data Available',
      },
      credits: {
        enabled: false,
      },
    };
  }
  public trends() {
    if (!this.trendsData) {
      return; 
    }
  
    const validChartData = this.trendsData?.filter((item: { month: number; year: string | number; }) => 
      moment({ month: item.month - 1, year: +item.year }).isValid()
    );
  
    if (validChartData.length === 0) {
      this.areaChartOptions = this.getNoDataChartOptions();
      return;
    }
  
    const categories = validChartData.map((item: { month: number; year: string | number; }) => 
      moment({ month: item.month - 1, year: +item.year }).format('MMM')
    );
  
    this.areaChartOptions = {
      series: [
        {
          name: 'Critical',
          data: validChartData.map((item: { criticalCount: any; }) => item.criticalCount),
          color: '#FF0000',
        },
        {
          name: 'High',
          data: validChartData.map((item: { highCount: any; }) => item.highCount),
          color: '#FFA500',
        },
        {
          name: 'Medium',
          data: validChartData.map((item: { mediumCount: any; }) => item.mediumCount),
          color: '#0d9ae7',
        },
        {
          name: 'Low',
          data: validChartData.map((item: { lowCount: any; }) => item.lowCount),
          color: '#4cc76c',
        },
      ],
      chart: {
        fontFamily: 'inherit',
        foreColor: '#a1aab2',
        height: 300,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 3,
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        borderColor: 'rgba(0,0,0,0.1)',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        categories: categories,
        labels: {
          style: {
            colors: '#fff',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Number of Vulnerabilities',
        },
        labels: {
          formatter: function (value: number) {
            return value >= 1000
              ? `${(value / 1000).toFixed(1)}k`
              : value.toString();
          },
          style: {
            colors: '#fff',
          },
        },
        min: 0,
        max: 10000,
        tickAmount: 4,
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: function (val: number) {
            return `${val.toLocaleString()}`;
          },
        },
      },
    };
  }
  
}
