import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../core/services/project';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-status-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-overview.html',
  styleUrls: ['./status-overview.css']
})
export class StatusOverviewComponent implements OnInit {

  // status counts
  todo = 0;
  inProgress = 0;
  done = 0;

  total = 0;

  loading = true;

  constructor(private projectService: ProjectService,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadStatusData();
  }

  loadStatusData() {
    this.projectService.getProjects().subscribe(projects => {

      if (projects.length === 0) {
        this.loading = false;
        return;
      }

      // fetch tasks for each project
      const taskRequests = projects.map(p =>
        this.projectService.getTasks(p.id)
      );

      forkJoin(taskRequests).subscribe(taskLists => {
        const allTasks = taskLists.flat();

        allTasks.forEach(task => {
          if (task.status === 'Todo') this.todo++;
          if (task.status === 'InProgress') this.inProgress++;
          if (task.status === 'Done') this.done++;
        });

        this.total = this.todo + this.inProgress + this.done;
        this.loading = false;
        this.cdr.detectChanges();

      });
    });
  }

  // SVG math helpers
  get todoPercent() {
    return this.total ? (this.todo / this.total) * 100 : 0;
  }

  get inProgressPercent() {
    return this.total ? (this.inProgress / this.total) * 100 : 0;
  }

  get donePercent() {
    return this.total ? (this.done / this.total) * 100 : 0;
  }
}
