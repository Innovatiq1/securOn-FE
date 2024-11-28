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
  private vulnerabilitiesCvssDataSubject = new BehaviorSubject<any>(null);
  vulnerabilitiesCvssData$ = this.vulnerabilitiesCvssDataSubject.asObservable();
  private _isDataLoading = new BehaviorSubject<boolean>(false);

  private startDateSubject = new BehaviorSubject<string | null>(localStorage.getItem('startDate'));
  private endDateSubject = new BehaviorSubject<string | null>(localStorage.getItem('endDate'));

  startDate$ = this.startDateSubject.asObservable();
  endDate$ = this.endDateSubject.asObservable();

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
    this.vulnerabilitiesDataSubject.next(data);
  }

  setVulnerabilitiesTrendsData(data: any) {
    this.vulnerabilitiesTrendDataSubject.next(data);
  }
  setVulnerabilitiesCvssData(data: any) {
    this.vulnerabilitiesCvssDataSubject.next(data);
  }
}