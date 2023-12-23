import { Component, Input } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  @Input({ required: true })
  task!: Task;

  @Input()
  isFirst: boolean = true;

  @Input()
  isLast: boolean = true;

  changeTaskStatus(): void {
  }

}
