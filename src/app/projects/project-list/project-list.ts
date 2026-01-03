import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
})
export class ProjectListComponent {

  projects$: Observable<any[]>;

  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }
}
