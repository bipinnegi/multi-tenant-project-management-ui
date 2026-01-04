import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  

  isOwner = false;

  constructor(private authService: AuthService) {
  this.isOwner = this.authService.getUserRole() === 'Owner';
  }

  logout(){
    this.authService.logout();
  }
}
