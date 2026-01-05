import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  isCollapsed = false;
  constructor(private authService: AuthService) {}
  
  toggle(){
    this.isCollapsed = !this.isCollapsed;
  }  

  logout() {
    this.authService.logout();
  }
}
