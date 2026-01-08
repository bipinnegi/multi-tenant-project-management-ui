import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class InvitationService{
    private apiUrl =`${environment.apiBaseUrl}/api/invitations`;

    constructor(private http: HttpClient){}

//owner sends invitations to a user for member

sendInvitation(email: string, role: string){
   return this.http.post(this.apiUrl,{email, role});
}

//inviteee: accept invitation

acceptInvitation(FullName: string, token: string, password: string){
    return this.http.post(`${this.apiUrl}/accept`, {FullName, token, password}, {responseType:'text'});
}

}