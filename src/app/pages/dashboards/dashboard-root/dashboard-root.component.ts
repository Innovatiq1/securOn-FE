import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AppDashboard2Component } from "../dashboard2/dashboard2.component";
import { UpdatedCveChartsComponent } from "../updated-cve-charts/updated-cve-charts.component";
import { Observable, Subject, firstValueFrom, of } from 'rxjs';
import * as moment from 'moment';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { CommonModule } from '@angular/common';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard-root',
  standalone: true,
  imports: [MatTabsModule, AppDashboard2Component, UpdatedCveChartsComponent,CommonModule,MatProgressSpinnerModule],
  templateUrl: './dashboard-root.component.html',
})
export class DashboardRootComponent implements OnInit, OnDestroy {
  valnerabilitiesResponse: any;
  
  constructor(private cdr: ChangeDetectorRef,private vulnerabilitiesService: VulnerabilitiesService,private vulnerabilityDataService: VulnerabilityDataService){}
  selectedTab = 0;
  public selectedDateRange: Date[];
  public selectSwitchDate: Date[];
  private unsubscribe$ = new Subject<void>();
  public toggleSwitchState: boolean = true;
  public _vulnerabilityTrendData$: Observable<any[]>;
  public _isDataLoading$: Observable<boolean>;
  totalVulnerabilities: any[] = [];
  totalCriticalitys: any = {};
  totalAssets: any[] = [];
  totalContracts: any[] = [];
  private storageInterval: any;
  onTabChange(index: number): void {
    setTimeout(() => {
      this.selectedTab = index;
      this.toggleSwitchState = index === 0;
      this.cdr.detectChanges();
      this.onTabChangeDate();
    }, 0);
  }

  ngOnInit(): void {
    this.onTabChangeDate();
    this.startStorageWatcher();
    this._isDataLoading$ = this.vulnerabilityDataService.isDataLoading();
  }

  ngOnDestroy() {
    if (this.storageInterval) {
      clearInterval(this.storageInterval);
    }
  }

  startStorageWatcher(): void {
    let previousStartDate = localStorage.getItem('startDate');
    let previousEndDate = localStorage.getItem('endDate');

    this.storageInterval = setInterval(() => {
      const currentStartDate = localStorage.getItem('startDate');
      const currentEndDate = localStorage.getItem('endDate');

      if (currentStartDate !== previousStartDate || currentEndDate !== previousEndDate) {
        this.onTabChangeDate();
        
        previousStartDate = currentStartDate;
        previousEndDate = currentEndDate;
      }
    }, 1000); 
  }

  onTabChangeDate(): void {
    const fromDate = localStorage.getItem('startDate');
    const toDate = localStorage.getItem('endDate');
  
    const Trendpayload = {
      startDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
      endDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
      duration: '',
      allData: this.toggleSwitchState
    };
    const payload = {
      fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
      toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
      duration: '',
      allData: this.toggleSwitchState
    };
    this.loadData(payload);
    this.loadVulnerabilityTrendData(Trendpayload);
  }

  async loadVulnerabilityTrendData(requestData: any): Promise<void> {
    try {
      const response = await firstValueFrom(this.vulnerabilitiesService.loadVulnerabilityTrendData(requestData));
      if (response) {
        // this._vulnerabilityTrendData$ = of(response);
        this.vulnerabilityDataService.setVulnerabilitiesTrendsData(response)
      }
    } catch (error) {
      console.error('Vulnerability trend data call failed', error);
    }
  }

  loadData(req: any) {
    try {
      this.vulnerabilityDataService.setDataLoading(true);  
      this.vulnerabilitiesService.loadVulnerabilitiesByDateRange(req).subscribe(
        async (response) => {
          if (response) {
            this.valnerabilitiesResponse = response;
            this.vulnerabilityDataService.setVulnerabilitiesData(response);
          }
          this.vulnerabilitiesService.setDataLoading(false); 
          this.cdr.detectChanges();
        },
        (error) => {
          this.vulnerabilityDataService.setDataLoading(false); 
          console.error('Call failed', error);
        }
      );
    } catch (error) {
      this.vulnerabilitiesService.setDataLoading(false);
      console.error('Call failed', error);
    }
  }
}
