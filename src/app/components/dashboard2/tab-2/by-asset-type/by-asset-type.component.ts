import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../by-criticality/by-criticality.component';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-by-asset-type',
  standalone: true,
  imports: [MatCardModule,NgApexchartsModule,CommonModule],
  templateUrl: './by-asset-type.component.html',
  styleUrl: './by-asset-type.component.scss'
})
export class ByAssetTypeComponent {
  public assetChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  @Input() isActive = false;
  byAssets: any;
  totalCount: any;
  constructor(private vulnerabilityDataService: VulnerabilityDataService){
  
  }
  
  ngOnInit() {
    this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
      this.byAssets = data?.byAssetTypes;
      if(this.byAssets){
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
  
  
    if (this.byAssets && this.byAssets.length > 0) {
      const labels = this.byAssets.map((item: { type: any; }) => item.type);
      const series = this.byAssets.map((item: { count: any; }) => item.count);
      this.totalCount = this.byAssets.reduce((sum: any, item: { count: any; }) => sum + item.count, 0);
      this.assetChartOptions1 = {
        ...baseChartOptions,
        series: series, 
        labels: labels, 
      };
    } else {
      this.assetChartOptions1 = {
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
