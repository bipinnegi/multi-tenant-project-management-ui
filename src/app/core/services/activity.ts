import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ActivityService{
    private apiUrl = `${environment.apiBaseUrl}/api/activity`;
    constructor(private http: HttpClient){}


    getRecent(limit: number = 10): Observable<any[]>{
        return this.http.get<any[]>(`${this.apiUrl}/recent?limit=${limit}`);
    }
    
}