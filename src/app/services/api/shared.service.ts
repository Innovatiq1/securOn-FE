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
  private _isDataLoading = new BehaviorSubject<boolean>(false);
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
}