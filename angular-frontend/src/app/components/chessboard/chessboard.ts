import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Piece {
  row: number;
  col: number;
  type: string;
  color: string;
}


@Component({
  standalone: true,
  selector: 'app-chessboard',
  imports: [CommonModule],
  templateUrl: './chessboard.html',
  styles: [`
    canvas {
      display: block;
      margin: 0 auto;
    }
  `]
})
export class Chessboard implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  pieces:Piece[] = this.initPieces();
  selectedRow: number | null = null;
  selectedCol: number | null = null;
  selectedPiece: { row: number; col: number; type: string; color: string } | null = null;
  currentTurn: 'red' | 'blue' | 'yellow' | 'green' = 'red';
  imageCache: { [key: string]: HTMLImageElement } = {};

  playerScores = {
    red: 5,
    blue: 4,
    yellow: 2,
    green: 3
  };


  rows = 14;
  cols = 14;
  squareSize = 50;

  hoverX = -1;
  hoverY = -1;

 

  ngAfterViewInit() {
  
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    this.preloadImages().then(() => {
      this.drawBoard(ctx);
    });// <- extracted method
    const tileSize = this.squareSize;
  
    // Draw board
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = col * tileSize;
        const y = row * tileSize;
        const isHover = col === this.hoverX && row === this.hoverY;
  
        if (this.isCorner(row, col)) {
          ctx.fillStyle = 'black';
        } else {
          ctx.fillStyle = (row + col) % 2 === 0 ? '#ffffff' : '#8b0000';
        }
  
        ctx.shadowBlur = isHover ? 10 : 0;
        ctx.shadowColor = 'yellow';
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }
  
    this.pieces.forEach(piece => {
      const x = piece.col * tileSize;
      const y = piece.row * tileSize;
      const key = `${piece.color}-${piece.type}`;
      const image = this.imageCache[key];
    
      if (image) {
        ctx.drawImage(image, x, y, this.squareSize, this.squareSize);
      }
    });

    //mouse hover

    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.hoverX = Math.floor(x / this.squareSize);
      this.hoverY = Math.floor(y / this.squareSize);
      this.drawBoard(ctx);
    });
  
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / this.squareSize);
      const row = Math.floor(y / this.squareSize);
    
      const clickedPieceIndex = this.pieces.findIndex(p => p.row === row && p.col === col);
      const clickedPiece = clickedPieceIndex !== -1 ? this.pieces[clickedPieceIndex] : null;
    
      if (this.selectedPiece) {
        // 🛑 Prevent capturing own piece
        if (clickedPiece && clickedPiece.color === this.currentTurn) {
          // Cancel selection
          this.selectedPiece = null;
          this.drawBoard(ctx);
          return;
        }
    
        // ✅ Capture opponent piece (if present)
        if (clickedPiece) {
          this.pieces.splice(clickedPieceIndex, 1);
        }
    
        // 🔄 Move the selected piece
        const originalIndex = this.pieces.findIndex(
          p => p.row === this.selectedPiece!.row && p.col === this.selectedPiece!.col
        );
    
        if (originalIndex !== -1) {
          this.pieces[originalIndex].row = row;
          this.pieces[originalIndex].col = col;
        }
    
        this.selectedPiece = null;
        this.rotateTurn();
        this.drawBoard(ctx);
      } 
      else if (clickedPiece) {
        // 🟢 Select a piece only if it's the current player's
        if (clickedPiece.color === this.currentTurn) {
          this.selectedPiece = { ...clickedPiece };
          this.drawBoard(ctx);
        }
      }
    });
    
  }
  

  private isCorner(row: number, col: number): boolean {
    return (
      (row < 3 && col < 3) ||      // Top-left
      (row < 3 && col > 10) ||     // Top-right
      (row > 10 && col < 3) ||     // Bottom-left
      (row > 10 && col > 10)       // Bottom-right
    );
  }

  getPieceColor(color: string): string {
    switch (color) {
      case 'white': return '#f0f0f0';
      case 'black': return '#111';
      case 'red': return 'darkred';
      case 'blue': return 'darkblue';
      default: return '#000';
    }
  }


  initPieces(): Piece[] {
    const pieces: Piece[] = [];
  
    // Green (top, rows 0–1)
    pieces.push(...[
      { row: 0, col: 3, type: 'rook', color: 'green' },
      { row: 0, col: 4, type: 'knight', color: 'green' },
      { row: 0, col: 5, type: 'bishop', color: 'green' },
      { row: 0, col: 6, type: 'queen', color: 'green' },
      { row: 0, col: 7, type: 'king', color: 'green' },
      { row: 0, col: 8, type: 'bishop', color: 'green' },
      { row: 0, col: 9, type: 'knight', color: 'green' },
      { row: 0, col: 10, type: 'rook', color: 'green' },
      ...Array.from({ length: 8 }, (_, i) => ({
        row: 1, col: i + 3, type: 'pawn', color: 'green'
      }))
    ]);
  
    // Yellow (bottom, rows 13–12)
    pieces.push(...[
      { row: 13, col: 3, type: 'rook', color: 'yellow' },
      { row: 13, col: 4, type: 'knight', color: 'yellow' },
      { row: 13, col: 5, type: 'bishop', color: 'yellow' },
      { row: 13, col: 6, type: 'queen', color: 'yellow' },
      { row: 13, col: 7, type: 'king', color: 'yellow' },
      { row: 13, col: 8, type: 'bishop', color: 'yellow' },
      { row: 13, col: 9, type: 'knight', color: 'yellow' },
      { row: 13, col: 10, type: 'rook', color: 'yellow' },
      ...Array.from({ length: 8 }, (_, i) => ({
        row: 12, col: i + 3, type: 'pawn', color: 'yellow'
      }))
    ]);
  
    // Red (left, cols 0–1)
    pieces.push(...[
      { row: 3, col: 0, type: 'rook', color: 'red' },
      { row: 4, col: 0, type: 'knight', color: 'red' },
      { row: 5, col: 0, type: 'bishop', color: 'red' },
      { row: 6, col: 0, type: 'queen', color: 'red' },
      { row: 7, col: 0, type: 'king', color: 'red' },
      { row: 8, col: 0, type: 'bishop', color: 'red' },
      { row: 9, col: 0, type: 'knight', color: 'red' },
      { row: 10, col: 0, type: 'rook', color: 'red' },
      ...Array.from({ length: 8 }, (_, i) => ({
        row: i + 3, col: 1, type: 'pawn', color: 'red'
      }))
    ]);
  
    // Blue (right, cols 13–12)
    pieces.push(...[
      { row: 3, col: 13, type: 'rook', color: 'blue' },
      { row: 4, col: 13, type: 'knight', color: 'blue' },
      { row: 5, col: 13, type: 'bishop', color: 'blue' },
      { row: 6, col: 13, type: 'queen', color: 'blue' },
      { row: 7, col: 13, type: 'king', color: 'blue' },
      { row: 8, col: 13, type: 'bishop', color: 'blue' },
      { row: 9, col: 13, type: 'knight', color: 'blue' },
      { row: 10, col: 13, type: 'rook', color: 'blue' },
      ...Array.from({ length: 8 }, (_, i) => ({
        row: i + 3, col: 12, type: 'pawn', color: 'blue'
      }))
    ]);
  
    return pieces;
  }
  
  

  drawBoard(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.cols * this.squareSize, this.rows * this.squareSize);
  
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = col * this.squareSize;
        const y = row * this.squareSize;
  
        // Corner regions are blacked out
        if (this.isCorner(row, col)) {
          ctx.fillStyle = 'black';
        } else {
          ctx.fillStyle = (row + col) % 2 === 0 ? '#ffffff' : '#8b0000';
        }
  
        // Hover highlight
        if (row === this.hoverY && col === this.hoverX) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'yellow';
        } else {
          ctx.shadowBlur = 0;
        }
  
        ctx.fillRect(x, y, this.squareSize, this.squareSize);
  
        // Selected piece highlight
        if (
          this.selectedPiece &&
          this.selectedPiece.row === row &&
          this.selectedPiece.col === col
        ) {
          ctx.strokeStyle = 'orange';
          ctx.lineWidth = 3;
          ctx.strokeRect(x + 1, y + 1, this.squareSize - 2, this.squareSize - 2);
        }
      }
    }
  
    this.pieces.forEach(piece => {
      const x = piece.col * this.squareSize;
      const y = piece.row * this.squareSize;
      const key = `${piece.color}-${piece.type}`;
      const image = this.imageCache[key];
    
      if (image) {
        ctx.drawImage(image, x, y, this.squareSize, this.squareSize);
      }
    });

          // After drawing board squares and before drawing pieces
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      // Top-left (green)
      ctx.fillText(`🟢 Green: ${this.playerScores.green}`, 5, 5);

      // Top-right (blue)
      ctx.textAlign = 'right';
      ctx.fillText(`🔵 Blue: ${this.playerScores.blue}`, this.cols * this.squareSize - 5, 5);

      // Bottom-left (red)
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`🔴 Red: ${this.playerScores.red}`, 5, this.rows * this.squareSize - 5);

      // Bottom-right (yellow)
      ctx.textAlign = 'right';
      ctx.fillText(`🟡 Yellow: ${this.playerScores.yellow}`, this.cols * this.squareSize - 5, this.rows * this.squareSize - 5);
  } 

  rotateTurn() {
    const order: ('red' | 'blue' | 'yellow' | 'green')[] = ['red', 'blue', 'yellow', 'green'];
    const currentIndex = order.indexOf(this.currentTurn);
    this.currentTurn = order[(currentIndex + 1) % order.length];
  }

  preloadImages(): Promise<void> {
    const pieceTypes = ['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'];
    const colors = ['green', 'yellow', 'red', 'blue'];
  
    const promises: Promise<void>[] = [];
  
    for (const color of colors) {
      for (const type of pieceTypes) {
        const key = `${color}-${type}`;
        const img = new Image();
        img.src = `assets/chess-pieces/${color}/${type}.svg`;
  
        this.imageCache[key] = img;
  
        // Create a promise that resolves when the image loads
        const promise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            resolve(); // Still resolve to avoid blocking
          };
        });
  
        promises.push(promise);
      }
    }
  
    return Promise.all(promises).then(() => {});
  }
  
}
