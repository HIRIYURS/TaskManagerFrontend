import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {formatDate } from '@angular/common';

import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  tasks: Task[];
  displayedColumns = ['task', 'parent', 'start_date', 'end_date', 'priority', 'actions'];
  dataSource;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    // this.taskService.getTasks().subscribe((tasks) => {
    //   console.log(tasks);
    // });
    this.fetchTasks();
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  fetchTasks() {
    this.taskService
      .getTasks()
        .subscribe((data: Task[]) => {
          this.tasks = data;
          console.log("Data requested...");
          console.log(this.tasks);
        });  
  }

  editTask(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  finishTask(id) {
    this.taskService.endTask(id).subscribe(() => {
      this.fetchTasks();
    });
  }

  formatDate(date: Date): string {
    // const day = date.getDate();
    // const month = date.getMonth();
    // const year = date.getFullYear();
    //return `${day}/${month}/${year}`;
    return `01/16/2019`;
    //return formatDate(date, "MM/DD/YYYY");
  }

  applyTaskFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
