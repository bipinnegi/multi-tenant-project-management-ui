import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvitationService } from '../../core/services/invitation';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-invite-user',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-user.html',
  styleUrl: './invite-user.css',
})
export class InviteUserComponent {
  email= '';
  role= 'Member';
  successMessage= '';
  errorMessage = '';

  constructor(
    private invitationService: InvitationService,
    private authService: AuthService
  ){}

  invite(){
    //ui-level safety check
    if(this.authService.getUserRole() !=='Owner'){
        this.errorMessage = 'you are not allowed to ivite the user';
        return;
    }
   this.invitationService.sendInvitation(this.email, this.role).subscribe({
    next:()=>{
      this.successMessage='invitation sent successgully';
      this.errorMessage= '';
      this.email= '';
    },
    error: ()=>{
      this.errorMessage ='failed to send invitation';
      this.successMessage='';
    }
   })

  }

}
