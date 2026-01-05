import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(c => c.LoginComponent)
  },
  
  {
    path: 'register',
    component: RegisterComponent
  },

  // 🔐 Protected routes
  {
    path: 'projects',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./projects/project-list/project-list')
        .then(c => c.ProjectListComponent)
  },

  {
  path: 'projects/:projectId/tasks',
  loadComponent: () =>
    import('./tasks/task-list/task-list')
      .then(m => m.TaskListComponent),
  canActivate: [authGuard]
},

{
  path: 'invite',
  loadComponent: () =>
    import('./invitations/invite-user/invite-user')
      .then(m => m.InviteUserComponent)
},

{
  path: 'accept-invitation',
  loadComponent: () =>
    import('./invitations/accept-invitation/accept-invitation')
      .then(m => m.AcceptInvitationComponent)
},


  // Default
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
