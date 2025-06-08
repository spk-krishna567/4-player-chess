import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-turn-indicator',
  imports: [CommonModule],
  templateUrl: './turn-indicator.html',
  styleUrls: ['./turn-indicator.scss']
})
export class TurnIndicator {
  @Input() currentPlayer: string = '';
  @Input() playerColor: 'red' | 'blue' | 'green' | 'yellow' = 'red';
  @Input() isCritical: boolean = false; // For low time situations
}