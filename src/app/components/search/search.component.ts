import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

export interface assetData {
  cve: any;
  project: string;
  osType: string;
  partNo: string;
  firmwareVersion: any;
  serialNo: string;
  vendor: string;
  product: string;
  sevierity: string;
  fix: string;
  affected: string;
}

const ASSET_DATA: assetData[] = [
  {
    cve: 'CVE-2024-20437',
    project: 'Aegis',
    osType: 'Ios Xr',
    partNo: 'Asr 1001-x',
    firmwareVersion: 16.6,
    serialNo: '	FXS2129Q0BT',
    vendor: 'Cisco',
    product: 'asr 1001-x',
    sevierity: 'HIGH',
    fix: 'No',
    affected: 'Yes',
  },
  {
    cve: 'CVE-2024-20437',
    project: 'CRS',
    osType: 'Ios Xr',
    partNo: 'Asr 1001-x',
    firmwareVersion: 16.6,
    serialNo: '	FXS2129Q0BT',
    vendor: 'Cisco',
    product: 'asr 1001-x',
    sevierity: 'LOW',
    fix: 'No',
    affected: 'Yes',
  },
  {
    cve: 'CVE-2024-20437',
    project: 'CTZ',
    osType: 'Ios',
    partNo: 'Asr 1001-x',
    firmwareVersion: 16.6,
    serialNo: '	FXS2129Q0BT',
    vendor: 'Cisco',
    product: 'asr 1001-x',
    sevierity: 'CRITICAL',
    fix: 'No',
    affected: 'Yes',
  },
  {
    cve: 'CVE-2024-20437',
    project: 'Cube',
    osType: 'Ios',
    partNo: '4451-x Integrated Services',
    firmwareVersion: 16.6,
    serialNo: '	FXS2129Q0BT',
    vendor: 'Cisco',
    product: 'asr 1001-x',
    sevierity: 'LOW',
    fix: 'No',
    affected: 'Yes',
  },
  {
    cve: 'CVE-2024-20437',
    project: 'Oceanshield',
    osType: 'Firepower Threat Defense',
    partNo: 'Asr 1001-x',
    firmwareVersion: 16.6,
    serialNo: '	FXS2129Q0BT',
    vendor: 'Cisco',
    product: 'asr 1001-x',
    sevierity: 'CRITICAL',
    fix: 'No',
    affected: 'Yes',
  },
];

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablerIconsModule,
    RouterModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  displayedColumns: string[] = [
    '#',
    'cve',
    'project',
    'osType',
    'partNo',
    'firmwareVersion',
    'serialNo',
    'vendor',
    'product',
    'sevierity',
    'fix',
    'affected',
    'action',
  ];
  dataSource = ASSET_DATA;
}
