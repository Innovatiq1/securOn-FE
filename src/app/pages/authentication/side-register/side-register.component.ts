import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MiscellaneousConstant } from 'src/app/services/auth/miscalleneous-constants';
import { ConfirmedValidator } from 'src/app/services/auth/password.validator';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent implements OnInit{
  options = this.settings.getOptions();
  hide = true;
  chide = true;
  form: FormGroup | any;
  submitted: boolean = false;
  email: any;

  constructor(private settings: CoreService, private router: Router, private formBuilder: FormBuilder, 
    public userService: UserService,) { 
   this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(MiscellaneousConstant.emailPatternWithCaps),
        ]),
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'cpassword')

    });
  }

  

  get f() {
    return this.form.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
  submit() {
    if (this.form.valid) {
      let obj = this.form.value;
      console.log("working");
      this.userService.signUp(obj).subscribe(
        
        (response: any) => {
          Swal.fire({
            title: response.message,
            icon: 'success',
          });
          if(response.message =='successfully registered'){
            this.router.navigate(['/auth/login']);
          }
        
        },
        (error: any) => {
          this.submitted = true;
          this.email = error
        }
      );
    }
    this.submitted = true;

  }
}
