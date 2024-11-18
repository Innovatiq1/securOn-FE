import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TablerIconsModule,
    RouterModule,
    BsDatepickerModule,],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent {
  displayedProjectColumns: string[] = ['select','project', 'description'];
  displayedUserColumns: string[] = ['select','username', 'email'];
  displayedVendorColumns: string[] = ['select', 'title','description'];
  dataSource: any[] = [];
  currentProjectItems: any[] = [ 
    {
      project:"Jeye",description:"Jeye Project"
    },
    {
      project:"CTZ",description:"CTZ Project"
    },
    {
      project:"CRS",description:"CRS Project"
    },
    {
      project:"Ocean Shield",description:"Ocean Shield Project"
    },
    {
      project:"Cube",description:"Cube Project"
    },
    {
      project:"INT",description:"INT Project"
    },
  ];
  currentUserItems: any[] = [ 
    {
      userName:"User 1",email:"user1@gmail.com"
    },
    {
      userName:"Innovatiq",email:"innovatiq@gmail.com"
    },
    {
      userName:"User 2",email:"user2@gmail.com"
    },
    {
      userName:"User 3",email:"user3@gmail.com"
    },
    {
      userName:"User 4",email:"user4@gmail.com"
    },
    
  ];
  currentVendorItems: any[] = [

  {
    title:"Fortinet",description:"Fortinet is led by a strong management team with deep experience in networking and security"
  },
  {
    title:"Solar winds",description:"SolarWinds designs and develops information technology management software"
  },
  {
    title:"Cisco",description:"Cisco develops, manufactures, and sells networking hardware, software, telecommunications equipment"
  },
  {
    title:"F5",description:"F5 is a multi-cloud application services and security company committed to bringing a better digital world to life."
  },
  {
    title:"Microsoft",description:" Microsoft Corporation is a leading developer of computer software, operating systems, cloud computing, and artificial intelligence "
  },

  ];

}
