import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  createForm: FormGroup;
  parents: Task[];

  constructor(private taskService: TaskService, private fb: FormBuilder, private router: Router) { 
    this.createForm = this.fb.group({
      task: ['', Validators.required],
      start_date: '',
      end_date: '',
      parent: '',
      priority: 15
    });    
  }

  createTask(task, start_date, end_date, priority, parent) {
    this.taskService.addTask(task, start_date, end_date, priority, parent).subscribe(() => {
      this.router.navigate(['/view']);
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.parents = data;
    });
  }

}
