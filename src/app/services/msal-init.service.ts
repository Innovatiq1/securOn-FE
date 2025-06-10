import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class MsalInitService {
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;
  private initializationSubject = new BehaviorSubject<boolean>(false);
  private inProgress = false;

  constructor(private msalService: MsalService) {
    // Start initialization immediately
    this.initialize().catch(error => {
      console.error('Failed to initialize MSAL in constructor:', error);
    });
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return Promise.resolve();
    }

    if (!this.initializationPromise) {
      this.initializationPromise = (async () => {
        try {
          // Initialize MSAL first
          await this.msalService.initialize();

          // Wait a bit to ensure any pending operations are complete
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Handle any redirect operation
          await this.handleRedirectPromise();
          
          this.initialized = true;
          this.initializationSubject.next(true);
        } catch (error) {
          console.error('Failed to initialize MSAL:', error);
          this.initialized = false;
          this.initializationPromise = null;
          this.initializationSubject.next(false);
          throw error;
        }
      })();
    }

    return this.initializationPromise;
  }

  private async handleRedirectPromise(): Promise<void> {
    if (this.inProgress) {
      return;
    }

    try {
      this.inProgress = true;
      // Handle redirect promise
      const result = await this.msalService.instance.handleRedirectPromise();
      if (result) {
        // Handle successful authentication
        this.handleAuthenticationResult(result);
      }
    } catch (redirectError) {
      console.error('Error handling redirect:', redirectError);
      // Continue initialization even if redirect handling fails
    } finally {
      this.inProgress = false;
    }
  }

  private handleAuthenticationResult(result: AuthenticationResult): void {
    if (result) {
      // Set the active account
      this.msalService.instance.setActiveAccount(result.account);
    }
  }

  async ensureInitialized(): Promise<void> {
    if (!this.initialized || !this.initializationPromise) {
      // If not initialized or initialization failed, try to initialize again
      this.initializationPromise = this.initialize();
    }
    return this.initializationPromise;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async resetInitialization(): Promise<void> {
    try {
      // Wait for any in-progress operations to complete
      if (this.inProgress) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      this.initialized = false;
      this.initializationPromise = null;
      this.initializationSubject.next(false);

      // Clear cache and accounts
      this.msalService.instance.clearCache();
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.msalService.instance.setActiveAccount(null);
      }

      // Reinitialize
      await this.initialize();
    } catch (error) {
      console.error('Error during reset:', error);
      throw error;
    }
  }

  async handleRedirectAfterLogin(): Promise<void> {
    try {
      // Ensure initialized first
      await this.ensureInitialized();
      
      // Handle any redirect operation
      await this.handleRedirectPromise();
    } catch (error) {
      console.error('Error handling redirect after login:', error);
      throw error;
    }
  }
} 