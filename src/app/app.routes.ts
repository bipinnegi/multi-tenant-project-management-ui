import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { RegisterComponent } from './auth/register/register';
import { AuthenticatedLayoutComponent } from './layout/authenticated-layout/authenticated-layout';


export const routes: Routes = [
  // 🌐 Public routes
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'accept-invitation',
    loadComponent: () =>
      import('./invitations/accept-invitation/accept-invitation')
        .then(m => m.AcceptInvitationComponent)
  },

  // 🔐 Authenticated shell
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'projects',
        loadComponent: () =>
          import('./projects/project-list/project-list')
            .then(c => c.ProjectListComponent)
      },

      {
         path: 'status-overview',
         loadComponent: () =>
           import('./status-overview/status-overview')
            .then(c => c.StatusOverviewComponent)
},

      {
        path: 'projects/:projectId/tasks',
        loadComponent: () =>
          import('./tasks/task-list/task-list')
            .then(m => m.TaskListComponent)
      },
      {
        path: 'invite',
        loadComponent: () =>
          import('./invitations/invite-user/invite-user')
            .then(m => m.InviteUserComponent)
      }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
