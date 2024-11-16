import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule],
  providers: [DatePipe],
  templateUrl: './add.component.html',
})
export class AddComponent {

}
