import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,TemplateRef,ViewChild,viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  formattedStartDate: string;
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
  @ViewChild('deleteMultipleConfirm')deleteMultipleConfirm: TemplateRef<HTMLElement>;
  public selection = new SelectionModel<any>(true, []);
  public _selectedCount = 0;
  constructor(
    public dialog: MatDialog,
    private logCveService: LogCveService,
    private vulnerabilitiesService: VulnerabilitiesService,
    private cdr: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
  ) {
    
  }

  // ngOnInit() {
  //   const startDate = localStorage.getItem('startDate') || '';
  //   const endDate = localStorage.getItem('endDate') || '';

  //   this.formattedStartDate = startDate.toString();
  //   this.formattedEndDate = endDate.toString();
  //   this.loadAssets();
    
  // }
  ngOnInit(): void {
   
    const startDate = localStorage.getItem('startDate') || '';
    const endDate = localStorage.getItem('endDate') || '';
      
    this.formattedStartDate = startDate.toString();
    this.formattedEndDate = endDate.toString();
    console.log(`Start Date: ${startDate} - ${this.formattedEndDate}`);
    this.vulnerabilitiesService.setDataLoading(true);

    this.logCveService
      .loadAllAssets(this.formattedStartDate, this.formattedEndDate)
      .subscribe((data: any[]) => {
        this._assets = data;
        this.dataSource = data;
        console.log(this.dataSource);
        if (data.length == 0) {
          this.vulnerabilitiesService.loadAllAssets();
          this.cdr.detectChanges();
        } else {
          this.vulnerabilitiesService.setDataLoading(false);
        }
        this._assets?.length > 0 &&
          this.vulnerabilitiesService.setSelectedAssetId(this._assets[0]._id);
     
        this.prepareFilters();
        this.filteredProjects = [...this._projects];
        this.filteredFwVersion = [...this._firmwareVersions];
       

        this.vulnerabilitiesService
          .getAssetUploadMessage()
          .pipe()
          .subscribe((message) => {
            // this.asertMessage = message;
          });
        this.cdr.detectChanges();
      });
    if (this._selectedVendor.length === 0) {
      this.vulnerabilitiesService
        .getSelectedVendor()
        .subscribe((selectedVendor: string[]) => {
          this._selectedVendor = selectedVendor;
          this.vendorChange();
        });
    }
    if (this._selectedProduct.length === 0) {
      this.vulnerabilitiesService
        .getSelectedPartNo()
        .subscribe((selectedPartNo: string[]) => {
          this._selectedProduct = selectedPartNo;
          this.productChange();
        });
    }

    this.vulnerabilitiesService
      .getSelectedProject()
      .subscribe((selectedProject: string[]) => {
        // this._selectedProduct = selectedPartNo;
        this._selectedPoject = selectedProject;
      });
    // this.isAssetsRoute = this.router.url.includes('/assets');
    if (
      this._selectedVendor.length === 0 &&
      this._selectedProduct.length === 0 &&
      this._selectedPoject.length === 0
    ) {
      // this.resetFilters();
    }
    this.resetPagination();
    this.paginate();
  }

  public loadAssets() {
    this.logCveService
      .loadAllAssets(this.formattedStartDate, this.formattedEndDate)
      .subscribe((data: any[]) => {
        this._assets = data;
        this.dataSource = data;
        if(this._assets){
          this.prepareFilters();
        }
        this.resetPagination();
    this.paginate();
       
        this.cdr.detectChanges();
      });
  }
  resetFilters(): void {
    this.dataSource = this._assets;
    this._selectedPoject = [];
    this._selectedProduct = [];
    this._selectedVendor = [];
    this._selectedOsType = [];
    this._selectedFirmwareVersion = [];
    this.resetPagination();
    this.prepareFilters();
    this.paginate();
    this.loadAssets();
  }
 
  uploadFile($event: any): void {
    this.vulnerabilitiesService.setDataLoading(true);
    const selectedFile: File = $event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('xlsx', selectedFile);
      this.vulnerabilitiesService.uploadAssets(formData);
      $event.target.value = null;
      //this.asertMessage = "Assets Uploaded Successfully."
      this.showAlert = true;
    }
  }
  private prepareFilters(
    byProduct: boolean = false,
    byProject: boolean = false,
    edit: boolean = false
  ): void {

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

    // Initialize OS Type and Firmware Version sets
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
      console.log(this._assets);
      this._assets.forEach((item) => {
        if (item.vendor) {
          this._vendors.add(item.vendor);
        }
        if (item.project) {
          this._projects.add(item.project);
        }
        if (item.osType) {
          this._osTypes.add(item.vendor);
        }
        if (item.firmwareVersion) {
          this._firmwareVersions.add(item.firmwareVersion);
        }
      });
    }

    const alphanumericSort = (a: string, b: string) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

    const projectsArray = [...this._projects]
      .filter((project) => project !== this.defaultOptionAll)
      .sort(alphanumericSort);
    this._projects = new Set([this.defaultOptionAll, ...projectsArray]);

    const vendorsArray = [...this._vendors]
      .filter((vendor) => vendor !== this.defaultOptionAll)
      .sort(alphanumericSort);
    this._vendors = new Set([this.defaultOptionAll, ...vendorsArray]);

    const partNoArray = [...this._partNo]
      ?.filter((part) => part !== this.defaultProductOptionAll)
      .sort(alphanumericSort);
    this._partNo = new Set([this.defaultProductOptionAll, ...partNoArray]);

    const osTypesArray = [...this._osTypes]
      .filter((os) => os !== this.defaultOptionAll)
      .sort(alphanumericSort);
    this._osTypes = new Set([this.defaultOptionAll, ...osTypesArray]);

    const firmwareVersionsArray = [...this._firmwareVersions]
      .filter((fw) => fw !== this.defaultOptionAll)
      .sort(alphanumericSort);
    this._firmwareVersions = new Set([
      this.defaultOptionAll,
      ...firmwareVersionsArray,
    ]);
    this.initializeFilters();
    this.paginate();
  }
  private initializeFilters() {
    this.filteredProjects = Array.from(this._projects);
    this.filteredVendor = Array.from(this._vendors);
    this.filteredPartNo = Array.from(this._partNo);
    this.filteredOsType = Array.from(this._osTypes);
    this.filteredFwVersion = Array.from(this._firmwareVersions);
  }

 create(){
  this.router.navigate(['/cve/create-asset']);
  this.cdr.detectChanges();
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
    _vendorChange(): void {
      const allSelected = this._selectedVendor.includes(this.defaultOptionAll);
      if (!allSelected && this.isVendorAllPrevSelected) {
        this._selectedVendor = [];
      }
      this.vulnerabilitiesService.setSelectedVendor(this._selectedVendor);
    }
    vendorChange(): void {
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
      // this.updateFilteredPartNo();
      this.updateFilteredFirmwareVersions();
      this.updateFilteredOsTypes();
      this.filterVendor();
    }
  
    _productChange(): void {
      const allSelected = this._selectedProduct.includes(
        this.defaultProductOptionAll
      );
      if (!allSelected && this.isProductAllPrevSelected) {
        this._selectedProduct = [];
      }
      this.vulnerabilitiesService.setSelectedPartNo(this._selectedProduct);
    }
    productChange(): void {
      let byProduct = false;
      const allSelected = this._selectedProduct.includes(
        this.defaultProductOptionAll
      );
  
      if (allSelected) {
        if (
          this._selectedProduct.length === 1 ||
          !this.isProductAllPrevSelected
        ) {
          this._selectedProduct = [...this._partNo];
          this.dataSource = this._assets;
          byProduct = false;
        } else {
          this.dataSource = this._assets.filter((item) =>
            this._selectedProduct.includes(item.partNo)
          );
        }
      } else {
        this._selectedProduct = this._selectedProduct.filter(
          (item) => item !== this.defaultProductOptionAll
        );
        byProduct = true;
        this.dataSource = this.filterDataSource();
      }
  
      this.prepareFilters();
  
      this.isProductAllPrevSelected = this._selectedProduct.includes(
        this.defaultProductOptionAll
      );
  
      this.filteredPartNo = byProduct ? this._selectedProduct : [...this._partNo];
  
      if (this.filteredPartNo.length) {
        this._selectedProduct = [...this.filteredPartNo];
      }
      this.updateFilteredOsTypes();
      this.updateFilteredFirmwareVersions();
      this.filterPartNo();
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
      ];
      if (!this.filteredOsType.includes(this.defaultOsTypeOptionAll)) {
        this.filteredOsType.unshift(this.defaultOsTypeOptionAll);
      }
    }
  
    _osTypeChange(): void {
      let byOsType = false;
      const allSelected = this._selectedOsType.includes(
        this.defaultOsTypeOptionAll
      );
      if (
        allSelected &&
        (this._selectedOsType.length === 1 || !this.isOsTypeAllPrevSelected)
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
      ];
  
      if (!this.filteredFwVersion.includes(this.defaultFwOptionAll)) {
        this.filteredFwVersion.unshift(this.defaultFwOptionAll);
      }
    }
  
    _firmwareVersionChange(): void {
      let byFirmwareVersion = false;
      const allSelected = this._selectedFirmwareVersion.includes(
        this.defaultFwOptionAll
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
          (item) => item !== this.defaultFwOptionAll
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
        this.defaultFwOptionAll
      );
    }
  
    _showVulnerabilities(asset: any): void {
      let payload = {
        partNo: asset.partNo,
        brand: asset.vendor,
        firmwareVersion: asset.firmwareVersion,
        osType: asset.osType,
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
      const allSelected = this._selectedPoject.includes(this.defaultOptionAll);
  
      if (!allSelected && this.isPojectAllPrevSelected) {
        this._selectedPoject = [];
      }
  
      if (this._selectedPoject.length > 0) {
        if (allSelected && this._selectedPoject.length > 0) {
          if (
            this._selectedPoject.length === 1 ||
            !this.isPojectAllPrevSelected
          ) {
            this.dataSource = this._assets;
          } else {
            this.dataSource = this._assets.filter((item) =>
              this._selectedPoject.includes(item.project)
            );
          }
          byProject = false;
        } else {
          this.dataSource = this._assets;
        }
  
        if (allSelected) {
          if (
            this._selectedPoject.length < this._projects.size &&
            this._selectedPoject.length !== 1 &&
            this.isPojectAllPrevSelected
          ) {
            this._selectedPoject = this._selectedPoject.filter(
              (item) => item !== this.defaultOptionAll
            );
          } else {
            this._selectedPoject = [...this._projects];
          }
        } else if (this._selectedPoject.length === this._projects.size - 1) {
          if (this.isPojectAllPrevSelected) {
            this._selectedPoject = [];
          } else {
            this._selectedPoject = this._selectedPoject.filter(
              (item) => item !== this.defaultOptionAll
            );
          }
          this.dataSource = this._assets.filter((item) =>
            this._selectedPoject.includes(item.project)
          );
        } else {
          this._selectedPoject = this._selectedPoject.filter(
            (item) => item !== this.defaultOptionAll
          );
          this.dataSource = this._assets.filter((item) =>
            this._selectedPoject.includes(item.project)
          );
        }
      } else {
        this.dataSource = this._assets;
      }
  
      this.prepareFilters(false, true);
      this.isPojectAllPrevSelected = this._selectedPoject.includes(
        this.defaultOptionAll
      );
      this.filterProjects();
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
        this.filteredPartNo = [...this._partNo];
      }
    }
  
    filterOsType(): void {
      const filterValue = this.osTypeFilter.toLowerCase() || '';
  
      if (filterValue) {
        this.filteredOsType = this.filteredOsType.filter(
          (project) =>
            project.toLowerCase().includes(filterValue) ||
            this._selectedOsType.includes(project)
        );
      } else if (!filterValue) {
        this.updateFilteredOsTypes();
      } else {
      }
    }
    filterFwVersion(): void {
      const filterValue = this.fwVersionFilter.toLowerCase() || '';
  
      if (filterValue) {
        this.filteredFwVersion = this.filteredFwVersion.filter(
          (fw) =>
            fw.toLowerCase().includes(filterValue) ||
            this._selectedFirmwareVersion.includes(fw)
        );
      } else if (!filterValue) {
        this.updateFilteredFirmwareVersions();
      }
    }
  
    resetPagination(): void {
      this.currentPageIndex = 0;
      this.pageSize = this.DEFAULT_PAGE_SIZE;
    }

}
