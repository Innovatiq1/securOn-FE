import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,TemplateRef,ViewChild,viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { EditAssetComponent } from '../edit-asset/edit-asset.component';
import { MatDialog } from '@angular/material/dialog';
import { LogCveService } from 'src/app/services/api/log-cve.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { deleteAssets } from 'src/app/store/vulnerabilities.actions';
import { Store,select } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material/paginator';
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
    'select',
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
  _isAssetDeletion = false;
  formattedStartDate: string;
  formattedEndDate: string;
  dataSource: any[];
  projects: any[] = [];
  vendors: any[] = [];
  ostypes: any[] = [];
  partNo: any[] = [];
  fwVersion: any[] = [];
  currentPageIndex = 0;
  readonly DEFAULT_PAGE_SIZE = 10;
  pageSize = this.DEFAULT_PAGE_SIZE;
  disablePaginator = false;
  totalItemCount = 0;
  start: number;
  end: number;
  currentPageItems: any[] = [];
  public _assetToDelete: any;
  @ViewChild('deleteConfirm') deleteConfirm: TemplateRef<HTMLElement>;
  @ViewChild('deleteMultipleConfirm')deleteMultipleConfirm: TemplateRef<HTMLElement>;
  public selection = new SelectionModel<any>(true, []);
  public _selectedCount = 0;
  constructor(
    public dialog: MatDialog,
    private logCveService: LogCveService,
    private vulnerabilitiesService: VulnerabilitiesService,
    private cdr: ChangeDetectorRef,
    private store$: Store,
  ) {
    
  }

  ngOnInit() {
    const startDate = localStorage.getItem('startDate') || '';
    const endDate = localStorage.getItem('endDate') || '';

    this.formattedStartDate = startDate.toString();
    this.formattedEndDate = endDate.toString();
    this.loadAssets();
    this.resetPagination();
    this.paginate();
  }

  public loadAssets() {
    this.logCveService
      .loadAllAssets(this.formattedStartDate, this.formattedEndDate)
      .subscribe((data: any[]) => {
        this.dataSource = data;
        this.resetPagination();
        this.paginate();
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
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log("num seletecd",this.selection.selected)
    const numRows = this.dataSource.length;
    this._selectedCount = numSelected;
    return numSelected === numRows;
  } 

  toggleAllRows() {
    if (this.isAllSelected()) {
      this._selectedCount = 0;
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);

    this._selectedCount = this.selection['_selection']?.length;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  showConfirmation(confirmation: any, asset?: any): void {
    this._assetToDelete = asset;
    const dialogRef = this.dialog.open(confirmation, {});
    dialogRef.afterClosed().subscribe((result) => {
      let assetsList = [];
      assetsList = [this._assetToDelete];
      // this.store$.dispatch(deleteAssets({ assets: assetsList }));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
  // deleteAsset(multiple?: boolean): void {
  //   this.vulnerabilitiesService.setDataLoading(true);
  //   this._isAssetDeletion = true;
  //   let assetsList = [];
  //   // if (multiple) {
  //   //   assetsList = [...this.selection.selected];
  //   // } else {
  //     assetsList = [this._assetToDelete];
  //   // }
  //   console.log("assetsList123",assetsList)
  //   this.vulnerabilitiesService.deleteAssets(assetsList);
  //   setTimeout(() => {
  //     this.vulnerabilitiesService.setDataLoading(false);
  //     // this.toastr.success('Assets deleted successfully', 'Success', {
  //     //   timeOut: 3000,
  //     //   positionClass: 'toast-top-right',
  //     // });
  //     // window.location.reload();
  //   }, 2000);
  //   // this.showAlert = true;
  // }
  deleteAsset(multiple?: boolean) { 
   let assetsList = [];
     if (multiple) {
        assetsList = [...this.selection.selected];
     } else {
       assetsList = [this._assetToDelete];
      }
   this.vulnerabilitiesService.deleteAsset(assetsList).subscribe({ next: () => { 
    // console.log('Assets deleted successfully');           
    error: (error:any) => {console.error('Error:', error); 
    } }}); }

    _onPageChange(page: PageEvent): void {
      this.currentPageIndex = page.pageIndex;
      this.pageSize = page.pageSize;
      this.paginate();
    }

    private paginate(): void {
      const sortedDataSource = [...this.dataSource];
      sortedDataSource.reverse();
      console.log("data sourse",sortedDataSource)
      this.totalItemCount = sortedDataSource.length;
      if (this.totalItemCount > this.pageSize) {
        const start = localStorage.getItem('start');
        const end = localStorage.getItem('end');
        const pageSize = localStorage.getItem('pageSize');
        const currentPageIndex = localStorage.getItem('currentPageIndex');
  
        if (start && end && pageSize && currentPageIndex) {
          const startIndex = parseInt(start);
          const endIndex = parseInt(end);
          const pageSizeIndex = parseInt(pageSize);
          const currentPage = parseInt(currentPageIndex);
          this.disablePaginator = false;
          this.start = startIndex;
          this.end = endIndex;
          this.pageSize = pageSizeIndex;
          this.currentPageIndex = currentPage;
          this.currentPageItems = sortedDataSource.slice(startIndex, endIndex);
          setTimeout(() => {
            localStorage.removeItem('start');
            localStorage.removeItem('end');
          }, 2000);
        } else {
          this.disablePaginator = false;
          const itemsToShowStartIndex = this.currentPageIndex * this.pageSize;
          const itemsToShowEndIndex = itemsToShowStartIndex + this.pageSize;
          this.start = itemsToShowStartIndex;
          this.end = itemsToShowEndIndex;
          this.currentPageItems = sortedDataSource.slice(
            itemsToShowStartIndex,
            itemsToShowEndIndex
          );
        }
      } else {
        this.disablePaginator = true;
        this.currentPageItems = sortedDataSource;
      }
    }
  
    resetPagination(): void {
      this.currentPageIndex = 0;
      this.pageSize = this.DEFAULT_PAGE_SIZE;
    }

}
