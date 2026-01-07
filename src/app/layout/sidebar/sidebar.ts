import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { CreateProjectModalComponent } from '../../projects/create-project-modal/create-project-modal';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateProjectModalComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit  {
    isOwner = false;
  isCollapsed = false;
  constructor(private authService: AuthService) 
  {}

  showCreateModal = false;

 openCreateModal() {
  this.showCreateModal = true;
 }

 onModalClosed(created: boolean) {
  this.showCreateModal = false;

  if (created) {
    // Simple refresh approach (safe)
    window.location.reload();
  }
 }
  
  ngOnInit() {
    this.authService.role$.subscribe(role => {
      this.isOwner = role === 'Owner';
    });
  }

  toggle(){
    this.isCollapsed = !this.isCollapsed;
  }  
  

  logout() {
    this.authService.logout();
  }
}
