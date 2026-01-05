import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
  
})
export class ProjectListComponent {

  projects$!: Observable<any[]>;
  name='';
  description= '';

  isOwner = false;

  constructor(private projectService: ProjectService, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.isOwner = this.authService.getUserRole() === 'Owner';
    this.loadProjects();
  }

  loadProjects(){
    this.projects$ = this.projectService.getProjects();
    
  }

  createProject() {
  if (!this.name || !this.description) {
    return;
  }

  this.projectService
    .createProject(this.name, this.description)
    .subscribe({
      next: () => {
        // reload list
        this.loadProjects();

        // reset form
        this.name = '';
        this.description = '';

        // 🔥 force UI update
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to create project', err);
      }
    });
}

}
