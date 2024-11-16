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

  constructor(
    private settings: CoreService,
    private router: Router,
    public userService: UserService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder, 
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

  

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.submitted = true;

    if (this.form.invalid) {
      return;
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
