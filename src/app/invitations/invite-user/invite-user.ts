import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvitationService } from '../../core/services/invitation';
import { AuthService } from '../../core/services/auth';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-invite-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-user.html',
  styleUrl: './invite-user.css',
})
export class InviteUserComponent {

  email = '';
  role = 'Member';
  inviteLink ='';
  successMessage = '';
  errorMessage = '';

  loading = false; 

  constructor(
    private invitationService: InvitationService,
    private authService: AuthService,
     private cdr: ChangeDetectorRef
  ) {}

  invite() {
    // UI-level safety check
    if (this.authService.getUserRole() !== 'Owner') {
      this.errorMessage = 'You are not allowed to invite users';
      return;
    }

     this.invitationService.sendInvitation(this.email, this.role).subscribe({
    next: (res: any) => {
      const token = res.token;

      this.inviteLink =
        `${window.location.origin}/accept-invitation?token=${token}`;

      this.successMessage = 'Invitation created successfully';
      this.errorMessage = '';
      this.email = '';
      this.loading = false;
      this.cdr.detectChanges();    
    },
    error: () => {
      this.errorMessage = 'Failed to send invitation';
      this.successMessage = '';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
  }
  copyLink() {
  navigator.clipboard.writeText(this.inviteLink);
  }
 
}


