import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-move-controls',
  imports: [CommonModule],
  templateUrl: './move-controls.html',
  styleUrls: ['./move-controls.scss']
})
export class MoveControls{
  @Output() undo = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
