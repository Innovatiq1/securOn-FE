import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '../by-criticality/by-criticality.component';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  constructor(private vulnerabilityDataService: VulnerabilityDataService,public router: Router){
  
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
        show: false,
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  
    if (this.byAssets && this.byAssets.length > 0) {
      const labels = this.byAssets.map((item: { type: any; }) => item.type || 'Unknown');
      const series = this.byAssets.map((item: { count: any; }) => item.count || 0);
      if (!series.length || !labels.length) {
        console.error('Error: Series or Labels data is empty.');
        return;
      }
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
                  color: undefined,
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
      type: seviarity,
      toDate: localStorage.getItem('endDate'),
    };
  
    this.router.navigate(['cve/vulnerabilties-view'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
  }
  getLabelStyle(index: number, total: number) {
    const startAngle = this.byAssets
      .slice(0, index)
      .reduce((sum: number, item: { count: number; }) => sum + (item.count / total) * 360, 0);
    const segmentAngle = (this.byAssets[index].count / total) * 360;
    const angle = startAngle + segmentAngle / 2 - 90;
  
    const radius = 55;
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    let y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    if (index > 0) {
      const previousY = this.getLabelStyle(index - 1, total).top;
      const diff = Math.abs(parseFloat(previousY) - y);
  
      if (diff < 5) {
        y += 5 * (index % 2 === 0 ? 1 : -1);
      }
    }
  
    return {
      top: `${y}%`,
      left: `${x}%`,
      transform: 'translate(-50%, -50%)',
      fontWeight: 'bold',
    };
  }
}
