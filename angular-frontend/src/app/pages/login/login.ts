import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition, 
  keyframes
} from '@angular/animations';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NgStyle, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  animations: [
    trigger('pageTransition', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('600ms 300ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('inputAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('400ms 200ms ease-out', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('linkHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hovered', animate('200ms ease-in-out'))
    ]),
    trigger('floatAnimation', [
      transition(':enter', [
        animate('15000ms linear',
          keyframes([
            style({ transform: 'translateY(0) rotate(0deg)', offset: 0 }),
            style({ transform: 'translateY(-100px) rotate(90deg)', offset: 0.25 }),
            style({ transform: 'translateY(-200px) rotate(180deg)', offset: 0.5 }),
            style({ transform: 'translateY(-100px) rotate(270deg)', offset: 0.75 }),
            style({ transform: 'translateY(0) rotate(360deg)', offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  chessSquares: any[] = [];
  linkHoverState = signal<'normal' | 'hovered'>('normal');

  constructor(private fb: FormBuilder) { }

  // Removed duplicate initializeForm method

  ngOnInit(): void {
    this.createChessBoard();
    this.initializeForm();
  }

  createChessBoard(): void {
    const colors = ['#f0d9b5', '#b58863'];
    for (let i = 0; i < 64; i++) {
      this.chessSquares.push({
        'background-color': colors[(Math.floor(i / 8) + i) % 2],
        'left': `${(i % 8) * 12.5}%`,
        'top': `${Math.floor(i / 8) * 12.5}%`,
        'opacity': '0.2'
      });
    }
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Add your authentication logic here
    }
  }

  animateInput(event: any): void {
    const inputElement = event.target;
    const underline = inputElement.nextElementSibling;
    underline.style.transform = 'scaleX(1)';
    underline.style.backgroundColor = '#b58863';
  }

  resetInput(event: any): void {
    const inputElement = event.target;
    const underline = inputElement.nextElementSibling;
    if (!inputElement.value) {
      underline.style.transform = 'scaleX(0)';
    }
    underline.style.backgroundColor = '#f0d9b5';
  }

  onLinkHover(state: 'normal' | 'hovered'): void {
    this.linkHoverState.set(state);
  }
}