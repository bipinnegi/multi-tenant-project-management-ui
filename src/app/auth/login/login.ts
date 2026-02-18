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

  /* Theme state */
  isDarkMode = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    /* Sync theme from localStorage */
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode() {
    /* Toggle theme */
    this.isDarkMode = !this.isDarkMode;

    document.body.classList.toggle('dark', this.isDarkMode);

    /* Persist preference */
    localStorage.setItem(
      'theme',
      this.isDarkMode ? 'dark' : 'light'
    );
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {

      

        const fallbackName =
          this.email.split('@')[0]; // e.g. bipin@company.com → bipin

        this.authService.setAuthData({
          ...response,
          fullName: response.fullName || fallbackName
        });

        this.router.navigate(['/status-overview']);
      },

      error: () => {
        this.error = 'Invalid email or password';
      }
    });
  }
}
