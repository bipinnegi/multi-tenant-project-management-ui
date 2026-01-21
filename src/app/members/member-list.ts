import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TenantMember, TenantService } from "../core/services/tenant";
import { Observable } from "rxjs";
import { AuthService } from "../core/services/auth";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-list.html',
  styleUrls: ['./member-list.css']
})
export class MemberListComponent implements OnInit {

  members$!: Observable<TenantMember[]>;
  isOwner = false;

  constructor(
    private tenantService: TenantService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isOwner = this.authService.getUserRole() === 'Owner';
    this.loadMembers();
  }

  loadMembers() {
    this.members$ = this.tenantService.getMembers();
  }
}
