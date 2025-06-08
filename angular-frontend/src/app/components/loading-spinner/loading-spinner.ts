import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrls: ['./loading-spinner.scss']
})
export class LoadingSpinner {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'white' | 'black' = 'white';
  @Input() message = 'Preparing epic chess battle';

  getPieceSvg(type: string): string {
    const pieces: {[key: string]: string} = {
      pawn: `<svg viewBox="0 0 100 100">
        <path d="M50 20 Q60 20 65 30 Q70 40 70 50 Q70 60 65 70 Q60 80 50 80 Q40 80 35 70 Q30 60 30 50 Q30 40 35 30 Q40 20 50 20 Z
               M40 30 L60 30 L55 50 L45 50 Z" fill="currentColor"/>
      </svg>`,
      knight: `<svg viewBox="0 0 100 100">
        <path d="M30 30 Q40 20 60 20 Q80 30 80 50 Q75 70 60 80 Q50 85 40 80 Q30 70 30 50 Z
               M40 40 Q50 35 60 40 Q65 50 60 60 Q50 65 40 60 Q35 50 40 40 Z" fill="currentColor"/>
      </svg>`,
      bishop: `<svg viewBox="0 0 100 100">
        <path d="M50 20 Q60 20 70 30 L60 40 Q55 35 50 35 Q45 35 40 40 L30 30 Q40 20 50 20 Z
               M35 45 L65 45 L60 70 Q55 80 50 80 Q45 80 40 70 Z" fill="currentColor"/>
      </svg>`,
      rook: `<svg viewBox="0 0 100 100">
        <rect x="30" y="20" width="40" height="20" fill="currentColor"/>
        <rect x="35" y="40" width="30" height="40" fill="currentColor"/>
        <rect x="25" y="30" width="10" height="10" fill="currentColor"/>
        <rect x="65" y="30" width="10" height="10" fill="currentColor"/>
      </svg>`,
      queen: `<svg viewBox="0 0 100 100">
        <circle cx="50" cy="30" r="15" fill="currentColor"/>
        <path d="M50 45 L60 80 L40 80 Z" fill="currentColor"/>
        <circle cx="35" cy="25" r="5" fill="currentColor"/>
        <circle cx="65" cy="25" r="5" fill="currentColor"/>
      </svg>`,
      king: `<svg viewBox="0 0 100 100">
        <rect x="40" y="20" width="20" height="50" fill="currentColor"/>
        <rect x="30" y="40" width="40" height="10" fill="currentColor"/>
        <rect x="45" y="10" width="10" height="10" fill="currentColor"/>
        <rect x="35" y="70" width="30" height="10" fill="currentColor"/>
      </svg>`
    };
    return pieces[type] || '';
  }
}