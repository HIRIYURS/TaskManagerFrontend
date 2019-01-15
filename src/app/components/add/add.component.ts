import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

}
