import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { VulnerabilityDataService } from 'src/app/services/api/shared.service';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvssAttribute } from "../../../pipe/cvss-attribute.pipe";
import { ScoreChipComponent } from "../../score-chip/score-chip.component";
import { ActivatedRoute } from '@angular/router';

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
  response: any;
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
  cweId: string | undefined;
  constructor(
    private vulnerabilitiesService: VulnerabilitiesService,
    public vulnerabilityDataService: VulnerabilityDataService,
    private cdr: ChangeDetectorRef,
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
      this.response = this.response.filter((cve: { cveId: string; }) => {
        return cve?.cveId.toLowerCase().includes(searchText.toLowerCase());
      });
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
            this.response = response.data;
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

  back(){
    window.history.back();
  }
}
