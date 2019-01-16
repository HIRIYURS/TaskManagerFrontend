import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  uri = 'http://localhost:8001';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${this.uri}/tasks`);
  }

  getTaskById(id) {
    return this.http.get(`${this.uri}/tasks/${id}`);
  }

  addTask(task, start_date, end_date, priority, parent) {
    const Task = {
      task: task,
      start_date: start_date,
      end_date: end_date,
      priority: priority,
      parent: parent
    }
    return this.http.post(`${this.uri}/tasks/add`, Task);
  }

  editTask(id, task, start_date, end_date, priority, parent) {
    const Task = {
      task: task,
      start_date: start_date,
      end_date: end_date,
      priority: priority,
      parent: parent
    }
    return this.http.post(`${this.uri}/tasks/update/${id}`, Task);
  }  

  deleteTask(id) {
    return this.http.get(`${this.uri}/tasks/delete/${id}`);
  }

  endTask(id) {
    return this.http.get(`${this.uri}/tasks/endtask/${id}`);
  }

}
