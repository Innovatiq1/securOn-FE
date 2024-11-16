import { Component, Input } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-schedule-logs',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './schedule-logs.component.html',
  styleUrl: './schedule-logs.component.scss'
})
export class ScheduleLogsComponent {
  @Input() isActive = false;
}
