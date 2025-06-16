import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ScanTypeService } from 'src/app/services/api/scan-type.service';

export interface PatchData {
  _id: string;
  project: string;
  brandOS: string;
  type: string;
  partNo: string;
  productDescType: string;
  serialNo: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-manual-patch',
  templateUrl: './manual-patch.component.html',
  styleUrls: ['./manual-patch.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ManualPatchComponent implements OnInit {
  displayedColumns: string[] = ['select', 'project', 'brandOS', 'type', 'partNo', 'productDescType', 'serialNo', 'status', 'date'];
  dataSource: MatTableDataSource<PatchData> = new MatTableDataSource();
  selection = new SelectionModel<PatchData>(true, []);

  alertMessage: string | null = null;
  alertType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'success';

  showAlert(type: typeof this.alertType, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.alertMessage = null, 4000);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private scanTypeService: ScanTypeService) {}

  ngOnInit(): void {
    this.scanTypeService.filterScanType({ scanType: false }).subscribe((patches: PatchData[]) => {
      // Set default status if not present
      patches.forEach(p => {
        if (!p.status) p.status = 'Not Yet Started';
      });
      this.dataSource.data = patches;
    });
  }

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

  editItem(element: PatchData) {
    console.log('Edit item:', element);
    // Implement edit logic here
  }

  deleteItem(element: PatchData) {
    console.log('Delete item:', element);
    // Implement delete logic here
  }

  onStatusChange(element: PatchData) {
    this.scanTypeService.updateScanType(element._id, { status: element.status }).subscribe({
      next: () => {
        this.showAlert('success', 'Status updated successfully!');
      },
      error: () => {
        this.showAlert('danger', 'Failed to update status!');
      }
    });
  }
} 