import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class ScanTypeService {
  constructor(private http: HttpClient) {}

  saveScanType(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/saveScanType`, data);
  }

  getAllScanTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/getAllScanTypes`);
  }

  updateScanType(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/updateScanType/${id}`, data);
  }

  deleteScanType(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/deleteScanType/${id}`);
  }

  filterScanType(filter: { scanType: boolean }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/filterScanType`, filter);
  }
} 