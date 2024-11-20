import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { VulnerabilitiesService } from 'src/app/services/api/vulnerabilities.service';
import { CommonModule } from '@angular/common';
import moment from 'moment';
@Component({
  selector: 'app-schedule-logs',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './schedule-logs.component.html',
  styleUrl: './schedule-logs.component.scss'
})
export class ScheduleLogsComponent implements  OnInit {


  @Input() isActive = false;
  schedulerLogsData:any;
  UserActivityLogsData:any
  constructor(private vulnerabilitiesService:VulnerabilitiesService){}
  ngOnInit(): void {
    this.getSchedulerLog();
    this.getUserActivityLog();
}

getSchedulerLog(){
  const fromDate = localStorage.getItem('startDate');
  const toDate = localStorage.getItem('endDate');
  const payload = {
    fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
    toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',

  };
  this.vulnerabilitiesService.getSchedulerLogs(payload).subscribe((res)=>{
    this.schedulerLogsData=res;
    // this.dataSource=res;
    // console.log("this.dataSource",this.dataSource)
  })

}
getUserActivityLog(){
  const fromDate = localStorage.getItem('startDate');
  const toDate = localStorage.getItem('endDate');
  const payload = {
    fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
    toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : '',

  };
  this.vulnerabilitiesService.getUserActivityLogs(payload).subscribe((res)=>{
    this.UserActivityLogsData=res;
    // this.dataSource=res;
    // console.log("this.dataSource",this.dataSource)
  })

}
}
