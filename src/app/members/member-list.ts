import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TenantMember, TenantService } from "../core/services/tenant";
import { Observable } from "rxjs";

@Component({
    selector:'app-member-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './member-list.html',
    styleUrls: ['./member-list.css']
})
export class MemberListComponent implements OnInit{
    members$!: Observable<TenantMember[]>;

    constructor(private tenantService: TenantService){}
    
    ngOnInit(): void{
        this.loadMembers();
    }

    loadMembers(){
        this.members$ = this.tenantService.getMembers();
    }
}
