import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

export interface PatchData {
  project: string;
  brandOS: string;
  type: string;
  partNo: string;
  productDescType: string;
  serialNo: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss'
})
export class ApprovalComponent implements OnInit {
  displayedColumns: string[] = ['select', 'project', 'brandOS', 'type', 'partNo', 'productDescType', 'serialNo', 'status', 'date'];
  dataSource: MatTableDataSource<PatchData>;
  selection = new SelectionModel<PatchData>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const patches: PatchData[] = [
      { project: 'Project 1', brandOS: 'Cisco IOS', type: 'Switch', partNo: 'PN001', productDescType: 'Desc 1', serialNo: 'SN001', status: 'Pending', date: '2024-06-01' },
      { project: 'Project 2', brandOS: 'Fortinet FortiOS', type: 'Firewall', partNo: 'PN002', productDescType: 'Desc 2', serialNo: 'SN002', status: 'Completed', date: '2024-06-02' },
    ];
    this.dataSource = new MatTableDataSource(patches);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PatchData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
}
