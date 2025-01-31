import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable, finalize, of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { SearchService } from 'src/app/services/api/search.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { LogCveService } from 'src/app/services/api/log-cve.service';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { Subscription } from 'rxjs';
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
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('vendorSelect') vendorSelect: MatSelect;
  @ViewChild('filter') filter: MatSelect;
  public pageSizeOptions: number[] = [10, 25, 50, 100];
  public _selectedVendor: string[] = [];
  public _selectedPartNo: string[] = [];
  public _selectedOsType: string[] = [];
  public _selectedVersion: string[] = [];
  public _selectedProject: string[] = [];
  start: number;
  end: number;
  public product: any[];
  public _isDataLoading$: Observable<boolean>;
  public dropdownData: any[] = [];
  public productDropdownData: any[] = [];
  public dataSource: any[] = [];
  public currentPageItems: any[] = [];
  public pageSize = 10;
  public currentPageIndex = 0;
  public disablePaginator = false;
  public totalItemCount = 0;
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
  public cvePartFirmware: string = '';
  defaultPageIndex: number;
  isDarkMode: boolean;

  public _selectedProduct: any;
  public _selectedPoject: string[] = [];
  public _selectedCount = 0;

  public _vendors: Set<string> = new Set();
  public _partNo: Set<string> = new Set();
  public _osType: Set<string> = new Set();
  public _firmwareVersion: Set<string> = new Set();
  // public _project: Set<string> = new Set();

  public _projects: Set<string> = new Set();
  public _filteredAssets: any[] = [];
  public _assetToDelete: any;

  private defaultOptionAll = 'All';
  private defaultOptionProjectAll = 'All';
  private defaultOptionOstypeAll = 'All';
  private defaultOptionPortNoAll = 'All';
  private defaultOptionFwAll = 'All';

  public _assets: any[] = [];
  private loadedAssets$: Observable<any[]>;
  private showAlert = false;

  _showToaster = false;

  public isAssetsRoute: boolean = false;
  public selection = new SelectionModel<any>(true, []);
  asertMessage = '';
  vendorFilter: string = '';
  projectFilter: string = '';
  osTypeFilter: string = '';
  partnoFilter: string = '';
  fwVersionFilter: string = '';

  filteredVendors: string[] = [];
  filteredProjects: string[] = [];
  filteredOsType: string[] = [];
  filteredPartNo: string[] = [];
  filteredfwVersion: string[] = [];
  selectedDate: any = new Date();
  selectedEnd: string;
  formattedStartDate: string;
  formattedEndDate: string;
  private storageInterval: any;
  previousStartDate: string | null;
  previousEndDate: string | null;

  private subscriptions: Subscription = new Subscription();
  constructor(
    private cdr: ChangeDetectorRef,
    public searchService: SearchService,
    private toastr: ToastrService,
    private vulnerabilitiesService: VulnerabilitiesService,
    private router: Router,
    private logCveService: LogCveService,
    private localStorageService: VulnerabilityDataService
  ) {}

  ngOnInit() {
    this._isDataLoading$ = this.searchService.getDataLoadingStatus();
    const startDate = localStorage.getItem('startDate') || '';
    const endDate = localStorage.getItem('endDate') || '';

    this.formattedStartDate = startDate.toString();
    this.formattedEndDate = endDate.toString();

    this.searchService.getDropdownData().subscribe((data) => {
      this.dropdownData = data;
    });

    this.subscriptions.add(
      this.localStorageService.startDate$.subscribe(() => {
        const startDate = localStorage.getItem('startDate') || '';
    const endDate = localStorage.getItem('endDate') || '';

       this.formattedStartDate = startDate.toString();
       this.formattedEndDate = endDate.toString();

      })
    );

    this.vulnerabilitiesService.setDataLoading(true);
    // this.loadedAssets$ = this.vulnerabilitiesService.getAllAssets();
    this._isDataLoading$ = this.vulnerabilitiesService.isDataLoading();
    this.loadAssets();
    // this.loadedAssets$.pipe().subscribe((data: any[]) => {
    this.selection.clear();

    if (this.showAlert) {
      this._showToaster = true;
      setTimeout(() => {
        this._showToaster = false;
        this.showAlert = false;
      }, 20000);
    }

    this.vulnerabilitiesService.getAssetUploadMessage().subscribe((message) => {
      this.asertMessage = message;
    });
    this.prepareFilters();
    this.filteredVendors = Array.from(this._vendors);
    this.filteredProjects = Array.from(this._projects);
    this.filteredOsType = Array.from(this._osType);
    this.filteredPartNo = Array.from(this._partNo);
    this.filteredfwVersion = Array.from(this._firmwareVersion);

    this.vulnerabilitiesService
      .getSelectedVendor()
      .subscribe((selectedVendor: string[]) => {
        this._selectedVendor = selectedVendor;
      });

    this.vulnerabilitiesService
      .getSelectedPartNo()
      .subscribe((selectedPartNo: string[]) => {
        this._selectedProduct = selectedPartNo;
      });

    this.vulnerabilitiesService
      .getSelectedProject()
      .subscribe((selectedProject: string[]) => {
        this._selectedProject = selectedProject;
      });

    this.vulnerabilitiesService
      .getSelectedOsType()
      .subscribe((SelectedOs: string[]) => {
        this._selectedOsType = SelectedOs;
      });

    this.vulnerabilitiesService
      .getSelectedVersion()
      .subscribe((SelectedVersion: string[]) => {
        this._selectedVersion = SelectedVersion;
      });

    if (
      this._selectedVendor.length === 0 &&
      this._selectedProduct.length === 0 &&
      this._selectedOsType.length === 0 &&
      this._selectedVersion.length === 0 &&
      this._selectedProject.length === 0
    ) {
      this.resetSearch();
    } else {
      this.resetFilter();
    }

    this.isAssetsRoute = this.router.url.includes('/assets');
    this.loadData();
    this.startStorageWatcher();
  }

  ngAfterViewInit() {
    // this.loadData();
  }
  startStorageWatcher(): void {
    this.previousStartDate = localStorage.getItem('startDate');
    this.previousEndDate = localStorage.getItem('endDate');

    if (!this.storageInterval) {
      this.storageInterval = setInterval(() => {
        const currentStartDate = localStorage.getItem('startDate');
        const currentEndDate = localStorage.getItem('endDate');

        if (
          currentStartDate !== this.previousStartDate ||
          currentEndDate !== this.previousEndDate
        ) {;

          this.previousStartDate = currentStartDate;
          this.previousEndDate = currentEndDate;
          this.onSearch(); 
        }
      }, 1000); 
    }
  }

  stopStorageWatcher(): void {
    if (this.storageInterval) {
      clearInterval(this.storageInterval); 
      this.storageInterval = null; 
    }
  }

 
  ngOnDestroy(): void {
    this.stopStorageWatcher(); 
  }


  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event?.pageIndex;
    this.pageSize = event.pageSize;
    this.onSearch();
  }

  onProjectChange(selectedItems: string[]): void {
    this._selectedProject = this.updateSelection(
      selectedItems,
      this.defaultOptionProjectAll,
      Array.from(this._projects)
    );
    this.onSearch();
  }

  onOsChange(selectedItems: string[]): void {
    this._selectedOsType = this.updateSelection(
      selectedItems,
      this.defaultOptionOstypeAll,
      Array.from(this._osType)
    );
    this.vulnerabilitiesService.setSelectedOsType(this._selectedOsType);

    this.onSearch();
  }

  onPartNoChange(selectedItems: string[]): void {
    this._selectedPartNo = this.updateSelection(
      selectedItems,
      this.defaultOptionPortNoAll,
      Array.from(this._partNo)
    );
    this.vulnerabilitiesService.setSelectedPartNo(this._selectedPartNo);
    this.onSearch();
  }

  onVersionChange(selectedItems: string[]): void {
    this._selectedVersion = this.updateSelection(
      selectedItems,
      this.defaultOptionFwAll,
      Array.from(this._firmwareVersion)
    );
    this.vulnerabilitiesService.setSelectedVersion(this._selectedVersion);
    this.onSearch();
  }
  updateSelection(
    selectedItems: string[],
    allOption: string,
    allItems: string[]
  ): string[] {
    if (selectedItems.includes(allOption)) {
      if (selectedItems.length === 1) {
        return [allOption, ...allItems.filter((item) => item !== allOption)];
      } else {
        return [];
      }
    }
    return selectedItems;
  }

  onSearch(title?: string): void {
    this._isDataLoading$ = of(true);
    const page = title ? 1 : this.currentPageIndex + 1;
// console.log("this.previousStartDate",this.previousStartDate,"===",this.previousEndDate)
// console.log("this.formattedStartDate",this.formattedStartDate,"===",this.formattedEndDate)
    let payload: any = {
      vendorName: this._selectedVendor,
      productName: this.searchService.product,
      partNo: this._selectedPartNo,
      version: this._selectedVersion,
      project: this._selectedProject,
      osType: this._selectedOsType,
      page: page,
      limit: this.pageSize,
      startDate:  this.previousStartDate || this.formattedStartDate,
      endDate:  this.previousEndDate ||this.formattedEndDate,
    };

    const cvePartFirmware = this.cvePartFirmware;
    const startsWithNumber = (str: string) => /^\d/.test(str);
    const startsWithAlphabet = (str: string) => /^[a-zA-Z]/.test(str);

    if (cvePartFirmware) {
      const cveIds = this.cvePartFirmware.split(',').map((cve) => cve.trim());
      payload.cveId = cveIds;
      this.searchService.currentCveId = cveIds;
    }

    if (cvePartFirmware) {
      const searchSplit = cvePartFirmware.split(/[\s,]*\,[,\s]*/);
      const partsSplit = {
        cve: searchSplit
          .filter((record) => record.startsWith('CVE'))
          .map((cve) => cve.trim()),
        part: searchSplit.find(
          (f) => !f.startsWith('CVE') && startsWithAlphabet(f)
        ),
        firmware: searchSplit.find((f) => startsWithNumber(f)),
      };

      if (partsSplit.cve && partsSplit.cve.length > 0) {
        payload.cveId = partsSplit.cve;
        this.searchService.currentCveId = partsSplit.cve;
      }

      if (partsSplit.part) {
        payload.partNo = [partsSplit.part];
        this.searchService.currentPartNo = partsSplit.part;
      }

      if (partsSplit.firmware) {
        payload.firmwareVersion = [partsSplit.firmware];
        this.searchService.currentFirmware = partsSplit.firmware;
      }
    }
    this.searchService
      .postSearch(payload)
      .pipe(
        finalize(() => {
          this._isDataLoading$ = of(false);
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data: any) => {
          // console.log("searchdata:",data)
          if (!data.docs || data.docs.length === 0) {
            this.dataSource = [];
            this.totalItemCount = 0;
          } else {
            const uniqueDocs = Array.from(
              new Set(data.docs.map((doc: any) => JSON.stringify(doc)))
            ).map((str: any) => JSON.parse(str) as any);

            this.dataSource = uniqueDocs;

            this.totalItemCount = data.total || 0;
          }
          if (title) {
            this.currentPageIndex = 0;
          }

          this.prepareFilters(true);
          this.currentPageItems = this.dataSource;
          this.filterVendors();
          this.filterProjects();
          this.filterOsType();
          this.filterPartNo();
          this.filterFw();
          if (this.paginator) {
            this.paginator.pageIndex = this.currentPageIndex;
            this.paginator.length = this.totalItemCount;
          }

          this.cdr.detectChanges();
          this.searchService.isSearchPerformed = true;
        },
        error: (err: any) => {
          this.dataSource = [];
          this.totalItemCount = 0;
          this.cdr.markForCheck();
        },
      });
  }
  public loadAssets() {
    this.logCveService.loadOnlyAssets().subscribe((data: any[]) => {
      this._assets = data;
      if (this._assets.length > 0) {
        this.vulnerabilitiesService.setSelectedAssetId(this._assets[0]._id);
      }
      if (this._assets) {
        this.prepareFilters();
      }
      this.cdr.detectChanges();
    });
  }
  tableData(): void {
    this._isDataLoading$ = of(true);
    const payload = { vendorName: this._selectedVendor };
    this.onSearch();
  }

  _vendorChange(): void {
    this._selectedPartNo = [];
    this._selectedVersion = [];
    this._selectedProject = [];
    this._selectedOsType = [];
    if (this._selectedVendor.includes(this.defaultOptionAll)) {
      if (this._selectedVendor.length === 1) {
        this._selectedVendor = [
          this.defaultOptionAll,
          ...Array.from(this._vendors).filter(
            (vendor) => vendor !== this.defaultOptionAll
          ),
        ];
      } else {
        this._selectedVendor = [];
      }
    }
    if (this.searchService.selectedVendor.length > 0) {
      const requestData = { vendorName: this.searchService.selectedVendor };
      this.searchService.postProductData(requestData).subscribe(
        (productData) => {
          this.productDropdownData = productData.flat();
          this.onSearch();
          this.vendorSelect.close();
        },
        (error) => {
          console.error('Error fetching product data:', error);
        }
      );
    } else {
      this.productDropdownData = [];
      this.onSearch();
    }
  }

  productSearch(): void {
    if (this.searchService.product && this.searchService.product.length > 0) {
      this.dataSource = this.dataSource?.filter(
        (item: { productName: string }) => {
          const searchList = item.productName.toLowerCase();
          return this.searchService.product.some((productItem: string) =>
            searchList.includes(productItem.toLowerCase())
          );
        }
      );
      this.filter.close();
    } else {
    }
    this.onSearch();
  }

  exportToExcel(): void {
    this.toastr.info('Downloading...', 'Info', {
      timeOut: 0,
      extendedTimeOut: 0,
      positionClass: 'toast-bottom-right',
    });

    const payload: any = {
      vendorName: this._selectedVendor,
      productName: this.searchService.product,
      cveId: this.searchService.currentCveId,
      partNo: this._selectedPartNo,
      firmwareVersion: this._selectedVersion,
      project: this._selectedProject,
      osType: this._selectedOsType,
      limit: 100000,
      startDate: this.formattedStartDate || '',
      endDate: this.formattedEndDate || '',
    };
    this.searchService.postSearch(payload).subscribe(
      (data: any) => {
        const allDataToExport = data.docs.map((item: any) => ({
          'Project ID': (item.inventoryDetails[0]?.project || '-').trim(),
          Vendor: item.vendorName || '-',
          'Part No': item.partNo || '-',
          'Firmware Version': item.version || '-',
          'Serial No': item.serialNo || '-',
          Product: item.productName || '-',
          Severity: item.seviarity || '-',
          'Fix Available': item.fix === 'Y' ? 'Yes' : 'No',
          'Affected by CVE': item.affectedCve ? 'No' : 'Yes',
          'CVE ID': item.cveId || '-',
          'Fixed Release':item.fixedRelease|| '-',
          'Security Advisory URL':item.advisoryUrl || '-',
          'Security Advisory Title':item.advisoryTitle || '-',
          'Security Impact Rating':item.seviarity || '-',
          'CVSS Base Score':item.cvssScore || '-',
          'Vulnerable Component or Feature':item.vulnerableComponent || '-',
          'Determine Whether Vulnerable Feature is Enabled':item.vulnerableFeature || '-',
          'Workaround/Mitigation':item.workarounds || '-',

        }));
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('SearchResults');
        const headers = Object.keys(allDataToExport[0]);
        const headerRow = worksheet.addRow(headers);

        // headerRow.eachCell((cell: any) => {
        //   cell.fill = {
        //     type: 'pattern',
        //     pattern: 'solid',
        //     fgColor: { argb: '0070c0' },
        //   };
        //   cell.font = {
        //     color: { argb: 'FFFFFF' },
        //     bold: true,
        //   };
        //   cell.alignment = {
        //     vertical: 'top',
        //   };
        //   cell.border = {
        //     top: { style: 'thin', color: { argb: '000000' } },
        //     left: { style: 'thin', color: { argb: '000000' } },
        //     bottom: { style: 'thin', color: { argb: '000000' } },
        //     right: { style: 'thin', color: { argb: '000000' } },
        //   };
        // });
        // headerRow.eachCell((cell: any, colNumber: number) => {
        //   if (colNumber <= 10) { 
        //     cell.fill = {
        //       type: 'pattern',
        //       pattern: 'solid',
        //       fgColor: { argb: '0070c0' }, 
        //     };
        //     cell.font = {
        //       color: { argb: 'FFFFFF' },
        //       bold: true,
        //     };
        //   } else { 
        //     cell.fill = {
        //       type: 'pattern',
        //       pattern: 'solid',
        //       fgColor: { argb: '00b050' }, 
        //     };
        //     cell.font = {
        //       color: { argb: 'FFFFFF' },
        //       bold: true,
        //     };
        //   }
        
        //   cell.alignment = {
        //     vertical: 'top',
        //   };
        //   cell.border = {
        //     top: { style: 'thin', color: { argb: '000000' } },
        //     left: { style: 'thin', color: { argb: '000000' } },
        //     bottom: { style: 'thin', color: { argb: '000000' } },
        //     right: { style: 'thin', color: { argb: '000000' } },
        //   };
        // });
        headerRow.eachCell((cell: any, colNumber: number) => {
          if (colNumber <= 10) { 
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: '0070c0' }, 
            };
            cell.font = {
              color: { argb: 'FFFFFF' },
              bold: true,
            };
          } else { 
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: '00b050' }, 
            };
            cell.font = {
              color: { argb: 'FFFFFF' },
              bold: true,
            };
          }
        
          cell.alignment = {
            vertical: 'top',
            horizontal: 'center', 
            wrapText: true,       
          };
        
          cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } },
          };
        });
         worksheet.addRow([]);
        allDataToExport.forEach((item: any) => {
          const dataRow = worksheet.addRow(Object.values(item));
          dataRow.eachCell((cell: any) => {
            cell.alignment = {
              wrapText: true,       
              vertical: 'top',
            };
          });
        });
        

        worksheet.mergeCells('A1:A2');
        worksheet.mergeCells('B1:B2');
        worksheet.mergeCells('C1:C2');
        worksheet.mergeCells('D1:D2');
        worksheet.mergeCells('E1:E2');
        worksheet.mergeCells('F1:F2');
        worksheet.mergeCells('G1:G2');
        worksheet.mergeCells('H1:H2');
        worksheet.mergeCells('I1:I2');
        worksheet.mergeCells('J1:J2');
        worksheet.mergeCells('K1:K2');
        worksheet.mergeCells('L1:L2');
        worksheet.mergeCells('M1:M2');
        worksheet.mergeCells('N1:N2');
        worksheet.mergeCells('O1:O2');
        worksheet.mergeCells('P1:P2');
        worksheet.mergeCells('Q1:Q2');
        worksheet.mergeCells('R1:R2');

        const headerLengths = [20, 15, 25, 15, 15, 20, 15, 20, 15,15,15,25,25,20,25,30,30,30];
        

        headerLengths.forEach((width, index) => {
          worksheet.getColumn(index + 1).width = width;
        });

        workbook.xlsx.writeBuffer().then((buffer: any) => {
          this.toastr.clear();

          this.toastr.success('Download completed', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
          const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const fileName = 'CVE_Search.xlsx';
          FileSaver.saveAs(blob, fileName);
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.toastr.error('Error downloading data', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  private prepareFilters(byProduct: boolean = false, byProject = false): void {
    if (!byProduct) {
      this._vendors = new Set();
      this._vendors.add(this.defaultOptionAll);
    }

    if (!byProject && !byProduct) {
      this._projects = new Set();
      this._projects.add(this.defaultOptionAll);
    }

    this._partNo = new Set();
    this._firmwareVersion = new Set();
    this._osType = new Set();
    // this._project = new Set();
    // this._project.add(this.defaultOptionProjectAll);
    this._projects = new Set();
    this._projects.add(this.defaultOptionProjectAll);
    this._osType.add(this.defaultOptionOstypeAll);
    this._partNo.add(this.defaultOptionPortNoAll);
    this._firmwareVersion.add(this.defaultOptionFwAll);
    if (byProduct || byProject) {
      if (byProject) {
        this._assets.forEach((item) => {
          this._vendors.add(item.vendorName);
        });
        this._selectedVendor = [...this._vendors];
      }
      this._assets.forEach((item) => {
        if (this._selectedVendor.includes(this.defaultOptionAll)) {
          this._partNo.add(item.partNo);
          this._firmwareVersion.add(item.firmwareVersion);
          this._osType.add(item.osType);
          this._projects.add(item.project)
          // this._project.add(item.project);
        } else if (this._selectedVendor.includes(item.vendor)) {
          this._partNo.add(item.partNo);
          this._firmwareVersion.add(item.firmwareVersion);
          this._osType.add(item.osType);
          this._projects.add(item.project)
          // this._project.add(item.project);
        }
      });
      this._selectedProduct = this.defaultOptionAll;
    } else {
      this._assets.forEach((item) => {
        this._vendors.add(item.vendor);
        this._partNo.add(item.partNo);
        this._firmwareVersion.add(item.firmwareVersion);
        this._osType.add(item.osType);
        // this._project.add(item.project);
        this._projects.add(item.project);
      });
    }
    const sortedVendors = [...this._vendors].sort((a, b) => {
      if (a === this.defaultOptionAll) return -1;
      if (b === this.defaultOptionAll) return 1;
      return a.localeCompare(b);
    });

    const sortedProjects = [...this._projects].sort((a, b) => {
      if (a === this.defaultOptionAll) return -1;
      if (b === this.defaultOptionAll) return 1;
      return a.localeCompare(b);
    });

    const sortedPartNo = [...this._partNo].sort((a, b) => {
      if (a === this.defaultOptionAll) return -1;
      if (b === this.defaultOptionAll) return 1;
      return a.localeCompare(b);
    });

    const sortedFirmwareVersion = [...this._firmwareVersion].sort((a, b) => {
      if (a === this.defaultOptionAll) return -1;
      if (b === this.defaultOptionAll) return 1;
      return a.localeCompare(b);
    });

    const sortedOsType = [...this._osType].sort((a, b) => {
      if (a === this.defaultOptionAll) return -1;
      if (b === this.defaultOptionAll) return 1;
      return a.localeCompare(b);
    });

    // const sortedProject = [...this._project].sort((a, b) => {
    //   if (a === this.defaultOptionProjectAll) return -1;
    //   if (b === this.defaultOptionProjectAll) return 1;
    //   return a.localeCompare(b);
    // });

    this._vendors = new Set(sortedVendors);
    this._projects = new Set(sortedProjects);
    this._partNo = new Set(sortedPartNo);
    this._firmwareVersion = new Set(sortedFirmwareVersion);
    this._osType = new Set(sortedOsType);
    // this._project = new Set(sortedProject);
    this.filteredVendors = [...this._vendors];
    this.filteredProjects = [...this._projects];
    this.filteredPartNo = [...this._partNo];
    this.filteredOsType = [...this._osType];
    this.filteredfwVersion = [...this._firmwareVersion];
  }
  resetSearch(): void {
    this._selectedVendor = [];
    this._selectedPartNo = [];
    this._selectedVersion = [];
    this._selectedProject = [];
    this._selectedOsType = [];
    this.searchService.currentCveId = [];
    this.searchService.currentFirmware = '';
    this.searchService.currentPartNo = '';
    this.cvePartFirmware = '';
    this.tableData();
    this.resetPaginator();
    this.searchService.isSearchPerformed = false;
  }
  resetFilter() {
    this.tableData();
    this.resetPaginator();
  }

  private resetPaginator(): void {
    this.currentPageIndex = 0;
    this.pageSize = 10;
    this.disablePaginator = false;
  }
  private loadData(): void {
    this._isDataLoading$ = of(true);
    const payload: any = {
      vendorName: this._selectedVendor,
      productName: this.searchService.product,
      partNo: this._selectedPartNo,
      version: this._selectedVersion,
      project: this._selectedProject,
      osType: this._selectedOsType,
      page: this.currentPageIndex + 1,
      pageSize: this.pageSize,
    };
    if (this.searchService.currentCveId) {
      payload.cveId = this.searchService.currentCveId;
    }
    if (this.searchService.currentPartNo) {
      payload.partNo = this.searchService.currentPartNo;
    }
    if (this.searchService.currentOsType) {
      payload.osType = this.searchService.currentOsType;
    }
    if (this.searchService.currentFirmware) {
      payload.firmwareVersion = this.searchService.currentFirmware;
    }
  }
  filterVendors() {
    const filterValue = this.vendorFilter.toLowerCase();

    if (filterValue) {
      this.filteredVendors = [...this._vendors].filter(
        (vendor) =>
          vendor.toLowerCase().includes(filterValue) ||
          this._selectedVendor.includes(vendor)
      );
    } else {
      this.filteredVendors = [...this._vendors];
    }
  }

  filterProjects() {
    const filterValue = this.projectFilter.toLowerCase();

    if (filterValue) {
      this.filteredProjects = [...this._projects].filter(
        (project) =>
          project.toLowerCase().includes(filterValue)
        //  ||
        //    this._selectedProject.includes(project)
      );
    } else {
      this.filteredProjects = [...this._projects];
    }
  }
  filterOsType() {
    const filterValue = this.osTypeFilter.toLowerCase();
    if (filterValue) {
      this.filteredOsType = [...this._osType].filter((osType) =>
        osType.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredOsType = [...this._osType];
    }
  }
  filterPartNo() {
    const filterValue = this.partnoFilter.toLowerCase();
    if (filterValue) {
      this.filteredPartNo = [...this._partNo].filter((partNo) =>
        partNo.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredPartNo = [...this._partNo];
    }
  }
  filterFw() {
    const filterValue = this.fwVersionFilter.toLowerCase();
    if (filterValue) {
      this.filteredfwVersion = [...this._firmwareVersion].filter((project) =>
        project.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredfwVersion = [...this._firmwareVersion];
    }
  }
}
