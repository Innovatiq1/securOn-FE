import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { CoreService } from 'src/app/services/core.service';
import { MiscellaneousConstant } from 'src/app/services/auth/miscalleneous-constants';
import { AuthService } from '../auth.service';
import { MsalService } from '@azure/msal-angular';
import { MsalInitService } from '../../../services/msal-init.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './side-login.component.html',
  styles: [`
    .error-message {
      display: block;
      margin: -15px 0 15px;
      color: #f44336;
      font-size: 14px;
    }
    .text-error {
      color: #f44336;
      font-weight: 500;
    }
  `]
})
export class AppSideLoginComponent implements OnInit {
  private msalService = inject(MsalService);
  private msalInitService = inject(MsalInitService);

  options = this.settings.getOptions();
  _showError: boolean = false;
  errorMessage: string = 'Invalid login details';
  submitted: boolean = false;
  forgot: boolean = false;
  resetForm: FormGroup;
  form: FormGroup;
  hide = true;
  rememberMe: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private settings: CoreService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit() {
    try {
      // Ensure MSAL is initialized before any operations
      await this.msalInitService.ensureInitialized();
      
      // Clear any existing MSAL state on component init
      await this.authService.clearMsalState();
      
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/dashboards']);
      }
      this.loadRememberedUser();
    } catch (error) {
      console.error('Error in ngOnInit:', error);
      this._showError = true;
      this.cdr.markForCheck();
    }
  }

  loadRememberedUser() {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail && storedPassword) {
      this.form.patchValue({
        email: storedEmail,
        password: storedPassword,
        rememberMe: true,
      });
      this.cdr.detectChanges();
    }
  }

  get f() {
    return this.form.controls;
  }

  async submit() {
    this.submitted = true;
    if (this.form.invalid) return;
  
    const { email, password, rememberMe } = this.form.value;
    this._showError = false;
    this.errorMessage = 'Invalid login details';
  
    try {
      // Force clear all browser sessions and MSAL state
      await this.msalInitService.clearAllCache();
      
      // Close any existing popups
      this.msalService.instance.clearCache();
      this.msalService.instance.setActiveAccount(null);

      // Step 1: Trigger MSAL login first to get Microsoft account
      const msalResult = await this.authService.loginWithMSAL(email);
      if (!msalResult || !msalResult.account) {
        throw new Error('MSAL login failed - no account returned');
      }

      // Step 2: Simple email validation - just check if the entered email matches the logged in account
      const msalEmail = msalResult.account.username.toLowerCase();
      const formEmail = email.toLowerCase();
      
      if (msalEmail !== formEmail) {
        console.error('Email mismatch: Form email does not match Microsoft account email');
        this._showError = true;
        this.errorMessage = 'The email entered does not match the Microsoft account you logged in with. Please try again.';
        this.cdr.markForCheck();
        await this.forceLogout();
        return;
      }

      // Step 3: Backend validation
      const response: any = await this.userService.validateLogin({ email, password }).toPromise();
      console.log('Login response:', response);
      
      if (response && response.status === 200 && response.message === "Welcome! Login Successful!") {
        // Save remember me preferences
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }

        // Store credentials since both MSAL and backend validation passed
        localStorage.setItem('token', response.accessToken);
        if (response.data) {
          localStorage.setItem('userId', response.data._id);
          localStorage.setItem('userName', response.data.username);
        }
        
        this.msalService.instance.setActiveAccount(msalResult.account);
        await this.router.navigate(['/dashboards']);
      } else {
        console.log('Login validation failed:', response);
        this._showError = true;
        this.errorMessage = response.message || 'Invalid login details';
        this.cdr.markForCheck();
        await this.forceLogout();
      }
    } catch (error) {
      console.error('Login failed:', error);
      this._showError = true;
      this.errorMessage = 'An error occurred during login. Please try again.';
      this.cdr.markForCheck();
      await this.forceLogout();
    }
  }

  private async forceLogout(): Promise<void> {
    try {
      // Clear all MSAL cache and state
      await this.msalInitService.clearAllCache();
      
      // Force MSAL logout
      const account = this.msalService.instance.getActiveAccount();
      if (account) {
        const logoutRequest = {
          account,
          postLogoutRedirectUri: window.location.origin + '/authentication/login'
        };
        
        try {
          // Try popup logout first
          await this.msalService.logoutPopup(logoutRequest).toPromise();
        } catch (e) {
          console.error('Popup logout failed, trying redirect:', e);
          // If popup fails, try redirect
          await this.msalService.logoutRedirect(logoutRequest).toPromise();
        }
      }

      // Clear any remaining browser storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear cookies related to authentication
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

    } catch (error) {
      console.error('Error during force logout:', error);
    }
  }
  
  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  reset() {
    this.userService.forgotPassword(this.resetForm.value).subscribe(
      (response) => {
        console.log('Password reset response:', response);
      },
      (error) => {
        console.error('Error while resetting password:', error);
      }
    );
  }

  forgotPsw() {
    this.forgot = true;
  }

  signIn() {
    this.forgot = false;
  }
}
