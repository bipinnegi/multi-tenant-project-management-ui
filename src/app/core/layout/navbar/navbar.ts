import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isOwner = false;
  isLoggedIn = false;

  private sub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.sub = this.authService.role$.subscribe(role => {
      this.isLoggedIn = !!role;
      this.isOwner = role === 'Owner';
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
