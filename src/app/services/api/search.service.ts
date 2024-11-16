import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, of } from 'rxjs';
import { Store } from "@ngrx/store";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class SearchService {
  firmwareVersion: any;
  streamSearchResults(payload: any) {
    throw new Error('Method not implemented.');
  }
  private _isDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectedVendor: string[] = [];
  product: any[] = [];
  currentCveId: string[] = [];
  isSearchPerformed: boolean = false;
  currentPartNo: string = '';
  currentOsType: string = '';
  currentFirmware: string = '';

  constructor(private http: HttpClient) { }

  getDropdownData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/getOemVendorList`);
  }

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/getAllData`);
  }
  postProductData(data: any): Observable<string[]> {
    return this.http.post<string[]>(`${environment.baseUrl}/getProductsByVendor`, data);
  }
  postSearch(data: any): Observable<string[]> {
    return this.http.post<string[]>(`${environment.baseUrl}/searchCriteria`, data);
  }
  getDataLoadingStatus(): Observable<boolean> {
    return this._isDataLoading$.asObservable();
  }

  // postView(data: any): Observable<string[]> {
  //   return this.http.post<string[]>(`${this.baseUrl}/getCveDetails`, data);
  // }

}