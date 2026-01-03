import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from '../../core/services/project';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {

  tasks$!: Observable<any[]>;
  projectId!: string;

  newTaskTitle = '';
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService
  ) {
    // get projectId from URL: /projects/:projectId/tasks
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;

    // check role
    this.isOwner = this.authService.getUserRole() === 'Owner';

    // load tasks
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.projectService.getTasks(this.projectId);
  }

  // OWNER ONLY
  createTask() {
    this.projectService
      .createTask(this.projectId, this.newTaskTitle)
      .subscribe(() => {
        this.newTaskTitle = '';
        this.loadTasks();
      });
  }

 
}
