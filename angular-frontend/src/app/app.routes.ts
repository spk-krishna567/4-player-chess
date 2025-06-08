import { Routes } from '@angular/router';
import { GameRoom } from './pages/game-room/game-room';

export const routes: Routes = [
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
    title: 'Login | Quad Chess'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
    title: 'Register | Quad Chess'
  },
  {
    path:'game',
    loadComponent:()=>import('./pages/game-room/game-room').then(m=>m.GameRoom),
    title:"GameRoom"
  },
  { path: '**', redirectTo: 'login' } // Redirect unknown paths to login
];