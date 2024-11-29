import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef, } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-assets',
  standalone: true,
  imports: [ MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablerIconsModule,
    RouterModule,],
  templateUrl: './create-assets.component.html',
  styleUrl: './create-assets.component.scss'
})
export class CreateAssetsComponent {
  assetFormGroup: FormGroup;
  constructor( 
    private _formBuilder: FormBuilder,
    private vulnerabilitiesService: VulnerabilitiesService, private router: Router,private toastr: ToastrService,private cdr: ChangeDetectorRef){
      this.assetFormGroup = this._formBuilder.group({
        project: [''],
        vendor: ['',  [Validators.required]],
        osType: [''],
        serialNo: [''],
        type: [''],
        firmwareVersion: [''],
        partNo: [''],
        product: [''],
        status: ['A'],
      });
   
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.assetFormGroup.controls[controlName].hasError(errorName);
  };
  submit(){
    const assetData = this.assetFormGroup.value;
    assetData.status == 'active' ? 'A' : 'I';
    this.vulnerabilitiesService.saveAsset(assetData).subscribe(data=>{
      if (data) {
        this.toastr.success('Asset created successfully');
        setTimeout(() => {
          this.router.navigate(['/cve/assets']);
          this.cdr.detectChanges();
        }, 2000); 
      }

    })
  }
  cancel(){
    window.history.back();
    // this.router.navigate(['/cve/assets']);
  }
}
