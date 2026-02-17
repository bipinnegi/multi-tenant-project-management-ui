import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { CreateProjectModalComponent } from '../../projects/create-project-modal/create-project-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateProjectModalComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOwner = false;
  isCollapsed = false;
  isDarkMode = false;
  showCreateModal = false;

  private subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  openCreateModal() {
    this.showCreateModal = true;
  }

  onModalClosed() {
    this.showCreateModal = false;
  }

  ngOnInit() {
    this.subs.push(
      this.authService.role$.subscribe(role => {
        this.isOwner = role === 'Owner';
      })
    );
    this.subs.push(
      this.themeService.isDarkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }
}