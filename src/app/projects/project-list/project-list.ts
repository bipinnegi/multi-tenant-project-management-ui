import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project';
import { Observable } from 'rxjs';

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

  constructor(private projectService: ProjectService) {
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
