import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
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
  @Input() isPinned = false;

  isOwner = false;
  isDarkMode = false;
  showCreateModal = false;
  isHovered = false;

  
  @HostBinding('class.pinned')
  get hostPinned(): boolean { return this.isPinned; }

  @HostBinding('class.overlay')
  get hostOverlay(): boolean { return this.isHovered && !this.isPinned; }

  @Output() closeRequest = new EventEmitter<void>();

  private subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  get isExpanded(): boolean {
    return this.isPinned || this.isHovered;
  }

  closeSidebar() {
    this.closeRequest.emit();
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  onModalClosed() {
    this.showCreateModal = false;
  }

  onMouseEnter() {
    if (!this.isPinned) {
      this.isHovered = true;
    }
  }

  onMouseLeave() {
    this.isHovered = false;
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

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
  }
}