import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'https://localhost:7232/api/auth';

  private roleSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('role')
  );

  role$ = this.roleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  setAuthData(auth: { token: string; role: string; tenantId: string }) {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('role', auth.role);
    localStorage.setItem('tenantId', auth.tenantId);

    // 🔥 single source of truth
    this.roleSubject.next(auth.role);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  registerOwner(data: {
    tenantName: string;
    ownerName: string;
    ownerEmail: string;
    password: string;
  }) {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.clear();
    this.roleSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.roleSubject.value;
  }

  getUserRole(): string | null {
    return this.roleSubject.value;
  }
  getToken(): string | null {
  return localStorage.getItem('token');
}

}

