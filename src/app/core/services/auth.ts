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
  setAuthData(auth: {
  token: string;
  role: string;
  tenantId: string;
}) {
  localStorage.setItem('token', auth.token);
  localStorage.setItem('role', auth.role);
  localStorage.setItem('tenantId', auth.tenantId);
}


  registerOwner(data: {
    tenantName: string;
    ownerName: string;
    ownerEmail: string;
    password: string;
  }) {
       return this.http.post<any>(
         `${this.apiUrl}/register`,
         data
          );
  }


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

  getUserRole(): string | null{
    const token = localStorage.getItem('token');
    if(!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  }
}
