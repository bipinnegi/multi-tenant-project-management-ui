import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../core/layout/navbar/navbar';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './authenticated-layout.html',
  styleUrls: ['./authenticated-layout.css']
})
export class AuthenticatedLayoutComponent {
  isSidebarOpen = false;
  isMobile = false;

  constructor() {
    this.isMobile = window.innerWidth <= 768;
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
    // If we resize to desktop, close the mobile-pinned state
    if (!this.isMobile && this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }
  }

  /** On mobile: show the dark backdrop when sidebar is pinned open */
  get isMobileBackdropVisible(): boolean {
    return this.isMobile && this.isSidebarOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}