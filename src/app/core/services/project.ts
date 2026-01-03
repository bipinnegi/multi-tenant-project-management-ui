import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://localhost:7232/api/projects';

  constructor(private http: HttpClient){}

  getProjects(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  createProject(name: string , description: string){
    return this.http.post(this.apiUrl, {name, description });
  }

  getTasks(projectId: string) {
  return this.http.get<any[]>(
    `${this.apiUrl}/${projectId}/tasks`
  );
}

createTask(projectId: string, title: string) {
  return this.http.post(
    `${this.apiUrl}/${projectId}/tasks`,
    { title }
  );
}
}
