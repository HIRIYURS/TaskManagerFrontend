import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';



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
  //updateForm: FormGroup;
  updateForm = new FormGroup ({
    task: new FormControl(),
    startdate: new FormControl(),
    enddate: new FormControl(),
    priority: new FormControl(),
    parent: new FormControl()
  });

  // parents: ParentObj[] = [
  //   {
  //     _id: "5c3f9fafb6a47e50b82938ec",
  //     task: "Parent Task"
  //   },
  //   {
  //     _id: "5c3c1678d104e54960669eb8",
  //     task: "Second Parent"
  //   }
  // ];
  parents: Task[];

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      task: ['', Validators.required],
      startdate: '',
      enddate: '',
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
        this.updateForm.get('startdate').setValue(this.task.start_date);
        this.updateForm.get('enddate').setValue(this.task.end_date);
        this.updateForm.get('priority').setValue(this.task.priority);
        this.updateForm.get('parent').setValue(this.task.parent);
        if (this.task.finished === true) {
          this.updateForm.disable();
        }        
      });
      this.taskService.getTasks().subscribe((data: Task[]) => {
        this.parents = data;
      });
    });
  }

  updateTask(task, startdate, enddate, priority, parent) {
    this.taskService.editTask(this.id, task, startdate, enddate, priority, parent).subscribe(() => {
      this.snackBar.open('Task updated Successfully!', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/view']);
    });
  }
}
