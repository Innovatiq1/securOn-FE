import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  QueryList,
  TemplateRef,
  ViewChild,
  viewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { EditAssetComponent } from '../edit-asset/edit-asset.component';
import { MatDialog } from '@angular/material/dialog';
import { LogCveService } from 'src/app/services/api/log-cve.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { deleteAssets } from 'src/app/store/vulnerabilities.actions';
import { Store, select } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { distinctUntilChanged, interval, map, Subscription } from 'rxjs';
import moment from 'moment';
import { SPACE } from '@angular/cdk/keycodes';
import { MatSelect } from '@angular/material/select';
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
  public _vendors: Set<string>;
  public _partNo: Set<string>;
  public _projects: Set<string>;
  public _osTypes: Set<string>;
  public _firmwareVersions: Set<string>;
  private defaultOptionAll = 'All';
  private defaultProductOptionAll = 'All';
  public defaultOsTypeOptionAll = 'All';
  public defaultFwOptionAll = 'All';
  public isVendorAllPrevSelected = false;
  public isProductAllPrevSelected = false;
  public isOsTypeAllPrevSelected = false;
  isFirmwareAllPrevSelected = false;
  public isPojectAllPrevSelected = false;
  public _selectedVendor: string[] = [];
  public _selectedProduct: string[] = [];
  public _selectedOsType: string[] = [];
  _selectedFirmwareVersion: string[] = [];
  public _selectedPoject: string[] = [];
  public showAlert = false;
  formattedStartDate: string = '';
  formattedEndDate: string;
  public _assets: any[] = [];
  dataSource: any[];
  projects: any[] = [];
  vendors: any[] = [];
  ostypes: any[] = [];
  partNo: any[] = [];
  fwVersion: any[] = [];
  filteredPartNo: string[] = [];
  filteredOsType: string[] = [];
  filteredFwVersion: string[] = [];
  filteredProjects: string[] = [];
  filteredVendor: string[] = [];
  currentPageIndex = 0;
  readonly DEFAULT_PAGE_SIZE = 10;
  pageSize = this.DEFAULT_PAGE_SIZE;
  disablePaginator = false;
  totalItemCount = 0;
  start: number;
  end: number;
  currentPageItems: any[] = [];
  projectFilter: string = '';
  vendorFilter: any;
  partNoFilter: any;
  osTypeFilter: any;
  fwVersionFilter: any;
  public _assetToDelete: any;
  @ViewChild('deleteConfirm') deleteConfirm: TemplateRef<HTMLElement>;
  @ViewChild('deleteMultipleConfirm')
  deleteMultipleConfirm: TemplateRef<HTMLElement>;
  public selection = new SelectionModel<any>(true, []);
  public _selectedCount = 0;
  // previousStartDate: string = '';
  previousEndDate: string = '';
  storageInterval: any;
  private previousStartDate: string | null = localStorage.getItem('startDate');
  @ViewChild('select', { static: true }) select: any;
  @ViewChild('select1', { static: true }) select1: any;
  @ViewChild('select2', { static: true }) select2: any;
  @ViewChild('select3', { static: true }) select3: any;
  @ViewChild('select4', { static: true }) select4: any;
  @ViewChild('select5', { static: true }) select5: any;
  private subscriptions: Subscription = new Subscription();
  constructor(
    public dialog: MatDialog,
    private logCveService: LogCveService,
    private vulnerabilitiesService: VulnerabilitiesService,
    private cdr: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
    private toastr: ToastrService,
    public vulnerabilityDataService: VulnerabilityDataService
  ) { }

  ngOnInit() {

    const startDate = localStorage.getItem('startDate') || '';
    const endDate = localStorage.getItem('endDate') || '';

    this.formattedStartDate = startDate.toString();
    this.formattedEndDate = endDate.toString();
    this.vulnerabilitiesService.setDataLoading(true);
    this.vulnerabilityDataService.show();
    this.loadAssets();

    this._selectedPoject = this.vulnerabilitiesService.getSelectedAssetProject() || [];
    // if (this._selectedPoject.length > 0) {
    //     this._projectChange();
    // }

    this._selectedProduct = this.vulnerabilitiesService.getSelectedAssetPartNo() || [];
    // if (this._selectedProduct.length > 0) {
    //     this._projectChange();
    // }



    this._selectedVendor = this.vulnerabilitiesService.getSelectedAssetVendor() || [];
    // if (this._selectedVendor.length > 0) {
    //     this._projectChange();
    // }

    this._selectedOsType = this.vulnerabilitiesService.getSelectedAssetOsType() || [];
    // if (this._selectedOsType.length > 0) {
    //     this._projectChange();
    // }
    this._selectedFirmwareVersion = this.vulnerabilitiesService.getSelectedAssetFwVesrion() || [];
    // if (this._selectedFirmwareVersion.length > 0) {
    //     this._projectChange();
    // }
    this.select._handleKeydown = (event: KeyboardEvent) => {
      if (event.keyCode == SPACE)
        return
      if (!this.select.disabled) {
        this.select.panelOpen
          ? this.select._handleOpenKeydown(event)
          : this.select._handleClosedKeydown(event);
      }
    };
    this.select1._handleKeydown = (event: KeyboardEvent) => {
      if (event.keyCode == SPACE)
        return
      if (!this.select1.disabled) {
        this.select1.panelOpen
          ? this.select1._handleOpenKeydown(event)
          : this.select1._handleClosedKeydown(event);
      }
    };
    this.select2._handleKeydown = (event: KeyboardEvent) => {
      if (event.keyCode == SPACE)
        return
      if (!this.select2.disabled) {
        this.select2.panelOpen
          ? this.select2._handleOpenKeydown(event)
          : this.select2._handleClosedKeydown(event);
      }
    };
    this.select3._handleKeydown = (event: KeyboardEvent) => {
      if (event.keyCode == SPACE)
        return
      if (!this.select3.disabled) {
        this.select3.panelOpen
          ? this.select3._handleOpenKeydown(event)
          : this.select3._handleClosedKeydown(event);
      }
    };
    this.select4._handleKeydown = (event: KeyboardEvent) => {
      if (event.keyCode == SPACE)
        return
      if (!this.select4.disabled) {
        this.select4.panelOpen
          ? this.select4._handleOpenKeydown(event)
          : this.select4._handleClosedKeydown(event);
      }
    };

    interval(1000)
      .pipe(
        map(() => localStorage.getItem('startDate')),
        distinctUntilChanged()
      )
      .subscribe((currentStartDate) => {
        if (currentStartDate !== this.previousStartDate) {
          this.previousStartDate = currentStartDate;
          this.loadAssets();
        }
      });
  }



  public loadAssets() {
    this.vulnerabilityDataService.show();
  
    let fromDate = '';
    let toDate = '';
  
    // Fetch dates AFTER they are stored in localStorage
    setTimeout(() => {
      const currentStartDate = localStorage.getItem('startDate') || '';
      const currentEndDate = localStorage.getItem('endDate') || '';
  
      if (currentStartDate && currentEndDate) {
        fromDate = moment(currentStartDate).format('YYYY-MM-DD');
        toDate = moment(currentEndDate).format('YYYY-MM-DD');
      }
  
      // Call API
      this.logCveService.loadAllAssets(fromDate, toDate).subscribe((data: any[]) => {
        this._assets = data;
        this.dataSource = data;
        this.vulnerabilityDataService.hide();
  
        if (this._assets && this._assets.length) {
          this.prepareFilters();
        }
  
        this._projectChange();
        this._osTypeChange();
        const storedVendors = sessionStorage.getItem('selectedVendor') || '';
  
        if (storedVendors) {
          const parsedVendors = JSON.parse(storedVendors);
  
          if (Array.isArray(parsedVendors) && parsedVendors.length > 0) {
            this._selectedVendor = parsedVendors;
          }
        }
  
 
        this.productChange();
        this._firmwareVersionChange();
        this.cdr.detectChanges();
  
        this.paginate();
      });
    }, 100); // Small delay to ensure localStorage is updated first
  }
  
  

  resetFilters(): void {
    this.dataSource = this._assets;
    this._selectedPoject = [];
    this._selectedProduct = [];
    this._selectedVendor = [];
    this._selectedOsType = [];
    this._selectedFirmwareVersion = [];
    sessionStorage.removeItem('selectedVendor');
    this.resetPagination();
    this.prepareFilters();
    this.paginate();
    this.loadAssets();
  }



  uploadFile($event: any): void {
    this.vulnerabilityDataService.show();
    const selectedFile: File = $event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('xlsx', selectedFile);

      this.logCveService.uploadAssets(formData).subscribe({
        next: (response: any) => {
          this.showAlert = true;
          //  console.log('Upload successful:', response);
          this.toastr.success("Uploaded Successfully");
          this.loadAssets();
          this.vulnerabilityDataService.hide();
        },
        error: (error: any) => {
          console.error('Upload failed:', error);
          this.showAlert = false;
        },
        complete: () => {
          this.vulnerabilitiesService.setDataLoading(false);
          $event.target.value = null;
          this.loadAssets();
          this.vulnerabilityDataService.hide();
        },
      });
    }
  }
  private prepareFilters(
    byProduct: boolean = false,
    byProject: boolean = false,
    edit: boolean = false
  ): void {
    try {
      if (!this._assets || !Array.isArray(this._assets)) {
        console.error('❌ _assets is undefined or not an array:', this._assets);
        return;
      }
      if (!this.dataSource || !Array.isArray(this.dataSource)) {
        console.error('❌ dataSource is undefined or not an array:', this.dataSource);
        return;
      }

      // Preserve previously selected filters
      const previousSelectedVendor = Array.isArray(this._selectedVendor) ? [...this._selectedVendor] : [this.defaultOptionAll];



      // Initialize filter sets if they don't exist
      this._vendors = this._vendors ?? new Set();
      this._projects = this._projects ?? new Set();
      this._partNo = this._partNo ?? new Set();
      this._osTypes = this._osTypes ?? new Set();
      this._firmwareVersions = this._firmwareVersions ?? new Set();

      // Backup existing values for restoration
      const partNo = this._partNo;
      const osTypes = this._osTypes;
      const firmwareVersions = this._firmwareVersions;

      if (!byProduct) {
        this._vendors = new Set();
        this._vendors.add(this.defaultOptionAll);
      }
      if (!byProject && !byProduct) {
        this._projects = new Set();
        this._projects.add(this.defaultOptionAll);
      }

      this._partNo = new Set();
      this._partNo.add(this.defaultProductOptionAll);
      this._osTypes = new Set();
      this._osTypes.add(this.defaultOptionAll);
      this._firmwareVersions = new Set();
      this._firmwareVersions.add(this.defaultOptionAll);

      if (byProduct || byProject) {
        if (byProject) {
          this.dataSource.forEach((item) => {
            this._vendors.add(item.vendor);
          });
          this._selectedVendor = [...this._vendors];
        }

        this.dataSource.forEach((item) => {
          if (this._selectedVendor.includes(this.defaultOptionAll)) {
            this._partNo.add(item.partNo);
            this._osTypes.add(item.osType);
            this._firmwareVersions.add(item.firmwareVersion);
          } else if (this._selectedVendor.includes(item.vendor)) {
            this._partNo.add(item.partNo);
            this._osTypes.add(item.osType);
            this._firmwareVersions.add(item.firmwareVersion);
          }
        });
      } else {
        this._partNo = partNo;
        this._osTypes = osTypes;
        this._firmwareVersions = firmwareVersions;

        this._assets.forEach((item) => {
          if (item.vendor) {
            this._vendors.add(item.vendor);
          }
          if (item.project) {
            this._projects.add(item.project);
          }
          if (item.osType) {
            this._osTypes.add(item.osType);
          }
          if (item.partNo) {
            this._partNo.add(item.partNo);
          }
          if (item.firmwareVersion) {
            this._firmwareVersions.add(item.firmwareVersion);
          }
        });
      }

      // Sorting logic
      const alphanumericSort = (a: string, b: string) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

      this._projects = new Set([
        this.defaultOptionAll,
        ...[...this._projects].filter((p) => p !== this.defaultOptionAll).sort(alphanumericSort),
      ]);

      this._vendors = new Set([
        this.defaultOptionAll,
        ...[...this._vendors].filter((v) => v !== this.defaultOptionAll).sort(alphanumericSort),
      ]);

      this._partNo = new Set([
        this.defaultProductOptionAll,
        ...[...this._partNo].filter((p) => p !== this.defaultProductOptionAll).sort(alphanumericSort),
      ]);

      this._osTypes = new Set([
        this.defaultOptionAll,
        ...[...this._osTypes].filter((o) => o !== this.defaultOptionAll).sort(alphanumericSort),
      ]);

      this._firmwareVersions = new Set([
        this.defaultOptionAll,
        ...[...this._firmwareVersions].filter((f) => f !== this.defaultOptionAll).sort(alphanumericSort),
      ]);

      // Restore previously selected vendor if valid
      const validVendors = [...this._vendors];
      this._selectedVendor = previousSelectedVendor.filter(vendor => validVendors.includes(vendor));
      if (this._selectedVendor.length === 0) {
        this._selectedVendor = [];
      }

      this.paginate();
    } catch (error) {
      console.error('❌ Error inside prepareFilters:', error);
    }
  }


  handleProjectSelection(): void {
    if (this._selectedPoject.length > 0) {
      if (this._selectedPoject.includes(this.defaultOptionAll)) {
        // If "All" is selected in projects, show all options
        this.filteredVendor = [this.defaultOptionAll, ...Array.from(this._vendors).filter(v => v !== this.defaultOptionAll)];
        this.filteredPartNo = [this.defaultProductOptionAll, ...Array.from(this._partNo).filter(p => p !== this.defaultProductOptionAll)];
        this.filteredOsType = [this.defaultOptionAll, ...Array.from(this._osTypes).filter(o => o !== this.defaultOptionAll)];
        this.filteredFwVersion = [this.defaultOptionAll, ...Array.from(this._firmwareVersions).filter(f => f !== this.defaultOptionAll)];
      } else {
        // If individual projects are selected, show relevant options
        this.filteredVendor = Array.from(this._vendors);
        this.filteredPartNo = Array.from(this._partNo);
        this.filteredOsType = Array.from(this._osTypes);
        this.filteredFwVersion = Array.from(this._firmwareVersions);
      }
    } else {
      this.filteredVendor = [this.defaultOptionAll];
      this.filteredPartNo = [this.defaultProductOptionAll];
      this.filteredOsType = [this.defaultOptionAll];
      this.filteredFwVersion = [this.defaultOptionAll];
    }
  }



  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(EditAssetComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe(() => { });
  }
  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.dataSource?.length;

    this._selectedCount = numSelected;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this._selectedCount = 0;
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource);
      this._selectedCount = this.selection.selected.length;
    }
    this.cdr.markForCheck(); // Manually trigger change detection
  }
  onRowSelection(row: any) {
    this.selection.toggle(row);
    this._selectedCount = this.selection.selected.length;
    this.cdr.markForCheck(); // Ensure UI updates immediately
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }

  showConfirmation(confirmation: any, asset?: any): void {
    this._assetToDelete = asset;
    const dialogRef = this.dialog.open(confirmation, {});
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) { // Ensure delete is confirmed
        this.deleteAsset(Array.isArray(this._assetToDelete)); 
      }
    });
  }
  
  deleteAsset(multiple?: boolean) {
    let assetsList = multiple ? [...this.selection.selected] : [this._assetToDelete];
  
    this.vulnerabilitiesService.deleteAsset(assetsList).subscribe({
      next: () => {
        this.toastr.success('Assets deleted successfully');
        this.loadAssets(); // Only call after delete API success
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.toastr.error('Failed to delete assets');
      }
    });
  }
  

  // _onPageChange(page: PageEvent): void {
  //   this.currentPageIndex = page.pageIndex;
  //   this.pageSize = page.pageSize;
  //   this.paginate();
  // }
  _onPageChange(page: PageEvent): void {
    this.currentPageIndex = page.pageIndex;
    this.pageSize = page.pageSize;

    // **Save state in localStorage**
    localStorage.setItem('currentPageIndex', this.currentPageIndex.toString());
    localStorage.setItem('pageSize', this.pageSize.toString());

    this.paginate();
  }



  private paginate(): void {
    if (!this.dataSource || this.dataSource.length === 0) {
      this.currentPageItems = [];
      this.totalItemCount = 0;
      this.currentPageIndex = 0;
      this.disablePaginator = true;

      localStorage.removeItem('currentPageIndex');
      localStorage.removeItem('pageSize');

      this.cdr.detectChanges();
      return;
    }
    const sortedDataSource = [...this.dataSource].reverse();
    this.totalItemCount = sortedDataSource.length;

    if (this.totalItemCount > this.pageSize) {
      // **Retrieve stored pagination state**
      const savedPageIndex = localStorage.getItem('currentPageIndex');
      const savedPageSize = localStorage.getItem('pageSize');

      this.pageSize = savedPageSize ? parseInt(savedPageSize) : this.pageSize;
      this.currentPageIndex = savedPageIndex ? parseInt(savedPageIndex) : 0;

      // **Calculate start & end indices**
      this.start = this.currentPageIndex * this.pageSize;
      this.end = Math.min(this.start + this.pageSize, this.totalItemCount);
      this.currentPageItems = sortedDataSource.slice(this.start, this.end);

      this.disablePaginator = false;
      this.cdr.detectChanges();
      // **Ensure state is saved every time paginate() is called**
      localStorage.setItem('currentPageIndex', this.currentPageIndex.toString());
      localStorage.setItem('pageSize', this.pageSize.toString());
    } else {
      this.disablePaginator = true;
      this.currentPageItems = sortedDataSource;
    }
  }




  _vendorChange(): void {
    const allSelected = this._selectedVendor.includes(this.defaultOptionAll);
    if (!allSelected && this.isVendorAllPrevSelected) {
      this._selectedVendor = [];
    }
    // this.vulnerabilitiesService.setSelectedVendor(this._selectedVendor);
  }
  vendorChange(): void {
    this.vulnerabilitiesService.setSelectedAssetVendor(this._selectedVendor)
    sessionStorage.setItem('selectedVendor', JSON.stringify(this._selectedVendor));
    const allSelected = this._selectedVendor.includes(this.defaultOptionAll);
    if (!allSelected && this.isVendorAllPrevSelected) {
      this._selectedVendor = [];
    }
    if (this._selectedVendor.length > 0) {
      const allSelected = this._selectedVendor.includes(this.defaultOptionAll);
      if (allSelected && this._selectedVendor.length > 0) {
        if (
          this._selectedVendor.length === 1 ||
          !this.isVendorAllPrevSelected
        ) {
          if (
            this._selectedPoject.length === 0 ||
            (this._selectedPoject.length > 0 &&
              this._selectedPoject.includes(this.defaultOptionAll))
          ) {
            this.dataSource = this._assets;
          } else {
            if (
              this._selectedPoject.length === 0 ||
              this._selectedPoject.includes(this.defaultOptionAll)
            ) {
              this.dataSource = this._assets;
            } else {
              this.dataSource = this._assets.filter((item) =>
                this._selectedPoject.includes(item.project)
              );
            }
          }
        } else {
          if (
            this._selectedPoject.length === 0 ||
            this._selectedPoject.includes(this.defaultOptionAll)
          ) {
            this.dataSource = this._assets.filter((item) =>
              this._selectedVendor.includes(item.vendor)
            );
          } else {
            this.dataSource = this._assets.filter(
              (item) =>
                this._selectedVendor.includes(item.vendor) &&
                this._selectedPoject.includes(item.project)
            );
          }
        }
      } else {
        this.dataSource = this._assets.filter((item) =>
          this._selectedPoject.includes(this.defaultOptionAll)
            ? true
            : this._selectedPoject.includes(item.project)
        );
      }
      if (allSelected) {
        if (
          this._selectedVendor.length < this._vendors.size &&
          this._selectedVendor.length !== 1 &&
          this.isVendorAllPrevSelected
        ) {
          this._selectedVendor = this._selectedVendor.filter(
            (item) => item !== this.defaultOptionAll
          );
        } else {
          this._selectedVendor = [...this._vendors];
        }
      } else if (this._selectedVendor.length === this._vendors.size - 1) {
        if (this.isVendorAllPrevSelected) {
          this._selectedVendor = [];
          this.dataSource = this._assets.filter((item) =>
            this._selectedPoject.includes(item.project)
          );
        } else {
          this._selectedVendor = this._selectedVendor.filter(
            (item) => item !== this.defaultOptionAll
          );
          if (
            this._selectedPoject.length === 0 ||
            this._selectedPoject.includes(this.defaultOptionAll)
          ) {
            this.dataSource = this._assets.filter((item) =>
              this._selectedVendor.includes(item.vendor)
            );
          } else {
            this.dataSource = this._assets.filter(
              (item) =>
                this._selectedVendor.includes(item.vendor) &&
                this._selectedPoject.includes(item.project)
            );
          }
        }
      } else {
        this._selectedVendor = this._selectedVendor.filter(
          (item) => item !== this.defaultOptionAll
        );
        if (
          this._selectedPoject.length === 0 ||
          this._selectedPoject.includes(this.defaultOptionAll)
        ) {
          this.dataSource = this._assets.filter((item) =>
            this._selectedVendor.includes(item.vendor)
          );
          this.dataSource.sort((a, b) =>
            a.partNo > b.partNo ? 1 : b.partNo > a.partNo ? -1 : 0
          );
        } else {
          this.dataSource = this._assets.filter(
            (item) =>
              this._selectedVendor.includes(item.vendor) &&
              this._selectedPoject.includes(item.project)
          );
        }
      }
    } else {
      if (
        this._selectedPoject.length === 0 ||
        this._selectedPoject.includes(this.defaultOptionAll)
      ) {
        this.dataSource = this._assets;
      } else {
        this.dataSource = this._assets.filter((item) =>
          this._selectedPoject.includes(item.project)
        );
      }
    }

    this.prepareFilters(true);
    this.isVendorAllPrevSelected = this._selectedVendor.includes(
      this.defaultOptionAll
    );
    this.updateFilteredPartNo();
    this.updateFilteredFirmwareVersions();
    this.updateFilteredOsTypes();
    this.filterVendor();
  }
  private updateFilteredPartNo(): void {
    const filteredAssets = this._assets.filter(
      (item) =>
        (!this._selectedPoject.length || this._selectedPoject.includes(item.project)) &&
        (!this._selectedVendor.length || this._selectedVendor.includes(item.vendor)) &&
        (!this._selectedOsType.length || this._selectedOsType.includes(item.osType))
    );

    this.filteredPartNo = [...new Set(filteredAssets.map((item) => item.partNo))].sort();

    if (!this.filteredPartNo.includes(this.defaultProductOptionAll)) {
      this.filteredPartNo.unshift(this.defaultProductOptionAll);
    }
  }
  // _productChange(): void {
  //   const allSelected = this._selectedProduct.includes(
  //     this.defaultProductOptionAll
  //   );
  //   if (!allSelected && this.isProductAllPrevSelected) {
  //     this._selectedProduct = [];
  //   }
  //   this.vulnerabilitiesService.setSelectedAssetPartNo(this._selectedProduct);
  // }
  _productChange(): void {
    const allSelected = this._selectedProduct.includes(
      this.defaultProductOptionAll
    );
    if (!allSelected && this.isProductAllPrevSelected) {
      this._selectedProduct = [];
    }
    this.vulnerabilitiesService.setSelectedAssetPartNo(this._selectedProduct);
  }
  productChange(): void {
    let byProduct = false;
    this.vulnerabilitiesService.setSelectedAssetPartNo(this._selectedProduct);

    const allSelected = this._selectedProduct.includes(this.defaultProductOptionAll);

    if (allSelected) {
      // If "All" is selected, select all part numbers
      if (this._selectedProduct.length === 1 || !this.isProductAllPrevSelected) {
        this._selectedProduct = [...this._partNo]; // Select all
        this.dataSource = this.filterDataSource();
        byProduct = false;
      } else {
        this.dataSource = this._assets.filter((item) =>
          this._selectedProduct.includes(item.partNo)
        );
      }
    } else {
      // If "All" is deselected, clear all selections
      if (this.isProductAllPrevSelected) {
        this._selectedProduct = []; // Clear selection
      } else {
        this._selectedProduct = this._selectedProduct.filter(
          (item) => item !== this.defaultProductOptionAll
        );
      }
      byProduct = true;
      this.dataSource = this.filterDataSource();
    }

    this.prepareFilters();

    this.isProductAllPrevSelected = this._selectedProduct.includes(this.defaultProductOptionAll);

    this.filteredPartNo = byProduct ? [...new Set([...this.filteredPartNo, ...this._selectedProduct])] : [...this._partNo];

    this.updateFilteredOsTypes();
    this.updateFilteredFirmwareVersions();
    this.updateFilteredPartNo(); // Ensure dropdown options are refreshed
  }



  private updateFilteredOsTypes(): void {
    const filteredAssets = this._assets.filter(
      (item) =>
        (!this._selectedPoject.length ||
          this._selectedPoject.includes(item.project)) &&
        (!this._selectedVendor.length ||
          this._selectedVendor.includes(item.vendor)) &&
        (!this._selectedProduct.length ||
          this._selectedProduct.includes(item.partNo))
    );

    this.filteredOsType = [
      ...new Set(filteredAssets.map((item) => item.osType)),
    ].sort();

    if (!this.filteredOsType.includes(this.defaultOsTypeOptionAll)) {
      this.filteredOsType.unshift(this.defaultOsTypeOptionAll);
    }
  }

  // _osTypeChange(): void {
  //   let byOsType = false;
  //   this.vulnerabilitiesService.setSelectedAssetOsType(this._selectedOsType);
  //   const allSelected = this._selectedOsType.includes(
  //     this.defaultOsTypeOptionAll
  //   );

  //   if (
  //     allSelected &&
  //     (this._selectedOsType.length > 0 || !this.isOsTypeAllPrevSelected)
  //   ) {
  //     this._selectedOsType = [...this._osTypes];
  //     this.dataSource = this.filterDataSource();
  //     byOsType = false;
  //   } else if (!allSelected && this.isOsTypeAllPrevSelected) {
  //     this._selectedOsType = [];
  //     this.dataSource = this.filterDataSource();
  //   } else {
  //     this._selectedOsType = this._selectedOsType.filter(
  //       (item) => item !== this.defaultOsTypeOptionAll
  //     );

  //     if (this._selectedOsType.length === 0) {
  //       this.dataSource = this.filterDataSource();
  //     } else {
  //       byOsType = true;
  //       this.dataSource = this.filterDataSource();
  //     }
  //   }
  //   if (this._selectedOsType.length > 0) {
  //     if (allSelected) {
  //       this._selectedOsType = [...this._osTypes];
  //       this.dataSource = this.filterDataSource();;
  //     } else {
  //       this.dataSource = this._assets.filter(item =>
  //         this._selectedOsType.includes(item.osType)
  //       );
  //     }
  //   } else {
  //     this.dataSource = this._assets;
  //   }

  //   this.prepareFilters();
  //   this.updateFilteredOsTypes();

  //   this.isOsTypeAllPrevSelected = this._selectedOsType.includes(
  //     this.defaultOsTypeOptionAll
  //   );
  //   this.updateFilteredFirmwareVersions();
  // }


  _osTypeChange(): void {
    let byOsType = false;
    this.vulnerabilitiesService.setSelectedAssetOsType(this._selectedOsType);
    const allSelected = this._selectedOsType.includes(
      this.defaultOsTypeOptionAll
    );

    if (
      allSelected &&
      (this._selectedOsType.length === 1 ||
        !this.isOsTypeAllPrevSelected)
    ) {
      this._selectedOsType = [...this._osTypes];
      this.dataSource = this.filterDataSource();
      byOsType = false;
    } else if (!allSelected && this.isOsTypeAllPrevSelected) {
      this._selectedOsType = [];
      this.dataSource = this.filterDataSource();
    } else {
      this._selectedOsType = this._selectedOsType.filter(
        (item) => item !== this.defaultOsTypeOptionAll
      );

      if (this._selectedOsType.length === 0) {
        this.dataSource = this.filterDataSource();
      } else {
        byOsType = true;
        this.dataSource = this.filterDataSource();
      }
    }

    this.prepareFilters();
    this.updateFilteredOsTypes();

    this.isOsTypeAllPrevSelected = this._selectedOsType.includes(
      this.defaultOsTypeOptionAll
    );
    this.updateFilteredFirmwareVersions();
  }

  _firmwareVersionChange(): void {
    let byFirmwareVersion = false;
    this.vulnerabilitiesService.setSelectedAssetFwVersion(this._selectedFirmwareVersion);
    const allSelected = this._selectedFirmwareVersion.includes(
      this.defaultOsTypeOptionAll
    );

    if (
      allSelected &&
      (this._selectedFirmwareVersion.length === 1 ||
        !this.isFirmwareAllPrevSelected)
    ) {
      this._selectedFirmwareVersion = [...this._firmwareVersions];
      this.dataSource = this.filterDataSource();
      byFirmwareVersion = false;
    } else if (!allSelected && this.isFirmwareAllPrevSelected) {
      this._selectedFirmwareVersion = [];
      this.dataSource = this.filterDataSource();
    } else {
      this._selectedFirmwareVersion = this._selectedFirmwareVersion.filter(
        (item) => item !== this.defaultOsTypeOptionAll
      );

      if (this._selectedFirmwareVersion.length === 0) {
        this.dataSource = this.filterDataSource();
      } else {
        byFirmwareVersion = true;
        this.dataSource = this.filterDataSource();
      }
    }

    this.prepareFilters();
    this.updateFilteredFirmwareVersions();

    this.isFirmwareAllPrevSelected = this._selectedFirmwareVersion.includes(
      this.defaultOsTypeOptionAll
    );
  }

  private filterDataSource() {
    return this._assets.filter(
      (item) =>
        (!this._selectedPoject.length ||
          this._selectedPoject.includes(item.project)) &&
        (!this._selectedVendor.length ||
          this._selectedVendor.includes(item.vendor)) &&
        (!this._selectedProduct.length ||
          this._selectedProduct.includes(item.partNo)) &&
        (!this._selectedOsType.length ||
          this._selectedOsType.includes(item.osType)) &&
        (!this._selectedFirmwareVersion.length ||
          this._selectedFirmwareVersion.includes(item.firmwareVersion))
    );
  }
  private updateFilteredFirmwareVersions(): void {
    const filteredAssets = this._assets.filter(
      (item) =>
        (!this._selectedPoject.length ||
          this._selectedPoject.includes(item.project)) &&
        (!this._selectedVendor.length ||
          this._selectedVendor.includes(item.vendor)) &&
        (!this._selectedProduct.length ||
          this._selectedProduct.includes(item.partNo)) &&
        (!this._selectedOsType.length ||
          this._selectedOsType.includes(item.osType))
    );
    this.filteredFwVersion = [
      ...new Set(filteredAssets.map((item) => item.firmwareVersion)),
    ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (!this.filteredFwVersion.includes(this.defaultFwOptionAll)) {
      this.filteredFwVersion.unshift(this.defaultFwOptionAll);
    }
  }



  _showVulnerabilities(asset: any): void {
    // console.log("asset",asset)
    const currentStartDate = localStorage.getItem('startDate') || '';
    const currentEndDate = localStorage.getItem('endDate') || '';
    const fromDate = currentStartDate ? moment(currentStartDate).format('YYYY-MM-DD') : '';
    const toDate = currentEndDate ? moment(currentEndDate).format('YYYY-MM-DD') : '';
    let payload = {
      partNo: asset.partNo,
      brand: asset.vendor,
      firmwareVersion: asset.firmwareVersion,
      osType: asset.osType,
      serialNo: asset.serialNo,
      fromDate: fromDate,
      toDate: toDate,
    };
    this.router.navigate(['cve/vulnerabilties'], {
      queryParams: payload,
    });
  }
  filterProjects(): void {
    const filterValue = this.projectFilter?.toLowerCase() || '';
    if (filterValue) {
      this.filteredProjects = [...this._projects].filter(
        (project) =>
          project.toLowerCase().includes(filterValue) ||
          this._selectedPoject.includes(project)
      );
    } else {
      this.filteredProjects = [...this._projects];
    }
  }
  _projectChange(): void {
    let byProject = false;
    this.vulnerabilitiesService.setSelectedAssetProject(this._selectedPoject);
    const allSelected = this._selectedPoject.includes(this.defaultOptionAll);

    if (!allSelected && this.isPojectAllPrevSelected) {
      this._selectedPoject = [];
    }

    if (this._selectedPoject.length > 0) {
      if (allSelected) {
        this._selectedPoject = [...this._projects];
        this.dataSource = this._assets;
      } else {
        this.dataSource = this._assets.filter(item =>
          this._selectedPoject.includes(item.project)
        );
      }
    } else {
      this.dataSource = this._assets;
    }

    // ✅ Auto-select Vendors based on selected Projects
    this._selectedVendor = [];
    // this.dataSource.forEach(item => {
    //     if (this._selectedPoject.includes(item.project)) {
    //         this._selectedVendor.push(item.vendor);
    //     }
    // });
    // Ensure vendors are unique and include 'All' if necessary
    this._selectedVendor = Array.from(new Set(this._selectedVendor));
    if (this._selectedVendor.length > 0) {
      this._selectedVendor.unshift(this.defaultOptionAll);
    }

    // ✅ Automatically set the selected vendors

    // this.vulnerabilitiesService.setSelectedVendor(this._selectedVendor);


    this.prepareFilters(false, true);
    this.isPojectAllPrevSelected = this._selectedPoject.includes(this.defaultOptionAll);

    this.filterProjects();
    this.handleProjectSelection();
  }



  filterVendor(): void {
    const filterValue = this.vendorFilter.toLowerCase();
    if (filterValue) {
      this.filteredVendor = [...this._vendors].filter(
        (vendor) =>
          vendor.toLowerCase().includes(filterValue) ||
          this._selectedVendor.includes(vendor)
      );
    } else {
      this.filteredVendor = [...this._vendors];
    }
  }

  filterPartNo(): void {
    const filterValue = this.partNoFilter.toLowerCase() || '';

    if (filterValue) {
      this.filteredPartNo = [...this._partNo].filter(
        (project) =>
          project.toLowerCase().includes(filterValue) ||
          this._selectedProduct.includes(project)
      );
    } else {
      this.updateFilteredPartNo();
    }
  }

  // filterOsType(): void {
  //   const filterValue = this.osTypeFilter.toLowerCase() || '';

  //   if (filterValue) {
  //     this.filteredOsType = this.filteredOsType.filter(
  //       (project) =>
  //         project.toLowerCase().includes(filterValue) ||
  //         this._selectedOsType.includes(project)
  //     );
  //   } else if (!filterValue) {
  //     this.updateFilteredOsTypes();
  //   } else {
  //   }
  // }
  filterOsType(): void {
    const filterValue = this.osTypeFilter.toLowerCase() || '';

    if (filterValue) {
      this.filteredOsType = this.filteredOsType
        .filter(
          (project) =>
            project.toLowerCase().includes(filterValue) ||
            this._selectedOsType.includes(project)
        )
        .sort();
    } else {
      this.updateFilteredOsTypes();
    }
  }
  // filterFwVersion(): void {
  //   const filterValue = this.fwVersionFilter.toLowerCase() || '';

  //   if (filterValue) {
  //     this.filteredFwVersion = this.filteredFwVersion.filter(
  //       (fw) =>
  //         fw.toLowerCase().includes(filterValue) ||
  //         this._selectedFirmwareVersion.includes(fw)
  //     ).sort();
  //   } else if (!filterValue) {
  //     this.updateFilteredFirmwareVersions();
  //   }
  // }
  filterFwVersion(): void {
    const filterValue = this.fwVersionFilter.toLowerCase() || '';

    if (filterValue) {
      this.filteredFwVersion = this.filteredFwVersion
        .filter(
          (fw) =>
            fw.toLowerCase().includes(filterValue) ||
            this._selectedFirmwareVersion.includes(fw)
        )
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    } else {
      this.updateFilteredFirmwareVersions();
    }
  }
  resetPagination(): void {
    this.currentPageIndex = 0;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
  }
}
