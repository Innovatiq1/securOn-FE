import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
})
export class AppSideLoginComponent {
  private msalService = inject(MsalService);

  options = this.settings.getOptions();
  _showError: boolean = false;
  submitted: boolean = false;
  forgot: boolean = false;
  resetForm: FormGroup;
  form: FormGroup;
  hide = true;
  rememberMe: boolean = false;

  constructor(
    private settings: CoreService,
    private router: Router,
    public userService: UserService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(MiscellaneousConstant.emailPatternWithCaps),
        ]),
      ],
      password: new FormControl('', [Validators.required]),
      rememberMe: [false],
    });

    this.resetForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(MiscellaneousConstant.emailPatternWithCaps),
        ]),
      ],
    });
  }

  async ngOnInit() {
    try {
      // Clear any existing MSAL state on component init
      await this.authService.clearMsalState();
      
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/dashboards']);
      }
      this.loadRememberedUser();
    } catch (error) {
      console.error('Error in ngOnInit:', error);
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
  
    try {
      // Clear any existing MSAL state before attempting login
      await this.authService.clearMsalState();

      // Step 1: Backend validation
      const response: any = await this.userService.validateLogin({ email, password }).toPromise();
      console.log('Login response:', response);
      
      if (response && response.status === 200 && response.message === "Welcome! Login Successful!") {
        try {
          // Step 2: Trigger MSAL login first
          const msalResult = await this.authService.loginWithMSAL();
          if (msalResult && msalResult.account) {
            // Save remember me preferences
            if (rememberMe) {
              localStorage.setItem('rememberedEmail', email);
              localStorage.setItem('rememberedPassword', password);
            } else {
              localStorage.removeItem('rememberedEmail');
              localStorage.removeItem('rememberedPassword');
            }

            // Only store credentials if MSAL login was successful
            localStorage.setItem('token', response.accessToken);
            if (response.data) {
              localStorage.setItem('userId', response.data._id);
              localStorage.setItem('userName', response.data.username);
            }
            
            this.msalService.instance.setActiveAccount(msalResult.account);
            await this.router.navigate(['/dashboards']);
          } else {
            throw new Error('MSAL login failed - no account returned');
          }
        } catch (msalError) {
          console.error('MSAL login failed:', msalError);
          // Clear any partial state
          await this.authService.clearMsalState();
          this._showError = true;
          this.cdr.markForCheck();
        }
      } else {
        console.log('Login validation failed:', response);
        this._showError = true;
        this.cdr.markForCheck();
      }
    } catch (err) {
      console.error('Login failed:', err);
      this._showError = true;
      this.cdr.markForCheck();
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
