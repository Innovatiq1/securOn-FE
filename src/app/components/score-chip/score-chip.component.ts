import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-chip',
  standalone: true,
  imports: [],
  templateUrl: './score-chip.component.html',
  styleUrl: './score-chip.component.scss'
})
export class ScoreChipComponent {
  @Input() score: number;
}
