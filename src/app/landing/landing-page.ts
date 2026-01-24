import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPageComponent implements OnInit {

  // Tracks current theme state
  isDarkMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Read persisted theme from localStorage on load
    const storedTheme = localStorage.getItem('theme');

    // If user previously selected dark mode, restore it
    if (storedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // Toggle dark class on body
    document.body.classList.toggle('dark', this.isDarkMode);

    // Persist user preference
    localStorage.setItem(
      'theme',
      this.isDarkMode ? 'dark' : 'light'
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
