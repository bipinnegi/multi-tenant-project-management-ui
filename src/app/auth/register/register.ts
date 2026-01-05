import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
 tenantName = '';
  ownerName = '';
  email = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router){}
  
  register(){
    this.loading= true;
    this.errorMessage= '';

    this.authService.registerOwner({
      tenantName: this.tenantName,
      ownerName : this.ownerName,
      ownerEmail : this.email,
      password : this.password
    }).subscribe({
      next: (res)=>{
        this.authService.setAuthData(res);
        this.router.navigate(['/projects']);
      },
      error:()=>{
        this.errorMessage=' registration failed';
        this.loading = false;
      }
    });
  }

}
