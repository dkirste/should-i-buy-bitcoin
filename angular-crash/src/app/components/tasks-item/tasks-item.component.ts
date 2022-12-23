import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../../Task";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.css']
})

export class TasksItemComponent {
  @Input() task:Task
  faTimes = faTimes;
  constructor() {
    this.task = {
      id: 0,
      text: "Constructed",
      day: "ConstructedDay",
      reminder: false,
    }
  }


}
