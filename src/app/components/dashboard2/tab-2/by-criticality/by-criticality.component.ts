import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
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
import { distinctUntilChanged, filter } from 'rxjs';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';

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
  selector: 'app-by-criticality',
  standalone: true,
  imports: [MatCardModule,NgApexchartsModule,CommonModule],
  templateUrl: './by-criticality.component.html',
})
export class ByCriticalityComponent {
  @ViewChild('chart1') chart1: ChartComponent = Object.create(null);
  public criticalChartOptions1: Partial<ChartOptions> |  any = {series: [] };
  @Input() isActive = false;
  byCriticality: any;
  projectData: any;
  byContractId: any;
  vulerabilities: string[];
  loading: boolean = false;
hoveredSeverityData: { label: string; count: number; projects: string[] } | null = null;
severityDataCache: Map<string, { count: number; projects: string[] }> = new Map();
isGraphLoaded = false;


constructor(private vulnerabilityDataService: VulnerabilityDataService,public router: Router,private vulerabilityService: VulnerabilitiesService){
  
}

ngOnInit() {
  this.vulnerabilityDataService.vulnerabilitiesData$.subscribe(data => {
    this.byCriticality = data?.byCriticality;
    this.byContractId = data?.byContractId; 
    if (this.byCriticality) {
      this.initializeCharts();
    }
  });
  this.isGraphLoaded = true;
  if (this.isGraphLoaded) {
    this.clearData();
  }
}


private initializeCharts() {
  const hoveredSeverities = new Set<string>();

  const baseChartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: '#a1aab2',
      toolbar: { show: false },
      height: 290,
      events: {
        dataPointMouseEnter: (event: any, chartContext: any, config: any) => {
          const label = config.w.config.labels[config.dataPointIndex];
          if (!hoveredSeverities.has(label)) {
            hoveredSeverities.add(label);
            this.severity(label.toUpperCase()); 
          }
        },
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const label = config.w.config.labels[config.dataPointIndex];
          this._openVulnerability(label.toUpperCase());
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
          },
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    legend: {
      show: true,
      labels: { colors: '#ffffff' },
      position: 'bottom',
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      custom: (options: { series: number[]; seriesIndex: number; dataPointIndex: number; w: any }) => {
        const { series, seriesIndex, w } = options;
        const criticalityLabel = w.config.labels[seriesIndex];
        const criticalityCount = series[seriesIndex];

        if (this.loading) {
          return `
            <div style="padding: 10px; background: #2a2a2a; color: #fff; border-radius: 4px; max-width: 300px; overflow: auto; word-wrap: break-word; white-space: normal;">
              <strong>Loading data for ${criticalityLabel}...</strong>
            </div>
          `;
        }
    
        if (this.severityDataCache.has(criticalityLabel.toUpperCase())) {
          const cachedData = this.severityDataCache.get(criticalityLabel.toUpperCase())!;
          const projectInfo = cachedData.projects.join(', '); 
    
          return `
            <div style="padding: 10px; background: #2a2a2a; color: #fff; border-radius: 4px; max-width: 700px; overflow: auto; word-wrap: break-word; white-space: normal;">
              <strong>${criticalityLabel}: ${criticalityCount}</strong><br>
              <div style="margin-top: 5px;">${projectInfo}</div>
            </div>
          `;
        }
        
        return `
          <div style="padding: 10px; background: #2a2a2a; color: #fff; border-radius: 4px; max-width: 300px; overflow: auto; word-wrap: break-word; white-space: normal;">
            <strong>${criticalityLabel}: ${criticalityCount}</strong><br>
            <div style="margin-top: 5px;">No data available</div>
          </div>
        `;
      },
    }
    
    
    
  };

  if (
    this.byCriticality &&
    (this.byCriticality.criticalCount > 0 ||
      this.byCriticality.highCount > 0 ||
      this.byCriticality.mediumCount > 0 ||
      this.byCriticality.lowCount > 0)
  ) {
    this.criticalChartOptions1 = {
      ...baseChartOptions,
      series: [
        this.byCriticality.criticalCount,
        this.byCriticality.highCount,
        this.byCriticality.mediumCount,
        this.byCriticality.lowCount,
      ],
      labels: ['Critical', 'High', 'Medium', 'Low'],
    };
  } else {
    this.criticalChartOptions1 = {
      ...baseChartOptions,
      series: [0], 
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
              value: { show: false },
            },
          },
        },
      },
    };
  }
}

clearData() {
  this.severityDataCache.clear();
  this.hoveredSeverityData = null; 
  console.log("All data has been cleared!");
}

severity(severity: string) {
  if (!this.isGraphLoaded) {
    console.log("Graph is not loaded yet. Waiting for graph to load.");
    return; 
  }
  if (this.severityDataCache.has(severity)) {
    const cachedData = this.severityDataCache.get(severity)!;

    if (this.isCacheOutOfDate(severity, cachedData)) {
      console.log(`Cache is outdated for severity: ${severity}, fetching new data`);
      this.fetchData(severity);
    } else {
      console.log(`Using cached data for severity: ${severity}`);
      this.hoveredSeverityData = {
        label: severity,
        count: cachedData.count,
        projects: cachedData.projects, 
      };
    }
  } else {
    console.log(`No cache found for severity: ${severity}, fetching data`);
    this.fetchData(severity); 
  }
}

fetchData(severity: string) {
  this.loading = true; 

  const seviarityPayload = {
    allData: false,
    duration: '',
    fromDate: localStorage.getItem('startDate'),
    seviarity: severity.toUpperCase(),
    toDate: localStorage.getItem('endDate'),
  };

  this.vulerabilityService.getCveDataByCriticality(seviarityPayload).subscribe(
    (data) => {
      this.loading = false; 
      if (Array.isArray(data)) {
        const projects = data.map((v: { project: string }) => v.project);

        const projectCount = this.countProjectTypes(projects);

        const formattedProjectCounts = this.formatProjectCounts(projectCount);

        const result = {
          count: data.length,
          projects: formattedProjectCounts,
          startDate: localStorage.getItem('startDate'),
          endDate: localStorage.getItem('endDate'),
        };
        this.severityDataCache.set(severity, result);

        this.hoveredSeverityData = {
          label: severity,
          count: result.count,
          projects: result.projects, 
        };
      } else {
        console.error(`Unexpected data structure for severity: ${severity}`, data);
        this.hoveredSeverityData = null;
      }
    },
    (error) => {
      console.error(`Error fetching data for severity: ${severity}`, error);
      this.loading = false; 
      this.hoveredSeverityData = null;
    }
  );
}

countProjectTypes(projects: string[]) {
  return projects.reduce((acc: { [key: string]: number }, project) => {
    acc[project] = (acc[project] || 0) + 1;
    return acc;
  }, {});
}
formatProjectCounts(projectCounts: { [key: string]: number }) {
  return Object.entries(projectCounts).map(([project, count]) => `${project}: ${count}`);
}

isCacheOutOfDate(severity: string, cachedData: any) {
  const currentStartDate = localStorage.getItem('startDate');
  const currentEndDate = localStorage.getItem('endDate');

  return cachedData.startDate !== currentStartDate || cachedData.endDate !== currentEndDate;
}


_openVulnerability(seviarity: string): void {
  const seviarityPayload = {
    allData: false,
    duration: '',
    fromDate: localStorage.getItem('startDate'),
    seviarity: seviarity.toUpperCase(),
    toDate: localStorage.getItem('endDate'),
  };

  this.router.navigate(['cve/vulnerabilties-view'], { queryParams: { data: JSON.stringify(seviarityPayload) }});
}
getLabelStyle(index: number, total: number) {
  const startAngle = this.criticalChartOptions1.series
    .slice(0, index)
    .reduce((sum: number, value: number) => sum + (value / total) * 360, 0);
  const segmentAngle = (this.criticalChartOptions1.series[index] / total) * 360;
  const angle = startAngle + segmentAngle / 2 - 90;

  const radius = 27;
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
  const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

  return {
    top: `${y}%`,
    left: `${x}%`,
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold',
    color: '#000',
    background: '#f4f4f4',
    padding: '4px 6px',
    borderRadius: '4px',
  };
}

}
