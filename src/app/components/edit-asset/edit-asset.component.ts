import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import {  Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogCveService } from 'src/app/services/api/log-cve.service';
@Component({
  selector: 'app-edit-asset',
  standalone: true,
  imports: [ MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablerIconsModule,
    RouterModule,],
  templateUrl: './edit-asset.component.html',
  styleUrl: './edit-asset.component.scss'
})
export class EditAssetComponent {

  public _formGroup: FormGroup;
  public _asset: any;
  constructor(private formBuilder: FormBuilder, private logCveService: LogCveService,private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this._formGroup = this.formBuilder.group({
      project: [''],
      vendor: [''],
      osType: [''],
      serialNo: [''],
      type: [''],
      firmwareVersion: [''],
      partNo: [''],
      product: [''],
      status: ['']
    });

    // Patch the data into the form
    if (data) {
      this._formGroup.patchValue(data);
      console.log("patch data",data)
    }
   
  }
  _editAsset(){
    // console.log('Updated Asset Data:', this._formGroup.value);
    // const updatedAsset=this._formGroup.value;
    const updatedAsset = {
      ...this._formGroup.value,
      _id: this.data._id, // Include the _id from the passed data
    };
    this.logCveService.updateAsset(updatedAsset).subscribe((response: any) => {
      // this.toastr.success('Asset updated successfully', 'Success', {
      //   timeOut: 3000,
      //   positionClass: 'toast-bottom-right',
      // });
      // this.router.navigate(['/cve/assets']);
      window.location.reload();
    });
  }
}
