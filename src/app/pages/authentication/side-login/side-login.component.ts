import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private settings: CoreService,
    private router: Router,
    public userService: UserService,
    private cdr: ChangeDetectorRef 
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

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
}
