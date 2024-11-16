import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environment/environment';

@Injectable({ 
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  signUp = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/signup';
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  validateLogin = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/login';
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  public getRequestHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[] };
  } {
    let headers;
    const token = localStorage.getItem('token');
    headers = new HttpHeaders({
      authToken: `Bearer ${token}`,
    });
    return { headers: headers };
  }

  getToken() {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      return null;
    }
  }
  forgotPassword = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/forgotPassword';
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  resetPassword = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/resetPassword';
    return this.http.post(endpoint, moreData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

}
