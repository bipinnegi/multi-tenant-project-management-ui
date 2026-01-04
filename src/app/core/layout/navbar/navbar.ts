import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html'
  
})
export class NavbarComponent implements OnInit {

  isOwner = false;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Run on every route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAuthState();
      }
    });
  }

  updateAuthState() {
    const role = this.authService.getUserRole();
    this.isLoggedIn = !!role;
    this.isOwner = role === 'Owner';
  }

  logout() {
    this.authService.logout();
    this.updateAuthState();
  }
}
