import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { SearchService } from 'src/app/services/api/search.service';

@Component({
  selector: 'app-view-search',
  standalone: true,
  imports: [ MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablerIconsModule,
    RouterModule,],
  templateUrl: './view-search.component.html',
  styleUrl: './view-search.component.scss'
})
export class ViewSearchComponent {
  @Input() cveData: any;
  subscribeParams: any;
  cveId: string;
  data: any;
  row: any;
  cve: any;
  cveidview: FormGroup;
  details: any;
  isDarkMode: boolean;

  constructor(private http: HttpClient, private route: ActivatedRoute,private cdr: ChangeDetectorRef,
    private searchService: SearchService) {
    this.subscribeParams = this.route.params.subscribe((params: any) => {
      this.cveId = params.id;
      console.log(this.cveId);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.cveId = params.id;
      this.postView();
    });
  }

  postView() {
    console.log('Making POST request with cveId:', this.cveId);

    const apiUrl = 'http://localhost:8000/getCveSearchDetails';

    this.http.post(apiUrl, { cveId: this.cveId }).subscribe(
      (response: any) => {
        this.details = response
        console.log("Success",this.details)
      },
      (error) => {
        console.error('API Error:', error);
      }
    );

  }

  openPopup(url: string | null | undefined, event: MouseEvent): void {
    if (!url) return;
    event.preventDefault();
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const options = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    // Open the popup window
    window.open(url, 'popup', options);
  }

}
