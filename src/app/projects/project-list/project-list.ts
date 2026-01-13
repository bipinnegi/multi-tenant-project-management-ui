import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth';
import { RouterModule } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
  
})
export class ProjectListComponent implements OnInit, OnDestroy {
 private sub!: Subscription;

  projects$!: Observable<any[]>;
  name='';
  
  description= '';

  isOwner = false;

  showDeleteModal = false;
 projectToDeleteId: string | null = null;
 projectToDeleteName = '';


  constructor(private projectService: ProjectService, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.isOwner = this.authService.getUserRole() === 'Owner';
    
  }
  
  ngOnInit() {
  this.loadProjects();

  this.sub = this.projectService.projectChanged$.subscribe(() => {
    this.loadProjects();
    this.cdr.detectChanges();
  });
  }

  ngOnDestroy() {
  this.sub?.unsubscribe();
}


  loadProjects(){
    this.projects$ = this.projectService.getProjects();
    
  }

  openDeleteModal(projectId: string, projectName: string, event: Event) {
  event.stopPropagation();
  event.preventDefault();

  this.projectToDeleteId = projectId;
  this.projectToDeleteName = projectName;
  this.showDeleteModal = true;
}

closeDeleteModal() {
  this.showDeleteModal = false;
  this.projectToDeleteId = null;
  this.projectToDeleteName = '';
  this.cdr.detectChanges();
}

confirmDeleteProject() {
  if (!this.projectToDeleteId) return;

  this.projectService.deleteProject(this.projectToDeleteId).subscribe({
    next: () => {
      this.projectService.notifyProjectChanged();
      this.closeDeleteModal();
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Failed to delete project', err);
      alert('Failed to delete project');
      this.cdr.detectChanges();
    }
  });
}



  

}
