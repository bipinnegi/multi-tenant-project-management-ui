import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
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

  userName = 'User';

  private sub!: Subscription;

  @Output() menuToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    /* Role tracking */
    this.sub = this.authService.role$.subscribe(role => {
      this.isLoggedIn = !!role;
      this.isOwner = role === 'Owner';
    });

    /* User name tracking */
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleMenu() {
    this.menuToggle.emit();
  }
}
