import { Routes } from '@angular/router';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(c => c.LoginComponent)
  },
  

  // 🔐 Protected routes
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/project-list/project-list')
        .then(c => c.ProjectListComponent)
  },

  // Default
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
