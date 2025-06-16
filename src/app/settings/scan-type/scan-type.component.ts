import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ScanTypeCreateDialogComponent } from '../scan-type-create-dialog/scan-type-create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScanTypeService } from 'src/app/services/api/scan-type.service';

export interface ScanTypeData {
  id?: number;
  brand: string;
  project: string;
  serialNo: string;
  partNo: string;
  scanType: string;
}

@Component({
  selector: 'app-scan-type',
  templateUrl: './scan-type.component.html',
  styleUrls: ['./scan-type.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule, MatDialogModule, ScanTypeCreateDialogComponent]
})
export class ScanTypeComponent implements OnInit {
  displayedColumns: string[] = ['select', 'brand', 'project', 'serialNo', 'partNo', 'scanType', 'actions'];
  dataSource: MatTableDataSource<ScanTypeData> = new MatTableDataSource();
  selection = new SelectionModel<ScanTypeData>(true, []);

  alertMessage: string | null = null;
  alertType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'success';

  showAlert(type: typeof this.alertType, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    setTimeout(() => this.alertMessage = null, 4000);
  }

  _scanTypeToDelete: any;
  @ViewChild('deleteConfirm') deleteConfirm!: TemplateRef<HTMLElement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private scanTypeService: ScanTypeService) {}

  ngOnInit(): void {
    this.scanTypeService.getAllScanTypes().subscribe((scanTypes: any[]) => {
      this.dataSource.data = scanTypes;
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

  checkboxLabel(row?: ScanTypeData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  onEdit(row: ScanTypeData) {
    const dialogRef = this.dialog.open(ScanTypeCreateDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && (row as any)._id) {
        this.scanTypeService.updateScanType((row as any)._id, result).subscribe({
          next: () => {
            this.scanTypeService.getAllScanTypes().subscribe((scanTypes: any[]) => {
              this.dataSource.data = scanTypes;
              this.showAlert('success', 'Scan type updated successfully!');
            });
          },
          error: () => {
            this.showAlert('danger', 'Failed to update scan type!');
          }
        });
      }
    });
  }

  onDelete(row: ScanTypeData) {
    this._scanTypeToDelete = row;
    const dialogRef = this.dialog.open(this.deleteConfirm, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.scanTypeService.deleteScanType((row as any)._id).subscribe({
          next: () => {
            this.scanTypeService.getAllScanTypes().subscribe((scanTypes: any[]) => {
              this.dataSource.data = scanTypes;
              this.showAlert('success', 'Scan type deleted successfully!');
            });
          },
          error: () => {
            this.showAlert('danger', 'Failed to delete scan type!');
          }
        });
      }
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(ScanTypeCreateDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      panelClass: 'full-screen-modal',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scanTypeService.getAllScanTypes().subscribe((scanTypes: any[]) => {
          this.dataSource.data = scanTypes;
        });
      }
    });
  }
}
