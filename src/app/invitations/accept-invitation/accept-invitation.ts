import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../../core/services/invitation';

@Component({
  selector: 'app-accept-invitation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accept-invitation.html',
  styleUrl: './accept-invitation.css',
})
export class AcceptInvitationComponent {
   //form field
   FullName= '';
   password= '';

   //token from url
   token= '';

  successMessage='';
  errorMessage= '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invitationService: InvitationService,
    private cdr: ChangeDetectorRef
  ){
    this.token = decodeURIComponent(this.route.snapshot.queryParamMap.get('token') ||'');
  }

  acceptInvitation(){
    if(!this.token){
      this.errorMessage='invalid or missing invitation token';
      return;
    }
    this.invitationService.acceptInvitation(this.FullName, this.token, this.password).subscribe({
      next:() => {
        this.successMessage='invitation accepted successfully. Please login!';
        this.errorMessage='';
        this.cdr.detectChanges();
        //redirect to login after few sec
        setTimeout(()=>{
          this.router.navigate(['/login']);

        }, 1500);
      },
      error: ()=> {
        this.errorMessage='failed to accept invitation';
        this.successMessage= '';
        this.cdr.detectChanges();
      }
    });

  }
  

}
