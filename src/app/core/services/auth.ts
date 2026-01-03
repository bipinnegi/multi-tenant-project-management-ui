import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl= 'https://localhost:7232/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  login(email: string, password:string){
    return this.http.post<any>(`${this.apiUrl}/login`,{email, password});
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!this.getToken();
  }
}
