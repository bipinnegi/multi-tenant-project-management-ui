import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface TenantMember{
    id: string;
    fullName: string;
    email: string;
    role: string;
}
@Injectable({
    providedIn: 'root',
})
export class TenantService {
    private apiUrl = `${environment.apiBaseUrl}/api/tenants`;

    constructor(private http: HttpClient){}

    getMembers(): Observable<TenantMember[]>{
        return this.http.get<TenantMember[]>(`${this.apiUrl}/members`);
    }
}