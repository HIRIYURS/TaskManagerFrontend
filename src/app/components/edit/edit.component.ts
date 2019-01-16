import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  task: any = {};
  updateForm: FormGroup;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      task: ['', Validators.required],
      start_date: '',
      end_date: '',
      parent: '',
      priority: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.taskService.getTaskById(this.id).subscribe(res => {
        this.task = res;
        this.updateForm.get('task').setValue(this.task.task);
        this.updateForm.get('start_date').setValue(this.task.start_date);
        this.updateForm.get('end_date').setValue(this.task.end_date);
        this.updateForm.get('priority').setValue(this.task.priority);
        this.updateForm.get('parent').setValue(this.task.parent);
      });
    });
  }

  updateTask(task, start_date, end_date, priority, parent) {
    this.taskService.editTask(this.id, task, start_date, end_date, priority, parent).subscribe(() => {
      this.snackBar.open('Task updated Successfully!', 'OK', {
        duration: 3000
      });
    });
  }
}
