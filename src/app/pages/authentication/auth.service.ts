// import { Injectable } from '@angular/core';

// auth.service.ts
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { 
  PublicClientApplication, 
  AccountInfo, 
  Configuration,
  LogLevel,
  BrowserCacheLocation,
  EndSessionRequest,
  InteractionType
} from '@azure/msal-browser';
import { MsalInitService } from '../../services/msal-init.service';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AZURE_TENANT_ID = 'common'; // or your specific tenant ID
  private readonly CLIENT_ID = '9bb52b25-f72e-42c8-abbe-51f8fd9bc711';

  constructor(
    private msalService: MsalService,
    private msalInitService: MsalInitService,
    private router: Router
  ) {}

  private getAuthConfig(email: string): Configuration {
    const baseConfig = {
      auth: {
        clientId: this.CLIENT_ID,
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin + '/authentication/login',
        navigateToLoginRequestUrl: true,
        validateAuthority: true,
        knownAuthorities: ['login.microsoftonline.com']
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: true
      },
      system: {
        allowRedirectInIframe: true,
        loggerOptions: {
          loggerCallback: (level: LogLevel, message: string) => {
            console.log(message);
          },
          logLevel: LogLevel.Verbose,
          piiLoggingEnabled: false
        }
      }
    };

  
    const isPersonalAccount = !email.includes('@') || 
                            email.toLowerCase().endsWith('@outlook.com') || 
                            email.toLowerCase().endsWith('@hotmail.com') ||
                            email.toLowerCase().endsWith('@live.com');

    if (isPersonalAccount) {
      // Personal Microsoft Account endpoint
      return {
        ...baseConfig,
        auth: {
          ...baseConfig.auth,
          authority: 'https://login.microsoftonline.com/consumers'
        }
      };
    } else {
      // Company/Organization account endpoint
      return {
        ...baseConfig,
        auth: {
          ...baseConfig.auth,
          authority: `https://login.microsoftonline.com/${this.AZURE_TENANT_ID}`
        }
      };
    }
  }

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

  async loginWithMSAL(email: string): Promise<any> {
    try {
      // Ensure MSAL is initialized before login
      await this.msalInitService.ensureInitialized();
      
      // Get the appropriate configuration based on email
      const config = this.getAuthConfig(email);
      
      // Create a new MSAL instance with the appropriate configuration
      const msalInstance = new PublicClientApplication(config);
      await msalInstance.initialize();
      
      // Handle any pending redirect operations
      await this.msalInitService.handleRedirectAfterLogin();
      
      // Use the new instance for login
      const loginRequest = {
        scopes: ['openid', 'profile', 'email', 'User.Read'],
        prompt: 'select_account',
        loginHint: email // Pre-fill the email field
      };

      const result = await msalInstance.loginPopup(loginRequest);

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
      const account = this.msalService.instance.getActiveAccount();
      if (!account) {
        await this.handleLogoutCleanup();
        return;
      }

      // First clear all state and storage
      await this.handleLogoutCleanup();

      // Determine if it's a personal or Azure AD account
      const isPersonalAccount = !account.tenantId || account.tenantId === 'consumers';

      if (isPersonalAccount) {
        // For personal accounts, use redirect logout
        const logoutRequest: EndSessionRequest = {
          account,
          postLogoutRedirectUri: window.location.origin + '/authentication/login'
        };

        // Redirect logout is more reliable for personal accounts
        await this.msalService.logoutRedirect(logoutRequest);
      } else {
        try {
          // For Azure AD accounts, try popup first
          const logoutRequest: EndSessionRequest = {
            account,
            postLogoutRedirectUri: window.location.origin + '/authentication/login'
          };

          // Start logout process
          await this.msalService.logoutPopup(logoutRequest).toPromise();
          
          // After logout completes, redirect to login page
          setTimeout(() => {
            // Close any open popups by finding them
            const popups = window.opener ? [window.opener] : 
                         window.parent !== window ? [window.parent] : [];
            
            popups.forEach(popup => {
              try {
                if (popup && typeof popup.close === 'function') {
                  popup.close();
                }
              } catch (e) {
                console.warn('Error closing popup:', e);
              }
            });

            // Navigate to login page
            window.location.href = '/authentication/login';
          }, 1000);

        } catch (error) {
          console.warn('Popup logout failed, using redirect:', error);
          // Fallback to redirect logout
          await this.msalService.logoutRedirect({
            account,
            postLogoutRedirectUri: window.location.origin + '/authentication/login'
          });
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Force cleanup and navigation on error
      await this.handleLogoutCleanup();
      window.location.href = '/authentication/login';
    }
  }

  private async handleLogoutCleanup(): Promise<void> {
    try {
      // Clear MSAL state
      await this.clearMsalState();

      // Clear all browser storage
      localStorage.clear();
      sessionStorage.clear();

      // Clear specific MSAL-related items
      const msalKeys = [
        'msal.client.info',
        'msal.interaction.status',
        'msal.browser.state',
        'msal.active-account',
        'msal.account.keys',
        'msal.token.keys'
      ];
      
      msalKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });

      // Clear all cookies
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.split('=');
        if (name) {
          const trimmedName = name.trim();
          document.cookie = `${trimmedName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${trimmedName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
          document.cookie = `${trimmedName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
        }
      });

      // Reset MSAL instance
      this.msalService.instance.setActiveAccount(null);
      this.msalService.instance.clearCache();

    } catch (error) {
      console.error('Error during logout cleanup:', error);
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
