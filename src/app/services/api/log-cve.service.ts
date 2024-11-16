import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root',
})
export class LogCveService {
  // private api1Url = 'https://cvebackend.azurewebsites.net/';
  // private api1Url = 'https://cve.innovsectraker.com:8000';
  private api1Url = 'http://localhost:8000';
  private readonly BASE_URL = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private readonly userService: UserService
  ) {}


  getLastModifiedData(): Observable<any> {
    return this.http.get<any>(`${this.api1Url}/runlastPublishedScheduler`);
  }

  getLastPublishedData(): Observable<any> {
    return this.http.get<any>(`${this.api1Url}/lastPublished`);
  }

  getDailyLogs(postData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/getDailyLogs', postData);
  }

  updateAsset(postData: any): Observable<any> {
    return this.http.post(
      `${this.BASE_URL + '/updateAsset'}`,
      postData,
      this.userService.getRequestHeaders()
    );
  }
  loadAllAssets(startDate?: string, endDate?: string): Observable<any> {
    let params = new HttpParams();
  
    if (startDate) {
      params = params.set('startDate', startDate);
    }
  
    if (endDate) {
      params = params.set('endDate', endDate);
    }
  
    const options = {
      ...this.userService.getRequestHeaders(),
      params: params,
    };
  
    return this.http.get<any>(`${this.BASE_URL}/getAssets`, options);
  }
    // loadAllAssets(): Observable<any> {
    //   return this.http.get(
    //     `${this.BASE_URL + '/getAssets'}`,
    //     this.userService.getRequestHeaders()
    //   );
    // }
}
