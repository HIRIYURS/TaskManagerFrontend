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
  dataSource: any;

  filterValues = {
    task: '',
    start_date: '',
    end_date: '',
    priorityfrom: '',
    priorityto: '',
    parent: ''
  };

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.fetchTasks();
  }

  
  fetchTasks() {
    this.taskService
      .getTasks()
        .subscribe((data: Task[]) => {
          this.tasks = data;
          // console.log("Data requested...");
          // console.log(this.tasks);
          this.dataSource = new MatTableDataSource(this.tasks);
          this.dataSource.filterPredicate = this.taskFilterPredicate;
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



  taskFilterPredicate(data: Task, filter: string) {
      var searchTerms = JSON.parse(filter);

      return (data.task.toLowerCase().indexOf(searchTerms.task) !== -1)
        && (searchTerms.priorityfrom === "" || data.priority >= parseInt(searchTerms.priorityfrom))
        && (searchTerms.priorityto === "" || data.priority <= parseInt(searchTerms.priorityto))
        && (searchTerms.parent === "" ||
              ((searchTerms.parent !== "" && data.parent !== undefined) 
                         && (data.parent.toLowerCase().indexOf(searchTerms.parent) !== -1)))
        && (data.start_date.toString().toLowerCase().indexOf(searchTerms.start_date) !== -1)
        && (data.end_date.toString().toLowerCase().indexOf(searchTerms.end_date) !== -1);

  }

  validateParentTask(data: Task,  parentTask: string) {
    var retval = false;
    if (parentTask !== "") {
        if (data.parent === undefined) {
          retval = false;
        } else {
          if (data.parent.toLowerCase().indexOf(parentTask) !== -1) {
            retval = true;
          } else {
            retval = false;
          }
        }
    } else {
      retval = true;
    }
    return retval;
  }
    
  
  applyTaskFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterValues.task = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();

  }

  applyPriorityFromFilter(filterValue: string) {
    this.filterValues.priorityfrom = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyPriorityToFilter(filterValue: string) {
    this.filterValues.priorityto = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyParentTaskFilter(filterValue: string) {
    this.filterValues.parent = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyStartDateFilter(filterValue: string) {
    this.filterValues.start_date = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyEndDateFilter(filterValue: string) {
    this.filterValues.end_date = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
