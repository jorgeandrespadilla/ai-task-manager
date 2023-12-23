import { Component, Input } from '@angular/core';
import { TaskDetail } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  @Input({ required: true })
  task!: TaskDetail;

  @Input()
  isFirst: boolean = true;

  @Input()
  isLast: boolean = true;

  changeTaskStatus(): void {
  }

}
