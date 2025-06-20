import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvssAttribute } from "../../../pipe/cvss-attribute.pipe";
import { ScoreChipComponent } from "../../score-chip/score-chip.component";
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-by-type',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule, FormsModule, ReactiveFormsModule, CvssAttribute, ScoreChipComponent],
  templateUrl: './view-by-type.component.html',
  styleUrl: './view-by-type.component.scss',
})
export class ViewByTypeComponent {

  startDate: string = '';
  endDate: string = '';
  label: string | null = null;
  searchControl: FormControl = new FormControl("");
  private subscriptions: Subscription = new Subscription();
  // response: any;
  response = new MatTableDataSource<any>([]);
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly cweLabelMapping: { [key: string]: string } = {
    'CWE-79': 'XSS',
    'CWE-89': 'SQL Injection',
    'CWE-22': 'Directory Traversal',
    'CWE-20': 'Input Validation',
    'CWE-352': 'CSRF',
    'CWE-200': 'Information Disclosure',
    'CWE-601': 'Open Redirect',
    'CWE-119': 'Memory Corruption',
    'CWE-98': 'File Inclusion',
    'CWE-611': 'XXE',
    'CWE-918': 'SSRF',
  };
  savedPageSize: number = 10;
  cweId: string | undefined;
  constructor(
    private vulnerabilitiesService: VulnerabilitiesService,
    public vulnerabilityDataService: VulnerabilityDataService,
    private cdr: ChangeDetectorRef, public router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.label = params['label'];
      console.log('Received Label:', this.label);

      this.cweId = Object.keys(this.cweLabelMapping).find(key => this.cweLabelMapping[key] === this.label);

      if (this.cweId) {
        console.log('Mapped CWE ID:', this.cweId);
      } else {
        console.log('No matching CWE ID found for the label:', this.label);
      }
    });
  
    this.subscriptions.add(
      this.vulnerabilityDataService.startDate$.subscribe((date) => {
        this.startDate = date!;
        console.log('Start Date:', this.startDate);
      })
    );

    this.subscriptions.add(
      this.vulnerabilityDataService.endDate$.subscribe((date) => {
        this.endDate = date!;
        console.log('End Date:', this.endDate);
      })
    );
    this.getCveRecordsByWeaknessAndDate();

    this.searchControl.valueChanges.pipe(
      debounceTime(200) 
    ).subscribe((searchText: string) => {
      this.response.data = this.response.data.filter((cve: { cveId: string; }) => {
        return cve?.cveId.toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }
  ngAfterViewInit() {
    this.response.paginator = this.paginator;

    this.response.paginator = this.paginator;
  
    const savedSize = sessionStorage.getItem('paginationPageSize');
    const savedPageIndex = sessionStorage.getItem('paginationPageIndex');
    if (savedPageIndex) {
      this.paginator.pageIndex = +savedPageIndex;
    }
  
    this.paginator.page.subscribe(() => {
      this.response.paginator = this.paginator;
    });


    if (savedSize) {
      this.paginator.pageSize = +savedSize;
    }
  
  
    this.paginator.page.subscribe(() => {
      sessionStorage.setItem('paginationPageSize', this.paginator.pageSize.toString());
      sessionStorage.setItem('paginationPageIndex', this.paginator.pageIndex.toString());
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCveRecordsByWeaknessAndDate() {
    const payload = {
      fromDate:  this.startDate,
      toDate:  this.endDate,
      cwe:this.cweId
    }
    console.log("payloadBtTy",payload)
    this.vulnerabilityDataService.show();
    try {
      this.vulnerabilitiesService.getCveRecordsByWeaknessAndDate(payload).subscribe(
        async (response) => {
          console.log('payloadBy', response);
          if (response) {
            this.response.data = response.data;
            this.response.data = response.data;
            this.response = new MatTableDataSource(this.response.data );

            setTimeout(() => {
              const savedPageIndex = sessionStorage.getItem('paginationPageIndex');
              if (savedPageIndex) {
                this.paginator.pageIndex = +savedPageIndex;
                sessionStorage.removeItem('paginationPageIndex');
              }

              const savedSize = sessionStorage.getItem('paginationPageSize');
              if (savedSize) {
                this.savedPageSize = +savedSize;
                sessionStorage.removeItem('paginationPageSize');
              }
              this.response.paginator = this.paginator;
            });
            
          }
          this.vulnerabilityDataService.hide();
          this.cdr.detectChanges();
        },
        (error) => {
          this.vulnerabilityDataService.setDataLoading(false);
          console.error('Call failed', error);
        }
      );
    } catch (error) {
      this.vulnerabilitiesService.setDataLoading(false);
      console.error('Call failed', error);
    }
  }

  view(cveid:number){ 
    sessionStorage.setItem('paginationPageIndex', this.paginator.pageIndex.toString());
    this.router.navigate(['cve/vulnerabilty'], {queryParams: {cveId: cveid}});
  }
  back(){
    window.history.back();
  }
}
