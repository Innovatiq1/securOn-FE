import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateService } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import * as moment from 'moment';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, Subject, firstValueFrom, of, takeUntil } from 'rxjs';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
  color: string;
}

interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}
interface IRange {
  value: Date[];
  label: string;
  code: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    BsDatepickerModule,
    MatButtonModule,
    
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  searchText: string = '';
  navItems = navItems;
  public _selectedRange: IRange = {
    value: [moment().subtract(1, 'months').toDate(), moment().toDate()],
    label: 'Last 1 Months',
    code: '1',
  };
  ranges: IRange[] = [
    {
      value: [moment().subtract(3, 'months').toDate(), moment().toDate()],
      label: 'Last 3 Months',
      code: '3',
    },
    {
      value: [moment().subtract(6, 'months').toDate(), moment().toDate()],
      label: 'Last 6 Months',
      code: '6',
    },
    {
      value: [moment().subtract(12, 'months').toDate(), moment().toDate()],
      label: 'Last 12 Months',
      code: '12',
    },
  ];
  navItemsData = navItems.filter((navitem) => navitem.displayName);
  user:string = '';

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  
  public selectedDateRange: Date[];
  public selectSwitchDate: Date[];


  showFiller = false;

 

  constructor(
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService, private vulnerabilitiesService: VulnerabilitiesService, private cdr: ChangeDetectorRef,
  ) {
    translate.setDefaultLang('en');
    
  }



  onDateRangeChange(selectedDateRange: Date[]): void {
    this.selectedDateRange = selectedDateRange;
    const startDate = moment(selectedDateRange[0]);
    const endDate = moment(selectedDateRange[1]);
    if (startDate) localStorage.setItem('startDate', startDate.toString());
    if (endDate) localStorage.setItem('endDate', endDate.toString());
  }

  ngOnInit(){
    this.user = localStorage.getItem('userName') ?? '';

    this.selectSwitchDate = this._selectedRange.value;
    this.selectedDateRange = this._selectedRange.value;

    const fromDate = this.selectedDateRange
    ? moment(this.selectedDateRange[0]).format('YYYY-MM-DD').toString()
    : '';
    const toDate = this.selectedDateRange
    ? moment(this.selectedDateRange[1]).format('YYYY-MM-DD').toString()
    : '';
    if (fromDate) localStorage.setItem('startDate', fromDate.toString());
    if (toDate) localStorage.setItem('endDate', toDate.toString());
  }

 
  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  profiledd: profiledd[] = [
    {
      id: 1,
      img: 'wallet',
      color: 'primary',
      title: 'My Profile',
      subtitle: 'Account Settings',
      link: '/',
    },
    {
      id: 2,
      img: 'shield',
      color: 'success',
      title: 'My Inbox',
      subtitle: 'Messages & Email',
      link: '/',
    },
    {
      id: 3,
      img: 'credit-card',
      color: 'error',
      title: 'My Tasks',
      subtitle: 'To-do and Daily Tasks',
      link: '/',
    },
  ];
}



@Component({
  selector: 'search-dialog',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    TablerIconsModule,
    FormsModule,
    NgScrollbarModule,
    BsDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);
  
constructor(){}


}