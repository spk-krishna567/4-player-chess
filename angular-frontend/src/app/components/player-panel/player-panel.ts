import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';
type PlayerStatus = 'connected' | 'disconnected' | 'thinking' | 'ready';

@Component({
  selector: 'app-player-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-panel.html',
  styleUrls: ['./player-panel.scss']
})
export class PlayerPanel {
  @Input() playerName: string = 'Player';
  @Input() playerColor: PlayerColor = 'red';
  @Input() status: PlayerStatus = 'connected';
  @Input() isCurrentPlayer: boolean = false;
  @Input() timeRemaining: number = 300; // in seconds
  @Input() rating: number = 1200;
  @Input() avatar: string = '👑';
  @Input() position: 'top' | 'left' | 'right' | 'bottom' = 'top'; // Added position property
  
  @Output() challenge = new EventEmitter<void>();
  @Output() message = new EventEmitter<string>();
  @Output() rematch = new EventEmitter<void>();

  get statusIcon(): string {
    switch (this.status) {
      case 'connected': return '🟢';
      case 'disconnected': return '🔴';
      case 'thinking': return '🤔';
      case 'ready': return '✅';
      default: return '❔';
    }
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  get playerBorder(): string {
    return `border-${this.playerColor}-500`;
  }

  get playerBg(): string {
    return `bg-${this.playerColor}-100`;
  }

  sendChallenge() {
    this.challenge.emit();
  }

  sendRematch() {
    this.rematch.emit();
  }

  sendQuickMessage(msg: string) {
    this.message.emit(msg);
  }
}