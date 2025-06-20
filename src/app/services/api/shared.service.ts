import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VulnerabilityDataService {
  private vulnerabilitiesDataSubject = new BehaviorSubject<any>(null);
  vulnerabilitiesData$ = this.vulnerabilitiesDataSubject.asObservable();

  private vulnerabilitiesTrendDataSubject = new BehaviorSubject<any>(null);
  vulnerabilitiesTrendsData$ = this.vulnerabilitiesTrendDataSubject.asObservable();

  private vulnerabilitiesCweDataSubject = new BehaviorSubject<any>(null);
  vulnerabilitiesCwesData$ = this.vulnerabilitiesCweDataSubject.asObservable();

  private vulnerabilitiesCvssDataSubject = new BehaviorSubject<any>(null);
  vulnerabilitiesCvssData$ = this.vulnerabilitiesCvssDataSubject.asObservable();
  private _isDataLoading = new BehaviorSubject<boolean>(false);

  private startDateSubject = new BehaviorSubject<string | null>(localStorage.getItem('startDate'));
  private endDateSubject = new BehaviorSubject<string | null>(localStorage.getItem('endDate'));

  startDate$ = this.startDateSubject.asObservable();
  endDate$ = this.endDateSubject.asObservable();
   _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();
  public _showLargeRecordsMessage = false;
  private _largeRecordsMessageTimeout: any;

  // show() {
  //   this._loading.next(true);
  // }

  show() {
    this._loading.next(true);
    this._showLargeRecordsMessage = false;
    this._largeRecordsMessageTimeout = setTimeout(() => {
      if (this._loading.value) {
        this._showLargeRecordsMessage = true;
      }
    }, 5000); 
  }
  hide() {
    this._loading.next(false);
    this._showLargeRecordsMessage = false; 
    if (this._largeRecordsMessageTimeout) {
      clearTimeout(this._largeRecordsMessageTimeout); 
    }
  }

  get showLargeRecordsMessage(): boolean {
    return this._showLargeRecordsMessage;
  }
  // hide() {
  //   this._loading.next(false);
  // }
  updateStartDate(date: string) {
    localStorage.setItem('startDate', date);
    this.startDateSubject.next(date);
  }

  updateEndDate(date: string) {
    localStorage.setItem('endDate', date);
    this.endDateSubject.next(date);
  }
  setDataLoading(isLoading: boolean): void {
    this._isDataLoading.next(isLoading);
  }

  isDataLoading(): Observable<boolean> {
    return this._isDataLoading.asObservable();
  }

  setVulnerabilitiesData(data: any) {
    this.vulnerabilitiesDataSubject?.next(data);
  }

  setVulnerabilitiesTrendsData(data: any) {
    this.vulnerabilitiesTrendDataSubject.next(data);
  }
  setVulnerabilitiesCvssData(data: any) {
    this.vulnerabilitiesCvssDataSubject.next(data);
  }
  setVulnerabilitiesCweData(data: any) {
    this.vulnerabilitiesCweDataSubject.next(data);
  }
}