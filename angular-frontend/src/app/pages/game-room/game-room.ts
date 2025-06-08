
import { Component } from '@angular/core';
import { MoveControls } from '../../components/move-controls/move-controls';
import { DisconnectionBanner } from '../../components/disconnection-banner/disconnection-banner';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import { TurnIndicator } from '../../components/turn-indicator/turn-indicator';
import { Chessboard } from '../../components/chessboard/chessboard';
import { PlayerPanel } from '../../components/player-panel/player-panel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.html',
  styleUrls: ['./game-room.scss'],
  imports: [CommonModule,MoveControls,LoadingSpinner,TurnIndicator,Chessboard,PlayerPanel],
})
export class GameRoom {
  isLoading: boolean = false;
  isDisconnected: boolean = false;

  constructor() {
    // Example logic to simulate loading and connection status
    // Replace this with real service hooks in future
    this.simulateConnection();
  }

  simulateConnection() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isDisconnected = Math.random() < 0.2; // Simulate random disconnect
    }, 2000);
  }
}