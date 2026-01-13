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

  deleteProject(projectId: string, event: Event) {
  event.stopPropagation();
  event.preventDefault();

  const confirmed = confirm(
    'Are you sure you want to delete this project? This action cannot be undone.'
  );

  if (!confirmed) return;

  this.projectService.deleteProject(projectId).subscribe({
    next: () => {
      // 🔥 notify shared state
      this.projectService.notifyProjectChanged();
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
