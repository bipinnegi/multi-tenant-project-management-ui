import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project';
import { AuthService } from '../../core/services/auth';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {

  tasks: any[] = [];
 loading = true;

  projectId!: string;

  newTaskTitle = '';
  isOwner = false;
  showDeleteModal = false;
 taskToDelete: any = null;


  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.isOwner = this.authService.getUserRole() === 'Owner';
    this.loadTasks();
  }

  loadTasks() {
  this.loading = true;

  this.projectService.getTasks(this.projectId).subscribe({
    next: (tasks) => {
      this.tasks = tasks;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
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
  this.projectService
    .updateTaskStatus(this.projectId, taskId, status)
    .subscribe({
      next: () => {
        // ✅ DIRECTLY UPDATE LOCAL STATE
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
          task.status = status;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to update task status', err);
      }
    });
  }


  getStatusLabel(status: string): string {
  switch (status) {
    case 'Todo':
      return 'Todo';
    case 'InProgress':
      return 'In progress';
    case 'Done':
      return 'Done';
    default:
      return status;
   }
  }

  openDeleteModal(task: any) {
  this.taskToDelete = task;
  this.showDeleteModal = true;
}

closeDeleteModal() {
  this.showDeleteModal = false;
  this.taskToDelete = null;
  this.loadTasks();
}

confirmDelete() {
  if (!this.taskToDelete) return;

  this.projectService
    .deleteTask(this.projectId, this.taskToDelete.id)
    .subscribe({
      next: () => {
        // remove from local state
        this.tasks = this.tasks.filter(
          t => t.id !== this.taskToDelete.id
        );

        this.closeDeleteModal();
        this.loadTasks();
      },
      error: (err) => {
        console.error('Failed to delete task', err);
      }
    });
}



}
