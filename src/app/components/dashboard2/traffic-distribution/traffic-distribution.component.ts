import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import moment from 'moment';
import { CommonModule } from '@angular/common';
export interface trafficChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  stroke: ApexStroke;
}
@Component({
  selector: 'app-traffic-distribution',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule,CommonModule,MaterialModule],
  templateUrl: './traffic-distribution.component.html',
})
export class AppTrafficDistributionComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public trafficChart!: Partial<trafficChart> | any;
  public counts = {
    last1Day: 0,
    last7Days: 0,
    last30Days: 0,
  };
  constructor(private vulnerabilitiesService: VulnerabilitiesService) {
    
  }
  ngOnInit(): void {
    // this.UpdateNewCves();
      this.getNewUpdatedCve();
      
  }
  private getNewUpdatedCve(): Promise<void> {
    return new Promise((resolve) => {
      const fromDate = localStorage.getItem('startDate');
      const toDate = localStorage.getItem('endDate');
      const payload = {
        
      };
  
      this.vulnerabilitiesService
        .getNewUpdatedCves(payload)
        .subscribe((res: Record<string, number>) => {
          const transformedResult = Object.entries(res).map(([numberOfDays, count]) => ({
            numberOfDays,
            count,
          }));
          this.UpdateNewCves(transformedResult);
  
          resolve();
        });
    });
  }
  
  UpdateNewCves(asset: { numberOfDays: string; count: number }[]) {
    const counts = asset.map((item) => item.count); 
    const labels = asset.map((item) => item.numberOfDays);
    asset.forEach((item) => {
      if (item.numberOfDays === 'last 1 day') {
        this.counts.last1Day = item.count;
      } else if (item.numberOfDays === 'last 7 days') {
        this.counts.last7Days = item.count;
      } else if (item.numberOfDays === 'last 30 days') {
        this.counts.last30Days = item.count;
      }
    });
    this.trafficChart = {
      series: counts, 
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 250,
      },
      labels: labels, 
      colors: ['#e7ecf0', '#f8c076', '#fb977d'], 
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
  }
}
