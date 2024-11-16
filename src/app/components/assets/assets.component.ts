import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { EditAssetComponent } from '../edit-asset/edit-asset.component';
import { MatDialog } from '@angular/material/dialog';
import { LogCveService } from 'src/app/services/api/log-cve.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';

export interface assetData {
  project: string;
  brand: string;
  osType: string;
  partNo: string;
  productDesc: string;
  type: string;
  serialNo: string;
  firmwareVersion: any;
  vulnerabilities: number;
}

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablerIconsModule,
    RouterModule,
  ],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {
  displayedColumns: string[] = [
    '#',
    'project',
    'brand',
    'osType',
    'partNo',
    'productDesc',
    'type',
    'serialNo',
    'firmwareVersion',
    'vulnerabilities',
    'action',
  ];

  formattedStartDate: string;
  formattedEndDate: string;
  dataSource: any[];
  projects: any[] = [];
  vendors: any[] = [];
  ostypes: any[] = [];
  partNo: any[] = [];
  fwVersion: any[] = [];
  constructor(
    public dialog: MatDialog,
    private logCveService: LogCveService,
    private vulnerabilitiesService: VulnerabilitiesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const startDate = localStorage.getItem('startDate') || '';
    const endDate = localStorage.getItem('endDate') || '';

    this.formattedStartDate = startDate.toString();
    this.formattedEndDate = endDate.toString();
    console.log(`Start Date: ${startDate} - ${this.formattedEndDate}`);
    this.loadAssets();
  }

  public loadAssets() {
    this.logCveService
      .loadAllAssets(this.formattedStartDate, this.formattedEndDate)
      .subscribe((data: any[]) => {
        this.dataSource = data;

        if (data.length !== 0) {
          data.forEach((item) => {
            if (item.project && !this.projects.includes(item.project)) {
              this.projects.push(item.project);
            }
            if (item.vendor && !this.vendors.includes(item.vendor)) {
              this.vendors.push(item.vendor);
            }
            if (item.osType && !this.ostypes.includes(item.osType)) {
              this.ostypes.push(item.osType);
            }
            if (item.partNo && !this.partNo.includes(item.partNo)) {
              this.ostypes.push(item.partNo);
            }
            if (
              item.firmwareVersion &&
              !this.fwVersion.includes(item.firmwareVersion)
            ) {
              this.fwVersion.push(item.firmwareVersion);
            }
          });

          console.log('Projects:', this.projects);
          console.log('Vendors:', this.vendors);
          console.log('OSTypes:', this.ostypes);
          console.log('no:', this.partNo);
          console.log('fw:', this.fwVersion);
        }

        this.cdr.detectChanges();
      });
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(EditAssetComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe(() => {});
  }
}
