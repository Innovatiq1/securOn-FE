// import { Injectable } from '@angular/core';

// auth.service.ts
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PublicClientApplication } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private initialized = false;

  constructor(private msalService: MsalService) {
    this.initializeMsal();
  }

  private async initializeMsal() {
    if (!this.initialized) {
      try {
        await this.msalService.initialize();
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize MSAL:', error);
      }
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const account = this.msalService.instance.getActiveAccount();
    return !!token && !!account;
  }

  async loginWithMSAL(): Promise<any> {
    await this.initializeMsal(); // Ensure MSAL is initialized
    return this.msalService.loginPopup().toPromise();
  }

  getAccessToken(): string | null {
    // Not needed if using interceptor, but available if needed manually
    const account = this.msalService.instance.getActiveAccount();
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0 && accounts[0].idToken) {
      return accounts[0].idToken;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.msalService.logoutRedirect();
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor() {}


//   isLoggedIn(): boolean {
//     const token = localStorage.getItem('token');
//     return token !== null && !this.isTokenExpired(token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }


//   private isTokenExpired(token: string): boolean {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
//       const expiry = payload.exp * 1000; // Convert to milliseconds
//       return Date.now() > expiry;
//     } catch (error) {
//       return true; // If decoding fails, treat it as expired
//     }
//   }

// }
