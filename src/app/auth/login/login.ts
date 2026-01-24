import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  error = '';

  // Track current theme state (shared with landing)
  isDarkMode = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Sync theme from localStorage on page load
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode() {
    // Toggle theme state
    this.isDarkMode = !this.isDarkMode;

    // Apply/remove dark class on body
    document.body.classList.toggle('dark', this.isDarkMode);

    // Persist preference
    localStorage.setItem(
      'theme',
      this.isDarkMode ? 'dark' : 'light'
    );
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setAuthData(response);
        this.router.navigate(['/status-overview']);
      },
      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }
}
