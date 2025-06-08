import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Player {
  id: string;
  name: string;
  avatar: string;
  ready: boolean;
  color?: string;
}

interface ChatMessage {
  user: string;
  text: string;
  time: string;
}

interface GameSetting {
  label: string;
  value: string;
}

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lobby.html',
  styleUrl: './lobby.scss'
})
export class Lobby {
  players: Player[] = [
    { id: '1', name: 'You', avatar: '👑', ready: true, color: '#FF5252' },
    { id: '2', name: 'CoolChessMaster', avatar: '🎩', ready: false, color: '#4CAF50' },
    { id: '3', name: 'PawnPusher42', avatar: '🤓', ready: true, color: '#2196F3' },
    { id: '4', name: 'QueenGambit', avatar: '👸', ready: false, color: '#FFC107' }
  ];

  gameSettings: GameSetting[] = [
    { label: 'Time Control', value: '10|0' },
    { label: 'Variant', value: 'Standard 4-Player' },
    { label: 'Board Theme', value: 'Wood' }
  ];

  chatMessages: ChatMessage[] = [
    { user: 'CoolChessMaster', text: 'Ready to lose? 😎', time: '2:45 PM' },
    { user: 'You', text: 'Bring it on!', time: '2:46 PM' },
    { user: 'PawnPusher42', text: 'Good luck everyone!', time: '2:47 PM' }
  ];

  newMessage = '';

  readonly playerPositions = ['bottom', 'right', 'top', 'left'];

  toggleReady(player: Player): void {
    if (player.id === '1') { // Only allow the current user to toggle their ready status
      player.ready = !player.ready;
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages = [
        ...this.chatMessages,
        {
          user: 'You',
          text: this.newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      this.newMessage = '';
    }
  }

  get readyCount(): number {
    return this.players.filter(p => p.ready).length;
  }

  get canStartGame(): boolean {
    return this.readyCount >= 2; // At least 2 players ready to start
  }

  startGame(): void {
    if (this.canStartGame) {
      console.log('Game starting!');
      // In a real app, you would navigate to the game component here
    }
  }

  trackByPlayerId(index: number, player: Player): string {
    return player.id;
  }

  trackBySettingLabel(index: number, setting: GameSetting): string {
    return setting.label;
  }

  trackByChatIndex(index: number): number {
    return index;
  }
}