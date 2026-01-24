import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener, ChangeDetectorRef } from "@angular/core";
import { Observable } from "rxjs";
import { TenantMember, TenantService } from "../core/services/tenant";
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
  currentUserEmail: string | null = null;

  // Controls which dropdown is open
  openMenuFor: string | null = null;

  constructor(
    private tenantService: TenantService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isOwner = this.authService.getUserRole() === 'Owner';
    this.currentUserEmail = localStorage.getItem('email');
    this.loadMembers();
  }

  loadMembers() {
    this.members$ = this.tenantService.getMembers();
    this.cdr.detectChanges();
  }

  toggleMenu(memberId: string, event: MouseEvent) {
    event.stopPropagation();
    this.openMenuFor =
      this.openMenuFor === memberId ? null : memberId;
  }

  isSelf(member: TenantMember): boolean {
    return member.email === this.currentUserEmail;
  }

 
  // Change role
  
  changeRole(member: TenantMember, newRole: string) {
    this.tenantService.changeMemberRole(member.id, newRole).subscribe({
      next: () => {
        this.openMenuFor = null;
        this.loadMembers();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to change role');
        this.openMenuFor = null;
      }
    });
  }

  
  // Remove member
 
  removeMember(member: TenantMember) {
    const confirmed = confirm(
      `Remove ${member.fullName} from this company?`
    );

    if (!confirmed) return;

    this.tenantService.removeMember(member.id).subscribe({
      next: () => {
        this.openMenuFor = null;
        this.loadMembers();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to remove member');
        this.openMenuFor = null;
      }
    });
  }

  // Close menu on outside click
  @HostListener('document:click')
  closeMenu() {
    this.openMenuFor = null;
  }
}
