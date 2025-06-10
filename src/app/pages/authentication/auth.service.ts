// import { Injectable } from '@angular/core';

// auth.service.ts
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { MsalInitService } from '../../services/msal-init.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private msalService: MsalService,
    private msalInitService: MsalInitService
  ) {}

  async clearMsalState(): Promise<void> {
    try {
      // Clear MSAL cache and storage
      this.msalService.instance.clearCache();
      
      // Clear browser storage
      localStorage.clear(); // Clear all localStorage
      sessionStorage.clear(); // Clear all sessionStorage
      
      // Clear all MSAL-related localStorage items
      Object.keys(localStorage).forEach(key => {
        if (key.includes('msal') || key.includes('login') || key.includes('token')) {
          localStorage.removeItem(key);
        }
      });

      // Clear all MSAL-related sessionStorage items
      Object.keys(sessionStorage).forEach(key => {
        if (key.includes('msal') || key.includes('login') || key.includes('token')) {
          sessionStorage.removeItem(key);
        }
      });

      // Clear active account
      const activeAccount = this.msalService.instance.getActiveAccount();
      if (activeAccount) {
        this.msalService.instance.setActiveAccount(null);
      }

      // Clear all accounts
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        accounts.forEach(() => {
          this.msalService.instance.clearCache();
        });
      }

      // Reset MSAL initialization
      this.msalInitService.resetInitialization();
      
      // Ensure MSAL is reinitialized
      await this.msalInitService.ensureInitialized();
    } catch (error) {
      console.error('Error clearing MSAL state:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    try {
      const token = localStorage.getItem('token');
      const account = this.msalService.instance.getActiveAccount();
      return !!token && !!account;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  }

  async loginWithMSAL(): Promise<any> {
    try {
      // Ensure MSAL is initialized before login
      await this.msalInitService.ensureInitialized();
      
      // Handle any pending redirect operations
      await this.msalInitService.handleRedirectAfterLogin();
      
      const result = await this.msalService.loginPopup().toPromise();
      if (result) {
        // Set the active account after successful login
        this.msalService.instance.setActiveAccount(result.account);
      }
      return result;
    } catch (error) {
      console.error('MSAL login failed:', error);
      // Reset initialization state on login failure
      await this.clearMsalState();
      throw error;
    }
  }

  getAccessToken(): string | null {
    try {
      const account = this.msalService.instance.getActiveAccount();
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0 && accounts[0].idToken) {
        return accounts[0].idToken;
      }
      return null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear all state first
      await this.clearMsalState();

      // Ensure MSAL is initialized before logout
      await this.msalInitService.ensureInitialized();

      // Perform MSAL logout with specific configuration
      const logoutRequest = {
        account: this.msalService.instance.getActiveAccount(),
        postLogoutRedirectUri: window.location.origin + '/authentication/login',
        authority: 'https://login.microsoftonline.com/common',
      };

      // Use logoutPopup instead of redirect to ensure completion
      await this.msalService.logoutPopup(logoutRequest).toPromise();
      
      // Navigate after successful logout
      window.location.href = '/authentication/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if MSAL logout fails, ensure we clean up
      await this.clearMsalState();
      window.location.href = '/authentication/login';
    }
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
