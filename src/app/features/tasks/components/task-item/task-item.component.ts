import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskDetail, TaskStatusChange } from '../../../../shared/models/task.model';
import { Router } from '@angular/router';

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

  @Output()
  statusChanged: EventEmitter<TaskStatusChange> = new EventEmitter<TaskStatusChange>();

  constructor(
    private router: Router,
  ) { }

  changeTaskStatus(): void {
    this.statusChanged.emit({
      taskId: this.task.id,
      completed: !this.task.completed
    });
  }

  viewCategoryDetail(): void {
    this.router.navigate(['/categories', this.task.categoryId]);
  }

}
