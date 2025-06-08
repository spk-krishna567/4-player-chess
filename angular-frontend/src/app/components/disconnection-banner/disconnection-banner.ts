// disconnection-banner.component.ts
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-disconnection-banner',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './disconnection-banner.html',
  styleUrls: ['./disconnection-banner.scss'],
  animations: [
    trigger('slideInOut', [
      // State when online (hidden)
      state('online', style({
        transform: 'translateY(-100%)',
        opacity: 0,
        height: '0px',
        padding: '0px' // Ensure padding is 0 when hidden
      })),
      // State when offline (visible)
      state('offline', style({
        transform: 'translateY(0)',
        opacity: 1,
        height: '*', // Let Angular calculate the natural height
        padding: '0.8rem 1.5rem' // Restore padding (ensure this matches SCSS)
      })),
      // Transition from online (hidden) to offline (visible)
      transition('online => offline', [
        style({ height: '0px', padding: '0px', opacity: 0 }), // Start from fully hidden state
        animate('300ms ease-out', style({
          height: '*', // Animate height
          padding: '0.8rem 1.5rem', // Animate padding
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      // Transition from offline (visible) to online (hidden)
      transition('offline => online', [
        animate('250ms ease-in', style({
          height: '0px', // Animate height
          padding: '0px', // Animate padding
          opacity: 0,
          transform: 'translateY(-100%)'
        }))
      ])
    ])
  ]
})
export class DisconnectionBanner implements OnInit, OnDestroy {
  isOnline = signal(navigator.onLine);

  private onlineListener = () => this.isOnline.set(true);
  private offlineListener = () => this.isOnline.set(false);

  ngOnInit(): void {
    this.setupListeners();
  }

  ngOnDestroy(): void {
    this.cleanupListeners();
  }

  private setupListeners(): void {
    window.addEventListener('online', this.onlineListener);
    window.addEventListener('offline', this.offlineListener);
  }

  private cleanupListeners(): void {
    window.removeEventListener('online', this.onlineListener);
    window.removeEventListener('offline', this.offlineListener);
  }

  get animationState(): string {
    return this.isOnline() ? 'online' : 'offline';
  }
}