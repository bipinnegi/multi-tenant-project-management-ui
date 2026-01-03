import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
  
})
export class ProjectListComponent {

  projects$!: Observable<any[]>;
  name='';
  description= '';

  isOwner = false;

  constructor(private projectService: ProjectService, private authService: AuthService) {
    this.isOwner = this.authService.getUserRole() === 'Owner';
    this.loadProjects();
  }

  loadProjects(){
    this.projects$ = this.projectService.getProjects();
  }

  createProject(){
    this.projectService.createProject(this.name, this.description).subscribe(() =>{
           this.name='';
           this.description='';
           this.loadProjects();
    });
  }
}
