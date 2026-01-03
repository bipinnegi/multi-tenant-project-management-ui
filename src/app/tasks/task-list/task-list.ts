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
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.isOwner = this.authService.getUserRole() === 'Owner';
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

  // OWNER ONLY
  updateStatus(taskId: string, status: string) {
    this.projectService.updateTaskStatus(this.projectId, taskId, status).subscribe(() => this.loadTasks());
  }
}
