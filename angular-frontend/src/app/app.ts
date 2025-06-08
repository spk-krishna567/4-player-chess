import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Lobby } from './pages/lobby/lobby';
import { PlayerPanel } from './components/player-panel/player-panel';
import { DisconnectionBanner } from "./components/disconnection-banner/disconnection-banner";
import { Chessboard } from "./components/chessboard/chessboard";
import { GameRoom } from "./pages/game-room/game-room";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  GameRoom],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-frontend';
}
