import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project-modal.html',
  styleUrls: ['./create-project-modal.css']
})
export class CreateProjectModalComponent {

  name = '';
  description = '';
  loading = false;
  error = '';

  @Output() closed = new EventEmitter<boolean>(); // true = created

  constructor(private projectService: ProjectService) {}

  close(created = false) {
    this.closed.emit(created);
  }

  create() {
    if (!this.name.trim()) return;

    this.loading = true;
    this.projectService.createProject(this.name, this.description).subscribe({
      next: () => {
        this.loading = false;
        this.close(true);
      },
      error: () => {
        this.error = 'Failed to create project';
        this.loading = false;
      }
    });
  }
}
