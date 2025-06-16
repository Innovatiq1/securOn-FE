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
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

export interface ScanTypeData {
  id?: number;
  brand: string;
  project: string;
  serialNo: string;
  partNo: string;
  scanType: boolean;
}

@Component({
  selector: 'app-scan-type',
  templateUrl: './scan-type.component.html',
  styleUrls: ['./scan-type.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule, MatDialogModule, ScanTypeCreateDialogComponent, FormsModule, MatRadioModule]
})
export class ScanTypeComponent implements OnInit {
  displayedColumns: string[] = ['select', 'brand', 'project', 'serialNo', 'partNo', 'scanType', 'actions'];
  dataSource: MatTableDataSource<ScanTypeData> = new MatTableDataSource();
  selection = new SelectionModel<ScanTypeData>(true, []);

  alertMessage: string | null = null;
  alertType: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'success';

  scanTypeFilter: string = 'all'; // Default to 'all'
  private filterValue: string = ''; // To store the text input filter value

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
    this.dataSource.filterPredicate = this.createFilterPredicate();
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = this.filterValue; // Trigger the custom filter predicate
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onScanTypeFilterChange() {
    // console.log('Scan type filter changed to:', this.scanTypeFilter);
    // Combine text filter and scan type filter to ensure re-evaluation
    this.dataSource.filter = `${this.filterValue.toLowerCase()}::${this.scanTypeFilter}`;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private createFilterPredicate() {
    return (data: ScanTypeData, filter: string): boolean => {
      // console.log('Filter predicate invoked:', { dataScanType: data.scanType, scanTypeFilter: this.scanTypeFilter, filterString: filter }); // Removed console.log

      const filterParts = filter.split('::');
      const textFilter = filterParts[0] || '';
      const scanTypeFilterValue = filterParts[1] || 'all';

      // Step 1: Check if the row matches the selected scan type filter
      let meetsScanTypeCriteria = false;
      if (scanTypeFilterValue === 'all') {
        meetsScanTypeCriteria = true;
      } else if (scanTypeFilterValue === 'manual') {
        meetsScanTypeCriteria = data.scanType === false; // manual is false
      } else if (scanTypeFilterValue === 'automatic') {
        meetsScanTypeCriteria = data.scanType === true; // automatic is true
      }

      if (!meetsScanTypeCriteria) {
        return false; // If it doesn't match the scan type criteria, exclude it immediately
      }

      // Step 2: If it meets scan type criteria, then apply the text filter
      const textMatches = (
        String(data.brand || '').toLowerCase().includes(textFilter) ||
        String(data.project || '').toLowerCase().includes(textFilter) ||
        String(data.serialNo || '').toLowerCase().includes(textFilter) ||
        String(data.partNo || '').toLowerCase().includes(textFilter) ||
        // Include scanType in text search only if 'All' is selected for radio filter
        (scanTypeFilterValue === 'all' && String(data.scanType === true ? 'automatic' : 'manual').toLowerCase().includes(textFilter))
      );

      return textMatches;
    };
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
