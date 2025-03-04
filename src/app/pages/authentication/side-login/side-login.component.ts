import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
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
import { MiscellaneousConstant } from 'src/app/services/auth/miscalleneous-constants';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
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
    private authService: AuthService,
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
    rememberMe: [false]
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

ngOnInit() {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/dashboards']);
  }
  this.loadRememberedUser();
}
loadRememberedUser() {
  const storedEmail = localStorage.getItem('rememberedEmail');
  const storedPassword = localStorage.getItem('rememberedPassword');
  if (storedEmail && storedPassword) {
    this.form.patchValue({
      email: storedEmail,
      password:storedPassword,
      rememberMe: [false]
    });
    this.cdr.detectChanges();
  }
}

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const { email, password, rememberMe } = this.form.value;

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }


    let obj = this.form.value;
    this.userService.validateLogin(obj).subscribe(
      (response) => {
        if (response.data != '') {
          this._showError = false;
          localStorage.setItem('token', response?.accessToken);
          localStorage.setItem('userId', response?.data?._id);
          localStorage.setItem('userName', response?.data?.username);
          this.router.navigate(['/dashboards']);
          console.log('Token stored:', localStorage.getItem('token'));
        } else {
          this._showError = true;
          this.cdr.markForCheck();
        }
      },
      (error) => {
        console.error('Error while logging in:', error);
      }
    ); 
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
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
