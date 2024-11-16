import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';


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

}
