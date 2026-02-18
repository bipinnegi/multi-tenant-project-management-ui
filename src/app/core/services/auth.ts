import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiBaseUrl}/api/auth`;


  private roleSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('role')
  );

  role$ = this.roleSubject.asObservable();



  private userNameSubject = new BehaviorSubject<string>(
    localStorage.getItem('userName') || 'User'
  );

  userName$ = this.userNameSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}



  private extractNameFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const email =
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

      if (email) {
        return email.split('@')[0]; // tenantA@test.com → tenantA
      }

      return 'User';
    } catch {
      return 'User';
    }
  }

  

  setAuthData(auth: { token: string; role: string; tenantId: string }) {

    localStorage.setItem('token', auth.token);
    localStorage.setItem('role', auth.role);
    localStorage.setItem('tenantId', auth.tenantId);

    //  Extract and store user name
    const extractedName = this.extractNameFromToken(auth.token);

    localStorage.setItem('userName', extractedName);
    this.userNameSubject.next(extractedName);

    // Role subject update
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
    this.userNameSubject.next('User');
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

  getUserName(): string {
    return this.userNameSubject.value;
  }
}
